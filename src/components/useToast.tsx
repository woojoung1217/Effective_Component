import React from "react";
import "./usetoast.scss";
import { useToastStore } from "@/store/ToastStore";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="toast-container">
      {toasts.map(({ id, message, type }) => (
        <div key={id} className={`toast ${type}`}>
          {message}
          <button onClick={() => removeToast(id)}>X</button>
        </div>
      ))}
    </div>
  );
};
