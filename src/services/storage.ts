import { deleteObject, ref, uploadString } from 'firebase/storage';
import { storage } from './firebase';

class StorageService {
  uploadImg(file: string, fileName: string) {
    const imgRef = ref(storage, `images/${fileName}`);
    return uploadString(imgRef, file, 'data_url');
  }

  deleteImg(url: string) {
    const imgRef = ref(storage, url);
    console.log(imgRef);
    return deleteObject(imgRef);
  }
}

export default StorageService;
