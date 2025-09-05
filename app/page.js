"use client"
import { useState } from "react"

const ACTIONS = [
  { key: "uppercase", label: "UPPERCASE" },
  { key: "lowercase", label: "lowercase" },
  { key: "capitalize", label: "Capitalize" },
  { key: "reverse", label: "Reverse" },
  { key: "remove-spaces", label: "Remove Spaces" },
  { key: "remove-empty-lines", label: "Remove Empty Lines" },
  { key: "remove-duplicates", label: "Remove Duplicates" },
  { key: "sort-asc", label: "Sort A–Z" },
  { key: "sort-desc", label: "Sort Z–A" },
  { key: "count", label: "Word/Char Count" },
  { key: "to-json", label: "To JSON" },
  { key: "to-csv", label: "To CSV" },
  { key: "tafqeet", label: "تفقيط الأرقام" }, // ✅ زر جديد
]

export default function Home() {
  const [text, setText] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleAction = async (action: string) => {
    setError("")
    setLoading(true)
    try {
      const res = await fetch(`/api/tools`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, text }),
      })
      if (!res.ok) throw new Error("Server error " + res.status)
      const data = await res.json()
      setResult(typeof data.result === "string" ? data.result : JSON.stringify(data.result, null, 2))
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const copyResult = async () => {
    if (!result) return
    await navigator.clipboard.writeText(result)
    alert("Copied to clipboard!")
  }

  const clearAll = () => { setText(""); setResult(""); setError("") }

  // دالة تشيك لو النص عربي
  const isArabic = (txt: string) => /^[\u0600-\u06FF]/.test(txt)

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="max-w-4xl w-full space-y-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 tracking-tight">
          FixText — Clone
        </h1>
        <p className="text-center text-gray-500">
          Smart tools to clean and transform your text with one click.
        </p>

        {/* Input */}
        <div className="space-y-2">
          <label className="block text-lg font-semibold">Input</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-44 p-4 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="✍️ اكتب النص هنا..."
            dir={isArabic(text) ? "rtl" : "ltr"}
            style={{ textAlign: isArabic(text) ? "right" : "left" }}
          />
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {ACTIONS.map(a => (
            <button
              key={a.key}
              onClick={() => handleAction(a.key)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium shadow hover:from-blue-700 hover:to-blue-600 transition disabled:opacity-50"
              disabled={loading}
            >
              {a.label}
            </button>
          ))}
        </div>

        {/* Tools */}
        <div className="flex gap-3">
          <button
            onClick={copyResult}
            className="px-4 py-2 rounded-xl bg-green-600 text-white font-medium shadow hover:bg-green-700 transition"
          >
            📋 Copy
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-2 rounded-xl bg-gray-300 text-gray-800 font-medium shadow hover:bg-gray-400 transition"
          >
            🗑 Clear
          </button>
          {loading && <div className="self-center text-blue-600 font-semibold">Processing...</div>}
          {error && <div className="text-red-600 font-semibold ml-4">{error}</div>}
        </div>

        {/* Result */}
        <div className="space-y-2">
          <label className="block text-lg font-semibold">Result</label>
          <textarea
            value={result}
            readOnly
            className="w-full h-44 p-4 border border-gray-300 rounded-2xl shadow-sm bg-gray-100 focus:outline-none"
            dir={isArabic(result) ? "rtl" : "ltr"}
            style={{ textAlign: isArabic(result) ? "right" : "left" }}
          />
        </div>
      </div>
    </main>
  )
}