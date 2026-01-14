"use client";
import Image from "next/image";

import { useContext, useState } from "react";
import styles from "./environmental.module.css";
import { useData } from "../context/DataContext";
import { Toggle } from "radix-ui";
import { aggRow } from "../Utils";
import { useRouter } from "next/navigation";

function Environmental() {
  const data = useData();
  const router = useRouter();
  if (data.data == null) {
    router.push("/");
    return <div></div>;
  }

  return (
    <div className={styles.main}>
      <h1>Environmental impact</h1>
      <img src="/flower.png"></img>

      <p>Total bottles of water used: {data.data.envImpact}</p>
      <p>Total co2 used: {data.data.Co2Impact}</p>
    </div>
  );
}

export default Environmental;
