import React from 'react';
import Canvas from '../canvas/canvas';
import Preview from '../preview/preview';

const Channel = () => {
  return (
    <div className="w-full overflow-x-hidden overflow-y-auto bg-neutral-100 p-2 text-neutral-800">
      <Canvas></Canvas>
    </div>
  );
};

export default Channel;
