"use client"
import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";
import { json } from "stream/consumers";


//analyzed features
  //most likely time when conversations happen
  //average length of prompts
  //length of conversations
  // average difference between created - update time : time spent on conversation

 



export default function Home() {
  
  const [bodyData, setBodyData] = useState("")

  function renderData(body: string) {
    if (body == "") {
      return 
    }
   let jsBody = JSON.parse(body)
    return (<div>
      <h1>average conversation length</h1>
      <h3>{jsBody.avgConvoLen}</h3>
      <h1>average prompt length</h1>
      <h3>{jsBody.avgPromptLen}</h3>
      <h1>average time spent on conversation</h1>
      <h3>{jsBody.avgConvoTimeLength}</h3>
      <h1>average conversation start time</h1>
      <h3>{jsBody.avgConvoStartTime}</h3>
      </div>
    )

  }
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>chat gpt wrapped</h1>
          <p>
            enter in a json file of your chatgpt conversations, and get a
            summary back!
          </p>
          {renderData(bodyData)}
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
               
              try {
                const res = await fetch("/api/json-interpreter", {
                  method: "POST",
                  body: formData,
                });
                const text = await res.json();
                setBodyData(text.body);
              } catch (err) {
                console.error(err);
                
              }

          }}
          />
        </div>
      </main>
    </div>
  );
}
