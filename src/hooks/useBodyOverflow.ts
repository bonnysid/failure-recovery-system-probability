import React, { useEffect } from 'react';

const makeId = (length = 5) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const ATTR = 'active-modal';

const body = document.body;

const setOverflow = (value: string) => (body.style.overflowY = value);

export const useBodyOverflow = (condition: boolean, lock = true) => {
  const refId = React.useRef<string>(makeId());

  const onAdd = (id: string) => {
    const attr = body.getAttribute(ATTR);

    if (attr) {
      const ids = attr.split(',');
      ids.push(id);
      body.setAttribute(ATTR, ids.join(','));
    } else {
      body.setAttribute(ATTR, id);
    }

    setOverflow('hidden');
  };

  const onRemove = (id: string) => {
    const attr = body.getAttribute(ATTR);

    if (attr) {
      let ids = attr.split(',');
      ids = ids.filter((val) => val !== id);
      body.setAttribute(ATTR, ids.join(','));

      if (ids.length === 0) {
        setOverflow('');
        body.removeAttribute(ATTR);
      }
    }
  };

  useEffect(() => {
    if (!lock) {
      return;
    }

    if (condition) {
      onAdd(refId.current);
    } else {
      onRemove(refId.current);
    }

    return () => {
      onRemove(refId.current);
    };
  }, [condition]);
};
