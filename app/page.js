"use client";

import { useState } from "react";

function numberToArabicWords(num: number): string {
  const words: { [key: number]: string } = {
    0: "صفر",
    1: "واحد",
    2: "اثنان",
    3: "ثلاثة",
    4: "أربعة",
    5: "خمسة",
    6: "ستة",
    7: "سبعة",
    8: "ثمانية",
    9: "تسعة",
    10: "عشرة",
    11: "أحد عشر",
    12: "اثنا عشر",
    13: "ثلاثة عشر",
    14: "أربعة عشر",
    15: "خمسة عشر",
    16: "ستة عشر",
    17: "سبعة عشر",
    18: "ثمانية عشر",
    19: "تسعة عشر",
    20: "عشرون",
  };

  return words[num] || num.toString();
}

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleConvert = () => {
    const num = parseInt(input);
    if (isNaN(num)) {
      setOutput("الرجاء إدخال رقم صحيح");
    } else {
      setOutput(numberToArabicWords(num));
    }
  };

  return (
    <main style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>تفقيط الأرقام</h1>
      <input
        type="text"
        placeholder="أدخل رقم"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      />
      <button onClick={handleConvert} style={{ padding: "8px 15px" }}>
        تفقيط
      </button>
      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        {output}
      </div>
    </main>
  );
}