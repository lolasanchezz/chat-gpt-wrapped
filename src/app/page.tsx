"use client"
import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";


//analyzed features
  //most likely time when conversations happen
  //average length of prompts
  //length of conversations
  // average difference between created - update time : time spent on conversation




export default function Home() {

    let bodyData, setBodyData = useState("")


  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>chat gpt wrapped</h1>
          <p>
            enter in a json file of your chatgpt conversations, and get a
            summary back!
          </p>
          <div id="outputText">{bodyData}</div>
        </div>
        <div className={styles.filePicker}>
          <h3>upload your file</h3>
          <input
            type="file"
            name="file"
            accept=".json,application/json"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const formData = new FormData();
              formData.append("file", file);
               const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
                });
                const result = await response.json();
          if (!(result.success)) {
            alert("upload failed :( try again?")
            }
          }}
          ></input>
        </div>
      </main>
    </div>
  );
}
