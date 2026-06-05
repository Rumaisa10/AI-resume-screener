"use client";
import { useState } from "react";
import ResultCard from "./ResultCard";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const resumeContent = e.target?.result as string;

        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resumeContent,
            description,
            fileName: file.name,
          }),
        });

        if (!response.ok) {
          throw new Error("error");
        }

        const data = await response.json();
        console.log(data);
        setResult(data.result);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
      reader.readAsText(file);
    };
  };
  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-lg space-y-6"
        >
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Analyse your resume
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Upload your CV and paste a job description to get AI feedback.
            </p>
          </div>

          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50 transition">
            <input
              type="file"
              accept=".pdf,.txt"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
            />
            <label htmlFor="fileInput" className="cursor-pointer">
              <p className="text-sm text-gray-500">
                Drop your CV here or{" "}
                <span className="text-black font-medium">click to browse</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">Accepts .pdf or .txt</p>
            </label>
            {file && (
              <p className="text-sm text-green-600 font-medium mt-2">
                ✓ {file.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Job description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none h-32 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Analysing..." : "Analyse resume"}
          </button>
        </form>
      </div>
      {result && <ResultCard result={result}></ResultCard>}
    </div>
  );
}
