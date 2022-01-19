import { QuerySnapshot } from 'firebase/firestore';
import { Variants, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import StoreServices from '../../services/fire_store';
import { userAtom, userIdAtom } from '../../state/auth';

const CardStorage = () => {
  const storeService = new StoreServices();
  const user = useRecoilValue(userAtom);
  const [item, setItem] = useState<any[]>([]);

  const onUpdate = (value: QuerySnapshot) => {
    const newValue = value.docs.map(item => item.data());
    setItem(newValue);
  };

  useEffect(() => {
    if (!user?.uid) return;
    const sync = storeService.readSyncImages(user?.uid, onUpdate);
    return () => {
      sync();
    };
  }, []);

  const boxVariants: Variants = {
    initial: {
      opacity: 1,
    },

    animate: {
      opacity: 1,
    },

    exit: {
      top: -10,
      opacity: 0,
    },

    hover: {
      scale: 1.2,
      transition: {
        type: 'spring',
        damping: 1,
        mass: 0.5,
        duration: 0.6,
      },
    },
  };

  return (
    <section>
      <h1 className="border-b-2 border-amber-400">
        <span className="text-lg font-bold">
          {user?.displayName ?? 'default'}
        </span>
        님이 만든 이미지
      </h1>

      <div className="grid p-3 gap-3 grid-cols-4 lg:grid-cols-8 ">
        {item.map((s, i) => (
          <motion.div
            className="rounded overflow-hidden"
            key={s.createAt}
            variants={boxVariants}
            whileHover="hover"
            initial="initial"
          >
            <img className="block w-full h-full" src={s.imgURL} alt="안녕" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CardStorage;
