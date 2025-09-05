import { NextResponse } from "next/server"

// دالة تحويل الأرقام لنص عربي (مبسطة)
function tafqeet(num: number): string {
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
    20: "عشرون",
    30: "ثلاثون",
    40: "أربعون",
    50: "خمسون",
    100: "مائة",
  }
  return words[num] || num.toString()
}

export async function POST(req: Request) {
  const { action, text } = await req.json()
  let result: any = text

  switch (action) {
    case "tafqeet":
      result = text.replace(/\d+/g, (match) => tafqeet(parseInt(match)))
      break
    // باقي الأكشنات القديمة
  }

  return NextResponse.json({ result })
}

export async function POST(req) {
  const { text = "", action } = await req.json()
  let result = ""

  switch (action) {
    case "uppercase":
      result = text.toUpperCase()
      break
    case "lowercase":
      result = text.toLowerCase()
      break
    case "capitalize":
      result = text.replace(/\w\S*/g, (w) =>
        w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
      )
      break
    case "reverse":
      result = text.split("").reverse().join("")
      break
    case "remove-spaces":
      result = text.replace(/\s+/g, " ").trim()
      break
    case "remove-empty-lines":
      result = text.split(/\r?\n/).filter(l => l.trim() !== "").join("\n")
      break
    case "remove-duplicates":
      {
        const lines = text.split(/\r?\n/)
        const seen = new Set()
        result = lines.filter(l => {
          if (seen.has(l)) return false
          seen.add(l)
          return true
        }).join("\n")
      }
      break
    case "sort-asc":
      result = text.split(/\r?\n/).filter(Boolean).sort().join("\n")
      break
    case "sort-desc":
      result = text.split(/\r?\n/).filter(Boolean).sort().reverse().join("\n")
      break
    case "count":
      {
        const words = text.trim() ? text.trim().split(/\s+/).length : 0
        const chars = text.length
        result = `Words: ${words}, Characters: ${chars}`
      }
      break
    case "to-json":
      result = JSON.stringify(text.split(/\r?\n/).filter(Boolean), null, 2)
      break
    case "to-csv":
      result = text.split(/\r?\n/).filter(Boolean)
        .map(r => `"${r.replace(/"/g, '""')}"`)
        .join("\n")
      break
    default:
      return NextResponse.json({ error: "Unknown action" }, { status: 400 })
  }

  return NextResponse.json({ result })
}
