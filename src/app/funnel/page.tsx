"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import 가입방식 from "./(components)/가입방식";
import 주민번호 from "./(components)/주민번호";
import 집주소 from "./(components)/집주소";
import 가입성공 from "./(components)/가입성공";
import "../funnel/funnel.scss";

const Funnel = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams.get("step") || "가입방식";

  console.log(step);

  const handleNextStep = () => {
    switch (step) {
      case "가입방식":
        router.push("?step=주민번호");
        break;
      case "주민번호":
        router.push("?step=집주소");
        break;
      case "집주소":
        router.push("?step=가입성공");
        break;
      default:
        router.push("?step=가입방식");
        break;
    }
  };

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
