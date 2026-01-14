"use client";
import Image from "next/image";

import { useContext, useState } from "react";
import styles from "./averages.module.css";
import { useData } from "../context/DataContext";
import { Toggle } from "radix-ui";
import { aggRow } from "../Utils";
import { useRouter } from "next/navigation";

function Averages() {
  const data = useData();

  const router = useRouter();
  if (data.data == null) {
    router.push("/");
    return <div></div>;
  }
  return (
    <div className={styles.main}>
      <h1>Averages</h1>
      <img src="/computer.png"></img>
      <div className = {styles.body}>
      <p>Average conversation start time: {data.data.avgConvoStartTime}</p>
      <p>Average conversation length: {data.data.avgConvoLen}</p>
      <p>Average prompt length: {data.data.avgPromptLen}</p>
      <button onClick={() => router.push("/env")}>next</button>
    </div>
    </div>
  );
}

export default Averages;
