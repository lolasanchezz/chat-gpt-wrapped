"use client"
import Image from "next/image";

import { useState } from "react";
import styles from "./landing.module.css";
import {useRouter} from "next/navigation"
import { useData } from "../context/DataContext";
//analyzed features
  //most likely time when conversations happen
  //average length of prompts
  //length of conversations



function Landing() {
  
  const { data, loading, error, uploadFile } = useData();
  const router = useRouter()


  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <Image src={"/elements/header.png"} alt="header" width={175} height={75}/>
        </div>
        <div className={styles.filePicker}>
          <h3>upload your file</h3>
          <input
        type="file"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) await uploadFile(file)
        }}
      />
      {data? <button onClick = {() => router.push("/averages")} className = "Toggle">next</button>:<></>}
        </div>
      </main>
    </div>
  );
}
export default Landing;
