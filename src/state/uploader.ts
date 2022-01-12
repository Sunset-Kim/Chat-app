import { atom } from 'recoil';
import ImageUploader from '../services/image_uploader';

export const imageUploadeAtom = atom({
  key: 'imageUploadeService',
  default: new ImageUploader(),
});
