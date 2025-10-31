"use client"
import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";
import { json } from "stream/consumers";


//analyzed features
  //most likely time when conversations happen
  //average length of prompts
  //length of conversations

 



export default function Home() {
  
  const [bodyData, setBodyData] = useState("")

  function aggRow(name: string, value: string, addText?: string) {
    if (addText == undefined) {
      addText = ""
    }
    return (<div className = {styles.dataRow}>
      <h3>{name}</h3>

      <p>{value + addText}</p>
    </div>)
  }




  function renderData(body: string) {
    if (body == "") {
      return 
    }
   let jsBody = JSON.parse(body)
    return (<div>
      {aggRow("average conversation length", jsBody.avgConvoLen, " messages")}
      {aggRow("average prompt length", jsBody.avgPromptLen, " characters")}
      {aggRow("average conversation start time", jsBody.avgConvoStartTime)}
      
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
         
        </div>
         {renderData(bodyData)}
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
                setBodyData("")
              }

          }}
          />
        </div>
      </main>
    </div>
  );
}
