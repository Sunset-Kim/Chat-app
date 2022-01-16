import { ref, uploadBytes, uploadString } from 'firebase/storage';
import { storage } from './firebase';

class StorageService {
  uploadImg(file: string, fileName: string) {
    const imgRef = ref(storage, `images/${fileName}`);
    return uploadString(imgRef, file, 'data_url');
  }
}

export default StorageService;
