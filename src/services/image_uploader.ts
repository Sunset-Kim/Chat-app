const cloudinaryURL = 'https://api.cloudinary.com/v1_1/alsdn1662/image/upload';

export default class ImageUploader {
  async upload(file: File | null) {
    if (!file) return;
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'hmjbyqoq');

    const res = await fetch(cloudinaryURL, {
      method: 'POST',
      body: data,
    });
    return await res.json();
  }
}
