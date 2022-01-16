import React, { ReactEventHandler, useRef, memo } from 'react';

interface InputImgProps {
  onUpdate: (URL: string | ArrayBuffer) => void;
}
const InputImg: React.FC<InputImgProps> = ({ onUpdate }) => {
  // ref
  const inputRef = useRef<HTMLInputElement>(null);

  const onClick: ReactEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    inputRef.current?.click();
  };

  // onchage
  const onChange: ReactEventHandler<HTMLInputElement> = e => {
    e.preventDefault();
    const file = e.currentTarget.files && e.currentTarget.files[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = e => {
      const URL = e.target?.result;
      if (!URL) return;
      onUpdate(URL);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <label className="input-file">
      <input ref={inputRef} onChange={onChange} accept="image/*" type="file" />
      <button
        onClick={onClick}
        className="btn-md btn-primary rounded-full py-1 mt-2"
      >
        파일업로드
      </button>
    </label>
  );
};

export default memo(InputImg);
