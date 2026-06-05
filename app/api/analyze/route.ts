import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import genAI from "@/lib/claude";
export async function POST(req: NextRequest) {

  const { resumeContent, jobDescription , fileName } = await req.json();

  
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

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
const result = await model.generateContent(prompt)
const text = result.response.text()
const client = await clientPromise
const db = client.db('ai-resume-screener')
await db.collection('results').insertOne({
  fileName,
  resumeContent,
  jobDescription,
  result: text,
  createdAt: new Date()
})


return NextResponse.json({ result: text })
}

