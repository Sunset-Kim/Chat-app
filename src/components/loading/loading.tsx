import React from 'react';

const Loading = () => {
  return (
    <div className="fixed z-20 left-0 top-0 right-0 bottom-0 bg-neutral-900/80 flex justify-center items-center">
      <div className="w-20 h-20 rounded-full border-4 border-white animate-spin border-t-amber-400"></div>
    </div>
  );
};

export default Loading;
