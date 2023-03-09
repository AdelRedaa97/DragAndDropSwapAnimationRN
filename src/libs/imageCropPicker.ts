import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { ICameraProps, IImagePickerProps } from '../definitions/libs/imageCropPicker';

export const openPicker = (
  { cropping = true, multiple = false, mediaType = 'photo', compressImageQuality = 1 }: IImagePickerProps,
  callback: (response: ImageOrVideo) => void,
) => {
  ImagePicker.openPicker({
    cropping,
    multiple,
    mediaType,
    compressImageQuality,
  })
    .then(response => {
      return callback(response);
    })
    .catch(error => {
      console.log(error);
    });
};

export const openCamera = (
  { cropping = true, mediaType = 'photo', compressImageQuality = 1 }: ICameraProps,
  callback: (response: ImageOrVideo) => void,
) => {
  ImagePicker.openCamera({
    cropping,
    mediaType,
    compressImageQuality,
  })
    .then(response => {
      return callback(response);
    })
    .catch(error => {
      console.log(error);
    });
};
