import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import imageCompression from 'browser-image-compression';
import { useTranslation } from '@/hooks/useTranslation';

interface ImageFile {
  file: File;
  preview: string;
  compressed?: File;
  uploading: boolean;
  uploaded: boolean;
  error?: string;
  progress: number;
  id: string;
}

interface ImageUploadProps {
  onImagesChange: (images: ImageFile[]) => void;
  maxFiles?: number;
  maxSizePerFile?: number; // in MB
  acceptedFormats?: string[];
  className?: string;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImagesChange,
  maxFiles = 10,
  maxSizePerFile = 5,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/webp'],
  className = '',
  disabled = false,
}) => {
  const { t } = useTranslation();
  const [images, setImages] = useState<ImageFile[]>([]);
  const [globalError, setGlobalError] = useState<string>('');

  const compressImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: maxSizePerFile * 0.8, // Compress to 80% of max size
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: 0.8,
    };

    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error('Error compressing image:', error);
      return file; // Return original if compression fails
    }
  };

  const validateFile = (file: File): string | null => {
    if (!acceptedFormats.includes(file.type)) {
      return `File type ${file.type} is not supported. Please use ${acceptedFormats.join(', ')}.`;
    }

    if (file.size > maxSizePerFile * 1024 * 1024) {
      return `File size exceeds ${maxSizePerFile}MB limit.`;
    }

    return null;
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (disabled) return;
    
    setGlobalError('');

    if (images.length + acceptedFiles.length > maxFiles) {
      setGlobalError(`Cannot upload more than ${maxFiles} images.`);
      return;
    }

    const newImages: ImageFile[] = acceptedFiles.map((file) => {
      const validationError = validateFile(file);
      return {
        file,
        preview: URL.createObjectURL(file),
        uploading: false,
        uploaded: false,
        error: validationError || undefined,
        progress: 0,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };
    });

    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
    onImagesChange(updatedImages);

    // Compress images in the background
    for (let i = 0; i < newImages.length; i++) {
      const imageIndex = images.length + i;
      const newImage = newImages[i];

      if (!newImage.error) {
        try {
          setImages(prevImages => {
            const updated = [...prevImages];
            updated[imageIndex] = { ...updated[imageIndex], uploading: true };
            return updated;
          });

          const compressed = await compressImage(newImage.file);
          
          setImages(prevImages => {
            const updated = [...prevImages];
            updated[imageIndex] = {
              ...updated[imageIndex],
              compressed,
              uploading: false,
              uploaded: true,
              progress: 100,
            };
            return updated;
          });
        } catch (error) {
          setImages(prevImages => {
            const updated = [...prevImages];
            updated[imageIndex] = {
              ...updated[imageIndex],
              uploading: false,
              error: 'Failed to process image',
            };
            return updated;
          });
        }
      }
    }
  }, [images, maxFiles, maxSizePerFile, acceptedFormats, disabled, onImagesChange]);

  const removeImage = (id: string) => {
    const updatedImages = images.filter(img => {
      if (img.id === id) {
        URL.revokeObjectURL(img.preview);
        return false;
      }
      return true;
    });
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': acceptedFormats.map(format => format.replace('image/', '.')),
    },
    maxFiles: maxFiles - images.length,
    disabled,
  });

  const canUpload = images.length < maxFiles && !disabled;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Zone */}
      {canUpload && (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">
            {isDragActive ? 'Drop images here' : 'Drag & drop images here'}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            or <span className="text-blue-600 underline">browse files</span>
          </p>
          <p className="text-xs text-gray-400">
            {acceptedFormats.map(format => format.replace('image/', '')).join(', ').toUpperCase()} up to {maxSizePerFile}MB each
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {images.length}/{maxFiles} images uploaded
          </p>
        </div>
      )}

      {/* Global Error */}
      {globalError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{globalError}</AlertDescription>
        </Alert>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="relative group rounded-lg overflow-hidden border border-gray-200 bg-gray-50"
            >
              {/* Image Preview */}
              <div className="aspect-square">
                <img
                  src={image.preview}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Progress Overlay */}
              {image.uploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mb-2 mx-auto"></div>
                    <p className="text-xs">{t('common.processing')}</p>
                  </div>
                </div>
              )}

              {/* Success/Error Overlay */}
              <div className="absolute top-2 left-2">
                {image.uploaded && !image.error && (
                  <div className="bg-green-500 text-white rounded-full p-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                {image.error && (
                  <div className="bg-red-500 text-white rounded-full p-1">
                    <AlertCircle className="w-3 h-3" />
                  </div>
                )}
              </div>

              {/* Remove Button */}
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                onClick={() => removeImage(image.id)}
                disabled={image.uploading}
              >
                <X className="h-3 w-3" />
              </Button>

              {/* Error Message */}
              {image.error && (
                <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-xs p-1">
                  {image.error}
                </div>
              )}

              {/* File Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="truncate">{image.file.name}</p>
                <p>{(image.file.size / 1024 / 1024).toFixed(1)}MB</p>
                {image.compressed && (
                  <p className="text-green-300">
                    → {(image.compressed.size / 1024 / 1024).toFixed(1)}MB
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Summary */}
      {images.length > 0 && (
        <div className="text-sm text-gray-500 flex justify-between items-center">
          <span>
            {images.filter(img => img.uploaded && !img.error).length} of {images.length} processed
          </span>
          <span>
            Total size: {(images.reduce((acc, img) => acc + (img.compressed || img.file).size, 0) / 1024 / 1024).toFixed(1)}MB
          </span>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;