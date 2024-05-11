import { useEffect, useState } from 'react';

export const useWindowWidth = () => {
  const [width, setWidth] = useState(window.document.body.clientWidth);

  useEffect(() => {
    const handler = () => {
      setWidth(window.document.body.clientWidth);
    }

    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    }
  }, []);

  return width;
}
