import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { chatAtom } from '../../state/data';
import Card from '../card/card';
import PopupChat from '../popup_chat/popup_chat';

const Preview = () => {
  const chatList = useRecoilValue(chatAtom);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (!messageEndRef.current) return;
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  return (
    <>
      <div className="relative w-full h-full">
        <ul className="w-full h-full relative">
          {chatList &&
            chatList.map(item => <Card key={item.createAt} chat={item}></Card>)}
          <div ref={messageEndRef} />
        </ul>
      </div>
      <PopupChat />
    </>
  );
};

export default Preview;
