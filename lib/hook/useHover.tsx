import { useRef, useState, useEffect } from 'react';

export function useHover() {
  const [isHovered, setHovered] = useState(false);
  const elemRef = useRef<Element | null>(null);
  const currentRef = elemRef.current;

  const onMouseOver = () => setHovered(true);
  const onMouseOut = () => setHovered(false);

  const addListeners = () => {
    if (currentRef instanceof Element) {
      currentRef.addEventListener('mouseover', onMouseOver);
      currentRef.addEventListener('mouseout', onMouseOut);
    }
  };

  const removeListeners = () => {
    if (currentRef instanceof Element) {
      currentRef.removeEventListener('mouseover', onMouseOver);
      currentRef.removeEventListener('mouseout', onMouseOut);
    }
  };

  useEffect(() => {
    addListeners();

    return removeListeners;
  }, [currentRef]);

  return [elemRef, isHovered];
}