"use client";
import React from "react";

interface 집주소Props {
  onNext: () => void;
}

const 집주소: React.FC<집주소Props> = ({ onNext }) => {
  return (
    <div className="container">
      <div className="title">집 주소를 입력해주세요</div>
      <form>
        <label htmlFor="phone-number" className="label">
          집주소
        </label>
        <input type="text" id="phone-number" className="phone-input" value="경기도 화성시 반송동" readOnly />
      </form>
      <div className="buttons">
        <button type="button" className="btn-primary" onClick={onNext}>
          다음
        </button>
      </div>
    </div>
  );
};

export default 집주소;
