import React, { useRef, useState } from "react";
import "./DropDown.scss";
import useDetectRef from "@/hooks/useDetectRef";

interface DropDownProps {
  options: string[];
}

const DropDown: React.FC<DropDownProps> = ({ options }) => {
  const [value, setValue] = useState(options[0]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useDetectRef(dropdownRef);

  const handleOptionClick = (option: string) => {
    setValue(option);
    setIsOpen(false); // 옵션 선택 후 드롭다운 닫기
  };

  return (
    <div ref={dropdownRef} className="dropdown" onClick={() => setIsOpen(!isOpen)}>
      <span className="dropdown__selected">{value}</span>
      {isOpen && (
        <ul className="dropdown__menu">
          {options.map((option, index) => (
            <li key={index} className="dropdown__item" onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
