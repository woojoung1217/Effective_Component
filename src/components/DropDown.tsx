import React, { useRef, useState } from "react";
import "./DropDown.scss";
import useDetectRef from "@/hooks/useDetectRef";

const DropDown = () => {
  const [value, setValue] = useState("옵션 1");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useDetectRef(dropdownRef);

  return (
    <div
      ref={dropdownRef}
      className="dropdown"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <span className="dropdown__selected">{value}</span>
      {isOpen && (
        <ul className="dropdown__menu">
          <li
            className="dropdown__item"
            data-content="옵션 1"
            onClick={(e) => {
              setValue(e.currentTarget.dataset["content"] as string); // 타입 단언 추가
            }}
          >
            옵션 1
          </li>
          <li
            className="dropdown__item"
            data-content="옵션 2"
            onClick={(e) => {
              setValue(e.currentTarget.dataset["content"] as string); // 타입 단언 추가
            }}
          >
            옵션 2
          </li>
          <li
            className="dropdown__item"
            data-content="옵션 3"
            onClick={(e) => {
              setValue(e.currentTarget.dataset["content"] as string); // 타입 단언 추가
            }}
          >
            옵션 3
          </li>
          <li
            className="dropdown__item"
            data-content="옵션 4"
            onClick={(e) => {
              setValue(e.currentTarget.dataset["content"] as string); // 타입 단언 추가
            }}
          >
            옵션 4
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropDown;
