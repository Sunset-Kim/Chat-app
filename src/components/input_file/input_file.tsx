import React, { ReactEventHandler, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { imageUploadeAtom, isImgLoadingAtom } from '../../state/uploader';

interface IImageResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: object;
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  access_mode: string;
  original_filename: string;
}

interface InputFileProps {
  fileName?: string;
  onFileChange: (fileName: string, url: string) => void;
}

const InputFile: React.FC<InputFileProps> = ({ fileName, onFileChange }) => {
  const imageUploader = useRecoilValue(imageUploadeAtom);
  const [loading, setLoading] = useState(false);
  const setIsImgLoading = useSetRecoilState(isImgLoadingAtom);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onChange: ReactEventHandler<HTMLInputElement> = async e => {
    if (!e.currentTarget.files) return;
    setIsImgLoading(true);
    setLoading(true);
    const file = e.currentTarget.files[0];
    const result: IImageResponse = await imageUploader.upload(file);
    setLoading(false);
    setIsImgLoading(false);
    onFileChange(result.original_filename, result.url);
  };

  return (
    <label className="flex-1 basis-1/2">
      <span className="sr-only">Choose profile photo</span>
      <input
        ref={fileInputRef}
        type="file"
        name="file"
        accept="image/*"
        onChange={onChange}
        className="hidden"
      />

      <button
        type="button"
        disabled={loading}
        onClick={() => fileInputRef.current?.click()}
        className="w-full h-full flex justify-center items-center bg-slate-600 rounded-lg text-white disabled:bg-red-400 transition-colors"
      >
        {loading ? (
          <span className="w-4 h-4 rounded-full border-2 border-t-red-800 animate-spin"></span>
        ) : (
          <span>{fileName || 'Add'}</span>
        )}
      </button>
    </label>
  );
};

export default InputFile;
