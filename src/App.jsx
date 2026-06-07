import { useState } from "react";
import axios from "axios";

function App() {

  const [skills, setSkills] = useState("");
  const [career, setCareer] = useState("");
  const [loading, setLoading] = useState(false);

  const generateCareerAdvice = async () => {

    if (!skills) {
      alert("Please enter your skills");
      return;
    }

    setLoading(true);

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

    try {

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `
              I know these skills:
              ${skills}

              Suggest:
              1. Best career paths
              2. Skills to learn next
              3. Salary opportunities
              4. Roadmap
              5. Best technologies to focus on
              `,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result =
        response.data.choices[0].message.content;

      setCareer(result);

    } catch (error) {

      console.log(error);

      setCareer(
        "Error: " +
        (error.response?.data?.error?.message || error.message)
      );
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #000000, #1e3a8a)",
        color: "white",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Arial",
        textAlign: "center",
      }}
    >

      <h1
        style={{
          fontSize: "55px",
          color: "#60a5fa",
        }}
      >
        AI Career Advisor
      </h1>

      <p
        style={{
          color: "#d1d5db",
          fontSize: "20px",
          marginBottom: "30px",
        }}
      >
        Get AI-powered career guidance
      </p>

      <textarea
        placeholder="Enter your skills, interests, technologies..."
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        style={{
          width: "80%",
          height: "220px",
          padding: "20px",
          borderRadius: "15px",
          border: "none",
          fontSize: "16px",
          outline: "none",
          background: "#1f2937",
          color: "white",
        }}
      />

      <br />

      <button
        onClick={generateCareerAdvice}
        style={{
          marginTop: "20px",
          padding: "15px 35px",
          background: "#2563eb",
          border: "none",
          borderRadius: "12px",
          color: "white",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        {loading ? "Generating..." : "Get Career Advice"}
      </button>

      <div
        style={{
          marginTop: "40px",
          background: "#111827",
          padding: "25px",
          borderRadius: "15px",
          width: "80%",
          marginInline: "auto",
          textAlign: "left",
          whiteSpace: "pre-wrap",
          lineHeight: "1.8",
          fontSize: "17px",
        }}
      >
        {career}
      </div>

    </div>
  );
}

export default App;