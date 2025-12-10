"use client"
import Image from "next/image";

import { useState } from "react";
import styles from "../page.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useData } from "../context/DataContext";

//analyzed features
  //most likely time when conversations happen
  //average length of prompts
  //length of conversations

 function aggRow(name: string, value: string, addText?: string) {
    if (addText == undefined) {
      addText = ""
    }
    return (<div className = {styles.dataRow}>
      <h3>{name}</h3>

      <p>{value + addText}</p>
    </div>)
  }

function renderData(data: any) {
   if (!data) return null
    return (<div>
      {aggRow("average conversation length", data.avgConvoLen, " messages")}
      {aggRow("average prompt length", data.avgPromptLen, " characters")}
      {aggRow("average conversation start time", data.avgConvoStartTime)}
      
      </div>
    )

  }

function Landing() {
  
  const { data, loading, error, uploadFile } = useData();
  


  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <Image src={"/elements/header.png"} alt="header" width={175} height={75}/>
         
        </div>
         {renderData(data)}
        <div className={styles.filePicker}>
          <h3>upload your file</h3>
           {/*
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
          */}
          <input
        type="file"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) await uploadFile(file)
        }}
      />
        </div>
      </main>
    </div>
  );
}
export default Landing;
