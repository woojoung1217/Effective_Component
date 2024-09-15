import React from "react";

interface 주민번호Props {
  onNext: () => void;
}

const 주민번호: React.FC<주민번호Props> = ({ onNext }) => {
  return (
    <div className="container">
      <div className="title">주민등록번호 뒷자리를 입력해주세요</div>
      <form>
        <label htmlFor="phone-number" className="label">
          주민등록번호
        </label>
        <input type="text" id="phone-number" className="phone-input" value="981217-" readOnly />
      </form>
      <div className="buttons">
        <button type="button" className="btn-primary" onClick={onNext}>
          다음
        </button>
      </div>
    </div>
  );
};

export default 주민번호;
