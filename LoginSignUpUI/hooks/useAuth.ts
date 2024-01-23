import {onAuthStateChanged} from 'firebase/auth';
import {useEffect, useState} from 'react';
import {auth} from '../config/firebase';

const useAuth = () => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        console.log('user = ', user);
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsub;
  }, []);

  return {user};
};

export default useAuth;
