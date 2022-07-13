import { useEffect, useState } from 'react';
import { StateChanged } from '../firebase/client';

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined
};

export default function useUser() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN);

  useEffect(() => {
    const unsuscribe = StateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(USER_STATES.NOT_LOGGED);
      }
    });
    return () => {
      unsuscribe();
    };
  }, []);

  return user;
}
