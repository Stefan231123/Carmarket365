import { gql } from '@apollo/client/core';

export const UPLOAD_IMAGE = gql`
  mutation UploadImage($file: Upload!, $config: ImageUploadConfig) {
    uploadImage(file: $file, config: $config) {
      filename
      url
      thumbnailUrl
      mediumUrl
      size
      width
      height
    }
  }
`;

export const UPLOAD_MULTIPLE_IMAGES = gql`
  mutation UploadMultipleImages($files: [Upload!]!, $config: ImageUploadConfig) {
    uploadMultipleImages(files: $files, config: $config) {
      images {
        filename
        url
        thumbnailUrl
        mediumUrl
        size
        width
        height
      }
      totalSize
      totalCount
    }
  }
`;

export const DELETE_IMAGE = gql`
  mutation DeleteImage($filename: String!) {
    deleteImage(filename: $filename)
  }
`;

export const DELETE_MULTIPLE_IMAGES = gql`
  mutation DeleteMultipleImages($filenames: [String!]!) {
    deleteMultipleImages(filenames: $filenames)
  }
`;

export const GET_IMAGE_URL = gql`
  query GetImageUrl($filename: String!, $size: String = "original") {
    getImageUrl(filename: $filename, size: $size)
  }
`;

export const GET_IMAGE_STATS = gql`
  query GetImageStats($filename: String!) {
    getImageStats(filename: $filename) {
      exists
      originalSize
      mediumSize
      thumbnailSize
    }
  }
`;

export interface ImageUploadResult {
  filename: string;
  url: string;
  thumbnailUrl: string;
  mediumUrl: string;
  size: number;
  width: number;
  height: number;
}

export interface BatchImageUploadResult {
  images: ImageUploadResult[];
  totalSize: number;
  totalCount: number;
}

export interface ImageUploadConfig {
  maxFileSize?: number;
  imageQuality?: number;
  thumbnailSize?: number;
  mediumSize?: number;
}

export interface ImageStats {
  exists: boolean;
  originalSize: number;
  mediumSize: number;
  thumbnailSize: number;
}