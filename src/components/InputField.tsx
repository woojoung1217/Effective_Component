"use client";

import React, { useRef } from "react";
import { FieldError } from "react-hook-form";
import "./inputField.scss";

interface InputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validation?: any;
  error?: FieldError;
}

const InputField: React.FC<InputProps> = ({ name, label, type = "text", placeholder, validation, error }) => {
  const inputRef = useRef(validation);
  return (
    <div className="input-field">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} placeholder={placeholder} ref={inputRef} className={error ? "error" : ""} />
      {error && <span className="error-message">{error.message}</span>}
    </div>
  );
};

export default InputField;
