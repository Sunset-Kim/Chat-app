import React from 'react';

const UItest = () => {
  return (
    <div className="container m-auto">
      <h1>버튼</h1>
      <div className="flex">
        <div className="flex flex-col px-2">
          <h2 className="text-lg">버튼 컬러</h2>
          <button className="btn-primary btn-md btn-solid mb-1">솔리드</button>
          <button className="btn-secondary btn-md btn-ghost mb-1">
            솔리드
          </button>
        </div>
        <div className="flex flex-col px-2">
          <h2 className="text-lg">버튼 스타일</h2>
          <button className="btn-primary btn-md btn-solid mb-1">솔리드</button>
          <button className="btn-primary btn-md btn-ghost mb-1">솔리드</button>
          <button className="btn-primary btn-md btn-light mb-1">솔리드</button>
          <button className="btn-primary btn-md btn-outline mb-1">
            솔리드
          </button>
        </div>
        <div className="flex flex-col px-2">
          <h2 className="text-lg">버튼 스타일</h2>
          <button>솔리드</button>
        </div>
      </div>
    </div>
  );
};

export default UItest;
