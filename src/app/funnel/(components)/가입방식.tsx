"use client";

import React from "react";

interface 가입방식Props {
  onNext: () => void;
}

const 가입방식: React.FC<가입방식Props> = ({ onNext }) => {
  return (
    <div className="container">
      <div className="title">지금 휴대폰 번호를 그대로 쓸까요?</div>
      <form>
        <label htmlFor="phone-number" className="label">
          휴대폰 번호
        </label>
        <input type="text" id="phone-number" className="phone-input" value="010-1234-5678" readOnly />
      </form>
      <div className="buttons">
        <button type="button" className="btn-primary" onClick={onNext}>
          내 번호 그대로 쓰기
        </button>
        <button type="button" className="btn-secondary">
          새로운 번호 쓰기
        </button>
      </div>
    </div>
  );
};

export default 가입방식;
