import React, { useState } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

// Function to render LaTeX text
const renderLatex = (text) => {
  return { __html: katex.renderToString(text, { throwOnError: false }) };
};

const Question = ({
  question,
  index,
  handleQuestionChange,
  handleOptionChange,
  handleImageUpload,
  handleAddOption,
  handleRemoveOption,
}) => {
  const [plainText, setPlainText] = useState(question.plainText || "");
  const [latexText, setLatexText] = useState(question.latexText || "");

  const handlePlainTextChange = (e) => {
    const value = e.target.value;
    setPlainText(value);
    handleQuestionChange(index, "plainText", value);
    handleQuestionChange(index, "questionText", value || latexText);
  };

  const handleLatexTextChange = (e) => {
    const value = e.target.value;
    setLatexText(value);
    handleQuestionChange(index, "latexText", value);
    handleQuestionChange(index, "questionText", plainText || value);
  };

  const handleCorrectAnswerChange = (optIndex, checked) => {
    const updatedOptions = [...question.options];
    updatedOptions.forEach((option, i) => {
      option.isCorrect = i === optIndex && checked;
    });
    handleQuestionChange(index, "options", updatedOptions);
  };

  return (
    <div
      key={index}
      className="mb-6 p-4 border rounded-md bg-white shadow-sm sm:mb-4 md:p-6"
    >
      {/* Plain Text Input */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Question Text (Plain):
        </label>
        <input
          type="text"
          placeholder="Enter plain text question"
          value={plainText}
          onChange={handlePlainTextChange}
          className="border p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* LaTeX Input */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Question Text (LaTeX):
        </label>
        <input
          type="text"
          placeholder="Enter LaTeX question"
          value={latexText}
          onChange={handleLatexTextChange}
          className="border p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* LaTeX Preview */}
      {latexText && (
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            LaTeX Preview:
          </label>
          <div
            className="p-2 bg-gray-50 border rounded-md overflow-x-auto"
            dangerouslySetInnerHTML={renderLatex(latexText)}
          />
        </div>
      )}

      {/* Question Type */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Question Type:
        </label>
        <select
          value={question.questionType}
          onChange={(e) =>
            handleQuestionChange(index, "questionType", e.target.value)
          }
          className="border p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="MCQ">Multiple Choice</option>
          <option value="Theory">Theory</option>
        </select>
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Upload Image (Optional):
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(index, e.target.files[0])}
          className="border p-2 w-full rounded-md focus:outline-none"
        />
        {question.imageUrl && (
          <img
            src={question.imageUrl}
            alt="Uploaded"
            className="w-full h-auto mt-2 rounded-md"
          />
        )}
      </div>

      {/* Options for MCQ */}
      {question.questionType === "MCQ" && (
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Options:
          </label>
          {question.options.map((option, optIndex) => (
            <div
              key={optIndex}
              className="flex flex-wrap items-center gap-2 mb-2"
            >
              <input
                type="text"
                placeholder={`Option ${optIndex + 1}`}
                value={option.content}
                onChange={(e) =>
                  handleOptionChange(index, optIndex, "content", e.target.value)
                }
                className="border p-2 flex-1 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              <select
                value={option.type}
                onChange={(e) =>
                  handleOptionChange(index, optIndex, "type", e.target.value)
                }
                className="border p-2 rounded-md"
              >
                <option value="plain">Plain Text</option>
                <option value="latex">LaTeX</option>
              </select>
              <label className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={option.isCorrect}
                  onChange={(e) =>
                    handleCorrectAnswerChange(optIndex, e.target.checked)
                  }
                  className="form-checkbox"
                />
                <span className="text-sm">Correct</span>
              </label>
              <button
                onClick={() => handleRemoveOption(index, optIndex)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => handleAddOption(index)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm"
          >
            Add Option
          </button>
        </div>
      )}

      {/* Correct Answer for Theory */}
      {question.questionType === "Theory" && (
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Correct Answer:
          </label>
          <textarea
            placeholder="Enter correct answer for theory"
            value={question.correctAnswer}
            onChange={(e) =>
              handleQuestionChange(index, "correctAnswer", e.target.value)
            }
            className="border p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      )}
    </div>
  );
};

export default Question;
