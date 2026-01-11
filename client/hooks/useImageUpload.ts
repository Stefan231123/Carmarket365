import { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client/react';
import { UPLOAD_IMAGE, UPLOAD_MULTIPLE_IMAGES, DELETE_IMAGE } from '../lib/graphql/image-operations';
import type { ImageUploadResult, ImageUploadConfig } from '../lib/graphql/image-operations';

interface UploadProgress {
  filename: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

interface UseImageUploadOptions {
  onUploadProgress?: (progress: UploadProgress[]) => void;
  onUploadComplete?: (results: ImageUploadResult[]) => void;
  onUploadError?: (error: string) => void;
  maxConcurrent?: number;
}

interface UseImageUploadReturn {
  uploadImages: (files: File[], config?: ImageUploadConfig) => Promise<ImageUploadResult[]>;
  deleteImage: (filename: string) => Promise<boolean>;
  uploadProgress: UploadProgress[];
  isUploading: boolean;
  error: string | null;
}

export const useImageUpload = (options: UseImageUploadOptions = {}): UseImageUploadReturn => {
  const {
    onUploadProgress,
    onUploadComplete,
    onUploadError,
    maxConcurrent = 3,
  } = options;

  const [uploadSingleImage] = useMutation(UPLOAD_IMAGE);
  const [uploadMultipleImages] = useMutation(UPLOAD_MULTIPLE_IMAGES);
  const [deleteImageMutation] = useMutation(DELETE_IMAGE);

  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImages = useCallback(async (
    files: File[],
    config?: ImageUploadConfig
  ): Promise<ImageUploadResult[]> => {
    if (files.length === 0) return [];

    setIsUploading(true);
    setError(null);

    // Initialize progress tracking
    const initialProgress: UploadProgress[] = files.map(file => ({
      filename: file.name,
      progress: 0,
      status: 'uploading' as const,
    }));
    
    setUploadProgress(initialProgress);
    onUploadProgress?.(initialProgress);

    try {
      const results: ImageUploadResult[] = [];

      // If we have only a few files, upload them individually for better progress tracking
      if (files.length <= maxConcurrent) {
        const uploadPromises = files.map(async (file, index) => {
          try {
            const { data } = await uploadSingleImage({
              variables: {
                file,
                config,
              },
              context: {
                hasUpload: true,
              },
            });

            const result = (data as { uploadImage: ImageUploadResult }).uploadImage;
            results.push(result);

            // Update progress
            setUploadProgress(prev => 
              prev.map((p, i) => 
                i === index 
                  ? { ...p, progress: 100, status: 'completed' as const }
                  : p
              )
            );

            return result;
          } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Upload failed';
            
            setUploadProgress(prev => 
              prev.map((p, i) => 
                i === index 
                  ? { ...p, status: 'error' as const, error: errorMessage }
                  : p
              )
            );
            
            throw new Error(`Failed to upload ${file.name}: ${errorMessage}`);
          }
        });

        await Promise.all(uploadPromises);
      } else {
        // For many files, use batch upload
        const { data } = await uploadMultipleImages({
          variables: {
            files,
            config,
          },
          context: {
            hasUpload: true,
          },
        });

        results.push(...(data as { uploadMultipleImages: { images: ImageUploadResult[] } }).uploadMultipleImages.images);

        // Update all progress to completed
        setUploadProgress(prev => 
          prev.map(p => ({ ...p, progress: 100, status: 'completed' as const }))
        );
      }

      onUploadComplete?.(results);
      return results;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      onUploadError?.(errorMessage);
      
      // Update failed uploads
      setUploadProgress(prev => 
        prev.map(p => 
          p.status === 'uploading' 
            ? { ...p, status: 'error' as const, error: errorMessage }
            : p
        )
      );
      
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, [uploadSingleImage, uploadMultipleImages, maxConcurrent, onUploadProgress, onUploadComplete, onUploadError]);

  const deleteImage = useCallback(async (filename: string): Promise<boolean> => {
    try {
      const { data } = await deleteImageMutation({
        variables: { filename },
      });
      return (data as { deleteImage: boolean }).deleteImage;
    } catch (err) {
      console.error('Failed to delete image:', err);
      return false;
    }
  }, [deleteImageMutation]);

  return {
    uploadImages,
    deleteImage,
    uploadProgress,
    isUploading,
    error,
  };
};