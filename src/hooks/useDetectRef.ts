import { RefObject, useEffect, useState } from "react";

/** ref 외부 요소를 눌렀을 때 드랍다운을 닫도록 도와주는 함수  */

const useDetectRef = (ref: RefObject<HTMLElement>): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent): void => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(!isOpen);
      }
    };

    if (isOpen) {
      window.addEventListener("click", handleClick);
    }

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [isOpen, ref]);

  return [isOpen, setIsOpen];
};

export default useDetectRef;
