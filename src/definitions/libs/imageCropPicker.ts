export type TMediaType = 'photo' | 'video';

export interface IImagePickerProps {
  cropping?: boolean;
  multiple?: boolean;
  mediaType?: TMediaType;
  compressImageQuality?: number; // from 0 to 1
}

export interface ICameraProps {
  cropping?: boolean;
  mediaType?: TMediaType;
  compressImageQuality?: number; // from 0 to 1
}
