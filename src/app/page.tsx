import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
        <h1>chat gpt wrapped</h1>
        <p>enter in a json file of your chatgpt conversations, and get a summary back!</p>
        </div>
        <button> upload your file </button>
      </main>
    </div>
  );
}
