import React, { ReactEventHandler, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../state/auth';
import ProfileLine from '../profile_line/profile_line';
import StoreServices from '../../services/fire_store';

interface InputGalleryProps {
  onUpdate: (imgURL: string) => void;
  className?: string;
  buttonText?: string | JSX.Element;
}

const InputGallery: React.FC<InputGalleryProps> = ({
  onUpdate,
  className,
  buttonText,
}) => {
  // recoil
  const user = useRecoilValue(userAtom);

  // service
  const store = new StoreServices();

  // state
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any>();

  // custom func
  const toggleOpen: ReactEventHandler<
    HTMLButtonElement | HTMLDivElement
  > = e => {
    e.preventDefault();
    setIsOpen(prev => !prev);
  };
  const onClick = (imgURL: string) => {
    // 이미지 url을 상위로 전달
    onUpdate(imgURL);
    setIsOpen(false);
  };
  const fecthData = async () => {
    if (!user?.uid) return;
    const result = await store.getImageData(user?.uid);
    const data = result.docs.map(doc => doc.data());
    return data;
  };

  // hook
  useEffect(() => {
    fecthData()
      .then(result => {
        setData(result);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <button
        onClick={toggleOpen}
        className={className ?? 'btn-md btn-primary rounded-full py-1'}
      >
        {buttonText ?? '이미지선택'}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed flex items-center justify-center w-full h-full left-0 top-0"
          >
            <div
              onClick={toggleOpen}
              className="absolute z-0 left-0 right-0 top-0 bottom-0 bg-black/75"
            />
            <div className="relative flex flex-col bg-amber-100 w-96 h-96 rounded-lg">
              <div className="m-4 mb-0 pb-2 border-b-2 border-amber-400">
                <ProfileLine text=" 갤러리" />
              </div>
              <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
                <div className="relative grid grid-cols-3 gap-2">
                  {isLoading
                    ? 'loading....'
                    : data.map((item: any) => (
                        <motion.div
                          className="border-2 border-amber-500 rounded-lg overflow-hidden"
                          onClick={() => onClick(item.imgURL)}
                          key={item.createAt}
                          whileHover={{ scale: 1.2 }}
                        >
                          <img
                            className="block w-full h-full object-cover"
                            src={item.imgURL}
                            alt="user created"
                          />
                        </motion.div>
                      ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InputGallery;
