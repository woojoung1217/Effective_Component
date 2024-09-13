import React from "react";
import { useForm } from "react-hook-form";
import InputField from "./InputField";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const MyForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        name="username"
        label="Username"
        type="name"
        placeholder="이름을 입력해주세요"
        validation={register("username", { required: "Username is required" })}
        error={errors.username}
      />

      <InputField
        name="email"
        label="Email"
        type="email"
        placeholder="이메일을 입력해주세요"
        validation={register("email", {
          required: "이메일은 필수 입니다.",
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: "허용되지 않는 이메일 주소",
          },
        })}
        error={errors.email}
      />

      <InputField
        name="password"
        label="Password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        validation={register("password", {
          required: "비밀번호는 필수 입니다",
          minLength: {
            value: 6,
            message: "비밀번호는 6자 이상으로 구성 되어야 합니다.",
          },
        })}
        error={errors.password}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
