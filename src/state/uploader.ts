import { atom } from 'recoil';
import ImageUploader from '../services/image_uploader';

export const isUploadingAtom = atom({
  key: 'uploading',
  default: false,
});

export const isImgLoadingAtom = atom({
  key: 'ImgLoading',
  default: false,
});

export const imageUploadeAtom = atom({
  key: 'imageUploadeService',
  default: new ImageUploader(),
});
