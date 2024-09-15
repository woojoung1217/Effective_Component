import { useState } from "react";

type Step = "가입방식" | "주민번호" | "집주소" | "가입성공";

const useFunnel = () => {
  const [step, setStep] = useState<Step>("가입방식");

  const handleNextStep = () => {
    switch (step) {
      case "가입방식":
        setStep("주민번호");
        break;
      case "주민번호":
        setStep("집주소");
        break;
      case "집주소":
        setStep("가입성공");
        break;
      default:
        break;
    }
  };

  return { step, handleNextStep };
};

export default useFunnel;
