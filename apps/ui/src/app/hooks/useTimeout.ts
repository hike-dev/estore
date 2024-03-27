import { useEffect, useState } from 'react';

export const useTimeout = (ms = 0, key = '') => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    const timer = setTimeout(() => {
      setReady(true);
    }, ms);

    return () => {
      clearTimeout(timer);
    };
  }, [key, ms, setReady]);

  return ready;
};
