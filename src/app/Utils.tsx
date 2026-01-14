import 'react'
import styles from "./components/landing.module.css";


export const aggRow = ({name, value, addText}: {name: string, value: string, addText?: string}) => {
    if (addText == undefined) {
      addText = ""
    }
    return (
        <div className = {styles.dataRow}>
      <h3>{name}</h3>
      <p>{value + addText}</p>
    </div>
)
  }