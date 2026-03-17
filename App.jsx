import html2pdf from "html2pdf.js";
import { useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [input, setInput] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [jobDescription, setJobDescription] = useState("");
  const [atsScore, setAtsScore] = useState(null);

  const generateResume = () => {
    setLoading(true);
    fetch("http://localhost:8080/api/resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResume(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const calculateATS = () => {
    if (!resume || !jobDescription) return;

    const resumeText = JSON.stringify(resume).toLowerCase();

    const stopWords = [
      "the","and","for","with","that","this","are","was","have","has",
      "had","will","shall","must","should","can","may","our","your",
      "their","candidate","ideal","required","preferred","role",
      "job","work","team","strong","experience","skills"
    ];

    const jdWords = jobDescription
      .toLowerCase()
      .split(/\W+/)
      .filter(word => word.length > 3 && !stopWords.includes(word));

    if (jdWords.length < 5) {
      setAtsScore(0);
      return;
    }

    const uniqueJDWords = [...new Set(jdWords)];
    let matchCount = 0;

    uniqueJDWords.forEach(word => {
      if (resumeText.includes(word)) {
        matchCount++;
      }
    });

    let rawScore = (matchCount / uniqueJDWords.length) * 100;
    let realisticScore = Math.round(rawScore * 0.9);
    if (realisticScore > 92) realisticScore = 92;

    setAtsScore(realisticScore);
  };

  // ✅ PDF FUNCTION
  const downloadPDF = () => {
    const element = document.getElementById("resume-content");

    const opt = {
      margin: 0.4,
      filename: `${resume?.name || "resume"}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div
      className={`min-h-screen transition-all duration-700 ${
        darkMode
          ? "bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-200"
          : "bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 text-gray-800"
      } p-10`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-6xl mx-auto rounded-3xl p-10 transition-all duration-500 shadow-2xl ${
          darkMode
            ? "bg-gray-900 border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.15)]"
            : "bg-white/80 backdrop-blur-xl"
        }`}
      >

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            AI Resume Studio
          </h1>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:scale-105 transition"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Resume Input */}
        <textarea
          rows="4"
          className={`w-full p-4 rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            darkMode
              ? "bg-gray-800 text-white border border-gray-700 placeholder-gray-400"
              : "bg-white text-gray-800 border border-gray-300 placeholder-gray-500"
          }`}
          placeholder="Enter resume description..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* Job Description Input */}
        <textarea
          rows="4"
          className={`w-full mt-4 p-4 rounded-lg shadow-md ${
            darkMode
              ? "bg-gray-800 text-white border border-gray-700"
              : "bg-white text-gray-800 border border-gray-300"
          }`}
          placeholder="Paste Job Description here for ATS analysis..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        {/* BUTTONS */}
        <div className="mt-4 flex gap-4 flex-wrap">
          <button
            onClick={generateResume}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:scale-105 transition"
          >
            Generate Resume
          </button>

          {resume && (
            <button
              onClick={downloadPDF}
              className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:scale-105 transition"
            >
              Download PDF
            </button>
          )}

          {resume && jobDescription && (
            <button
              onClick={calculateATS}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:scale-105 transition"
            >
              Calculate ATS Score
            </button>
          )}
        </div>

        {atsScore !== null && (
          <div className="mt-4 p-4 rounded-lg bg-blue-100 text-blue-800 font-semibold">
            ATS Match Score: {atsScore}%
          </div>
        )}

        {loading && <p className="mt-4 animate-pulse">Generating...</p>}

        {/* RESUME SECTION */}
        {resume && (
          <div id="resume-content" className="grid md:grid-cols-3 gap-10 mt-10">

            {/* LEFT SIDEBAR */}
            <div className="space-y-8">

              {resume.skills?.technical?.length > 0 && (
                <div>
                  <h3 className="font-bold border-b mb-3">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.technical.map((skill, i) => (
                      <span key={i} className="px-3 py-1 rounded-full text-sm bg-purple-200 text-purple-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {resume.skills?.soft?.length > 0 && (
                <div>
                  <h3 className="font-bold border-b mb-3">Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.soft.map((skill, i) => (
                      <span key={i} className="px-3 py-1 rounded-full text-sm bg-pink-200 text-pink-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {resume.languages?.length > 0 && (
                <div>
                  <h3 className="font-bold border-b mb-2">Languages</h3>
                  <p>{resume.languages.join(", ")}</p>
                </div>
              )}

              {resume.certifications?.length > 0 && (
                <div>
                  <h3 className="font-bold border-b mb-2">Certifications</h3>
                  {resume.certifications.map((cert, i) => (
                    <p key={i}>{cert.title} - {cert.issuer}</p>
                  ))}
                </div>
              )}

            </div>

            {/* RIGHT SIDE */}
            <div className="md:col-span-2 space-y-8">

              <div className="border-b pb-4">
                <h2 className="text-3xl font-bold">{resume.name}</h2>
                <p className="text-sm mt-1">
                  {resume.email} | {resume.phone}
                </p>
              </div>

              {resume.summary && (
                <div>
                  <h3 className="font-bold border-b mb-2">Professional Summary</h3>
                  <p>{resume.summary}</p>
                </div>
              )}

              {resume.education?.map((edu, i) => (
                <p key={i}>{edu.degree} - {edu.college} ({edu.year})</p>
              ))}

              {resume.experience?.map((exp, i) => (
                <div key={i}>
                  <p className="font-semibold">{exp.title} - {exp.company}</p>
                  <p className="text-sm">{exp.duration}</p>
                  <p>{exp.description}</p>
                </div>
              ))}

              {resume.projects?.map((project, i) => (
                <div key={i}>
                  <p className="font-semibold">{project.title}</p>
                  <p>{project.description}</p>
                </div>
              ))}

              {resume.achievements?.map((ach, i) => (
                <p key={i}>• {ach}</p>
              ))}

            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
}

export default App;