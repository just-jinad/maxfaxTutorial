import React, { useState } from 'react';

export default function EditQuizModal({ quiz, onClose, onUpdate }) {
  const [editedQuiz, setEditedQuiz] = useState(quiz);

  const handleQuizChange = (e) => {
    const { name, value } = e.target;
    setEditedQuiz({ ...editedQuiz, [name]: value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...editedQuiz.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setEditedQuiz({ ...editedQuiz, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...editedQuiz.questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setEditedQuiz({ ...editedQuiz, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setEditedQuiz({
      ...editedQuiz,
      questions: [
        ...editedQuiz.questions,
        { questionText: "", options: ["", "", "", ""], correctAnswer: "", imageUrl: "", questionType: "MCQ" }
      ]
    });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = editedQuiz.questions.filter((_, i) => i !== index);
    setEditedQuiz({ ...editedQuiz, questions: updatedQuestions });
  };

  const handleCheckboxChange = (e) => {
    setEditedQuiz({ ...editedQuiz, showScoresImmediately: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedQuiz);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-bold mb-4">Edit Quiz</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={editedQuiz.title}
              onChange={handleQuizChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              value={editedQuiz.subject}
              onChange={handleQuizChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Attempt Limit</label>
            <input
              type="number"
              name="attemptLimit"
              value={editedQuiz.attemptLimit}
              onChange={handleQuizChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Time Limit (minutes)</label>
            <input
              type="number"
              name="timeLimit"
              value={editedQuiz.timeLimit}
              onChange={handleQuizChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
          <label className="block mb-1">Show Answers Immediately</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={editedQuiz.showScoresImmediately}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <span>Allow students to view correct and wrong answers immediately after submission</span>
          </div>
        </div>
          <div>
            <h4 className="font-bold mb-2">Questions</h4>
            {editedQuiz.questions.map((question, qIndex) => (
              <div key={qIndex} className="border p-4 mb-4 rounded">
                <div className="mb-2">
                  <label className="block mb-1">Question Text</label>
                  <textarea
                    value={question.questionText}
                    onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  />
                  <label className="block mb-1">Latex Text</label>
                     <textarea
                    value={question.latexEquation}
                    onChange={(e) => handleQuestionChange(qIndex, 'latexEquation', e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-1">Question Type</label>
                  <select
                    value={question.questionType}
                    onChange={(e) => handleQuestionChange(qIndex, 'questionType', e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="MCQ">MCQ</option>
                    <option value="Theory">Theory</option>
                  </select>
                </div>
                {question.questionType === 'MCQ' && (
                  <div className="mb-2">
                    <label className="block mb-1">Options</label>
                    {question.options.map((option, optIndex) => (
                      <input
                        key={optIndex}
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                        className="w-full px-3 py-2 border rounded mb-2"
                        placeholder={`Option ${optIndex + 1}`}
                      />
                    ))}
                    <div>
                      <label className="block mb-1">Correct Answer</label>
                      <input
                        type="text"
                        value={question.correctAnswer}
                        onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                  </div>
                )}
                <div className="mb-2">
                  <label className="block mb-1">Image URL (optional)</label>
                  <input
                    type="text"
                    value={question.imageUrl}
                    onChange={(e) => handleQuestionChange(qIndex, 'imageUrl', e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeQuestion(qIndex)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Remove Question
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addQuestion}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Question
            </button>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

