import React, { useState } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

const renderLatex = (text) => {
  return { __html: katex.renderToString(text, { throwOnError: false }) };
};

const Question = ({
  question,
  index,
  handleQuestionChange,
  handleOptionChange,
  handleImageUpload,
}) => {
  // Regular text input for question
  const [plainText, setPlainText] = useState(question.questionText || "");
  
  // LaTeX input for question
  const [latexEquation, setLatexText] = useState(question.latexEquation || "");

  // Handle changes to plain text
  const handlePlainTextChange = (e) => {
    const value = e.target.value;
    setPlainText(value);
    handleQuestionChange(index, "questionText", value); // Pass plain text to parent component
  };

  // Handle changes to LaTeX text
  const handleLatexChange = (e) => {
    const value = e.target.value;
    setLatexText(value);
    handleQuestionChange(index, "latexEquation", value); // Pass LaTeX to parent component
  };

  return (
    <div key={index} className="mb-6 p-4 border rounded-md">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter plain text (for question)"
          value={plainText}
          onChange={handlePlainTextChange}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter LaTeX (for math formulas)"
          value={latexEquation}
          onChange={handleLatexChange}
          className="border p-2 w-full"
        />
        <p dangerouslySetInnerHTML={renderLatex(latexEquation)} className="katex-preview mt-2"></p>
      </div>

      <select
        value={question.questionType}
        onChange={(e) =>
          handleQuestionChange(index, "questionType", e.target.value)
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="MCQ">Multiple Choice</option>
        <option value="Theory">Theory</option>
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(index, e.target.files[0])}
        className="mb-2"
      />
      {question.imageUrl && (
        <img src={question.imageUrl} alt="Uploaded" className="w-full h-auto mt-2" />
      )}

      {question.questionType === "MCQ" &&
        question.options.map((option, optIndex) => (
          <div key={optIndex}>
            <input
              type="text"
              placeholder={`Option ${optIndex + 1} (supports LaTeX)`}
              value={option}
              onChange={(e) =>
                handleOptionChange(index, optIndex, e.target.value)
              }
              className="border p-2 mb-2 w-full"
            />
            <p dangerouslySetInnerHTML={renderLatex(option)} className="katex-preview"></p>
          </div>
        ))}

      <input
        type="text"
        placeholder="Correct Answer"
        value={question.correctAnswer}
        onChange={(e) =>
          handleQuestionChange(index, "correctAnswer", e.target.value)
        }
        className="border p-2 mb-4 w-full"
      />
    </div>
  );
};

export default Question;
