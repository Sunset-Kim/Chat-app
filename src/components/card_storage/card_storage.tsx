import { QuerySnapshot } from 'firebase/firestore';
import { Variants, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import StoreServices from '../../services/fire_store';
import { userIdAtom } from '../../state/auth';

const CardStorage = () => {
  const storeService = new StoreServices();
  const userID = useRecoilValue(userIdAtom);
  const [item, setItem] = useState<any[]>([]);

  const onUpdate = (value: QuerySnapshot) => {
    const newValue = value.docs.map(item => item.data());
    setItem(newValue);
  };

  useEffect(() => {
    if (!userID) return;
    const sync = storeService.readSyncImages(userID, onUpdate);
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
  );
};

export default CardStorage;
