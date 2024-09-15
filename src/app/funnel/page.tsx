"use client";

// 기존 방식
import React from "react";

import 가입방식 from "./(components)/가입방식";
import 주민번호 from "./(components)/주민번호";
import 집주소 from "./(components)/집주소";
import 가입성공 from "./(components)/가입성공";
import "../funnel/funnel.scss";
import useFunnel from "./(components)/useFunnel";

const Funnel = () => {
  const { step, handleNextStep } = useFunnel();

  return (
    <div className="funnelCotainer">
      <h2>인풋은 동작하지 않습니다 funnel 방식 test</h2>

      {step === "가입방식" && <가입방식 onNext={handleNextStep} />}
      {step === "주민번호" && <주민번호 onNext={handleNextStep} />}
      {step === "집주소" && <집주소 onNext={handleNextStep} />}
      {step === "가입성공" && <가입성공 />}
    </div>
  );
};

export default Funnel;
