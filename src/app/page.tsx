"use client"
import Image from "next/image";

import { useState } from "react";
import styles from "./page.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/landing";
export default function Home() {
  return (
  <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
        </Router>
  </div>
  )
}
