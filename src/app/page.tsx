"use client";

import Button from "@/components/Button";
import styles from "./main.module.scss";

export default function Home() {
  const handleOnClick = () => {
    console.log("hello");
  };

  return (
    <div className={styles.Maincontainer}>
      <div className={styles.title}>더 가치있는 컴포넌트 만들기</div>

      <div className={styles.components}>
        <div className={styles.items}>
          <h1>버튼</h1>
          <Button text="Primary Button" onClick={handleOnClick} />
          <Button text="Secondary Button" variant="secondary" onClick={handleOnClick} />
          <Button text="Sucess Button" variant="succes" onClick={handleOnClick} />
          <Button text="Disabled Button" disabled={true} onClick={handleOnClick} />
        </div>
        <div className={styles.items}>
          <h1>모달</h1>
        </div>
        <div className={styles.items}></div>
      </div>
    </div>
  );
}
