import { QuerySnapshot } from 'firebase/firestore';
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
    console.log('실행ㅇ');
    const sync = storeService.readSyncImages(userID, onUpdate);

    return () => {
      sync();
    };
  }, []);

  return (
    <div>
      {item.map(s => (
        <div key={s.createAt}>
          <span>{s.createAt}</span>
          <img src={s.imgURL} alt="안녕" />
        </div>
      ))}
    </div>
  );
};

export default CardStorage;
