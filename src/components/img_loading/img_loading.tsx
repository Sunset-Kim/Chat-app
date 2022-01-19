import React, { useState } from 'react';

interface ImgLoadingProps {
  src: string;
  alt: string;
}

const ImgLoading: React.FC<ImgLoadingProps> = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full pt-[100%] mb-2">
      <img
        className={`absolute z-10 top-0 left-0 w-full h-full object-cover transition-all blur-sm scale-110 ${
          isLoading ? '' : 'opacity-0'
        }`}
        src="./images/default_logo.png"
        alt="loading..."
      />

      <img
        className="absolute left-0 top-0 block w-full h-full"
        src={src}
        alt={alt}
        onLoad={() => {
          setIsLoading(false);
        }}
      />
    </div>
  );
};

export default ImgLoading;
