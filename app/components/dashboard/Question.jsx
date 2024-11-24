import React from "react";
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
  handleImageUpload
}) => (
  <div key={index} className="mb-6 p-4 border rounded-md">
    <input
      type="text"
      placeholder="Question Text (supports LaTeX)"
      value={question.questionText}
      onChange={(e) =>
        handleQuestionChange(index, "questionText", e.target.value)
      }
      className="border p-2 mb-4 w-full"
    />
    <p dangerouslySetInnerHTML={renderLatex(question.questionText)} className="katex-preview"></p>

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

export default Question;
