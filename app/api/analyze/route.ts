import { NextRequest, NextResponse } from "next/server";

import genAI from "@/lib/claude";
export async function POST(req: NextRequest) {

  const { resumeContent, jobDescription } = await req.json();

  
  const prompt = `
  You are a professional resume screener. 
Analyse this resume against the job description and provide:
- A score out of 100
- Key strengths
- Areas for improvement
- Overall feedback

Resume: ${resumeContent}
Job Description: ${jobDescription}
  `;

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
const result = await model.generateContent(prompt)
const text = result.response.text()

return NextResponse.json({ result: text })
}
