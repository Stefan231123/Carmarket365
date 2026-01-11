import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent } from './ui/dialog';
import { ImageWithFallback } from './ImageWithFallback';

interface ImageGalleryProps {
  images: string[];
  thumbnails?: string[];
  alt?: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'auto';
  showThumbnails?: boolean;
  enableZoom?: boolean;
  onImageClick?: (index: number) => void;
  lazy?: boolean;
}

interface ImageViewerProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  alt?: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  images,
  initialIndex,
  isOpen,
  onClose,
  alt = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setZoom(1);
    setRotation(0);
  };

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoom(1);
    setRotation(0);
  };

  const zoomIn = () => setZoom(prev => Math.min(prev + 0.5, 3));
  const zoomOut = () => setZoom(prev => Math.max(prev - 0.5, 0.5));
  const rotate = () => setRotation(prev => (prev + 90) % 360);

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        previousImage();
        break;
      case 'ArrowRight':
        nextImage();
        break;
      case 'Escape':
        onClose();
        break;
      case '+':
      case '=':
        zoomIn();
        break;
      case '-':
        zoomOut();
        break;
      case 'r':
      case 'R':
        rotate();
        break;
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  React.useEffect(() => {
    setCurrentIndex(initialIndex);
    setZoom(1);
    setRotation(0);
  }, [initialIndex]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0">
        <div className="relative w-full h-full bg-black">
          {/* Header Controls */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-black bg-opacity-50 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-white text-sm">
                {currentIndex + 1} of {images.length}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={zoomOut}
                className="text-white hover:bg-white hover:bg-opacity-20"
                disabled={zoom <= 0.5}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              
              <span className="text-white text-sm min-w-[3rem] text-center">
                {Math.round(zoom * 100)}%
              </span>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={zoomIn}
                className="text-white hover:bg-white hover:bg-opacity-20"
                disabled={zoom >= 3}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={rotate}
                className="text-white hover:bg-white hover:bg-opacity-20"
              >
                <RotateCw className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white hover:bg-opacity-20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Main Image */}
          <div className="flex items-center justify-center h-[95vh] p-4">
            <div className="relative max-w-full max-h-full overflow-hidden">
              <img
                src={images[currentIndex]}
                alt={`${alt} ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain transition-transform duration-200"
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg)`,
                }}
                draggable={false}
              />
            </div>
          </div>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="lg"
                onClick={previousImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white hover:bg-opacity-20"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <Button
                variant="ghost"
                size="lg"
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white hover:bg-opacity-20"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50">
              <div className="flex justify-center space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-colors ${
                      index === currentIndex
                        ? 'border-blue-500'
                        : 'border-transparent hover:border-white'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  thumbnails,
  alt = 'Gallery image',
  className = '',
  aspectRatio = 'video',
  showThumbnails = true,
  enableZoom = true,
  onImageClick,
  lazy = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showViewer, setShowViewer] = useState(false);

  const displayImages = thumbnails && thumbnails.length === images.length ? thumbnails : images;

  const handleImageClick = (index: number) => {
    if (onImageClick) {
      onImageClick(index);
    } else if (enableZoom) {
      setCurrentIndex(index);
      setShowViewer(true);
    }
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    auto: '',
  };

  if (images.length === 0) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${aspectRatioClasses[aspectRatio]} ${className}`}>
        <div className="text-center text-gray-400">
          <div className="w-12 h-12 mx-auto mb-2 opacity-50">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-sm">No images available</p>
        </div>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className={className}>
        <div className="relative group">
          <div className={aspectRatioClasses[aspectRatio]}>
            <ImageWithFallback
              src={displayImages[0]}
              alt={alt}
              lazy={lazy}
              className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => handleImageClick(0)}
            />
          </div>
          {enableZoom && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-black bg-opacity-50 text-white p-2 rounded">
                <ZoomIn className="h-5 w-5" />
              </div>
            </div>
          )}
        </div>
        
        {enableZoom && (
          <ImageViewer
            images={images}
            initialIndex={0}
            isOpen={showViewer}
            onClose={() => setShowViewer(false)}
            alt={alt}
          />
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Main Image */}
      <div className="relative group mb-4">
        <div className={aspectRatioClasses[aspectRatio]}>
          <ImageWithFallback
            src={displayImages[currentIndex]}
            alt={`${alt} ${currentIndex + 1}`}
            lazy={lazy}
            className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => handleImageClick(currentIndex)}
          />
        </div>
        
        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="sm"
          onClick={previousImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-70"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-70"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        
        {/* Image Counter */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
          {currentIndex + 1} / {images.length}
        </div>
        
        {/* Zoom Indicator */}
        {enableZoom && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-black bg-opacity-50 text-white p-2 rounded">
              <ZoomIn className="h-5 w-5" />
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {showThumbnails && images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-colors ${
                index === currentIndex
                  ? 'border-blue-500'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <ImageWithFallback
                src={image}
                alt={`Thumbnail ${index + 1}`}
                lazy={false}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Viewer Modal */}
      {enableZoom && (
        <ImageViewer
          images={images}
          initialIndex={currentIndex}
          isOpen={showViewer}
          onClose={() => setShowViewer(false)}
          alt={alt}
        />
      )}
    </div>
  );
};

export default ImageGallery;