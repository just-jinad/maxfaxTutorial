"use client"; // Ensure this component runs on the client side
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // for notification

const QuizSubmissions = ({ quizId }) => {
    const router = useRouter();
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }

        const fetchSubmissions = async () => {
            try {
                const response = await fetch(`/api/quiz/${quizId}/submissions`);
                if (!response.ok) {
                    throw new Error("Failed to fetch submissions");
                }
                const data = await response.json();
                setSubmissions(data);
            } catch (error) {
                console.error("Error fetching submissions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, [quizId, router]);

    const handleDeleteAllSubmissions = async () => {
        try {
            const response = await fetch(`/api/quiz/${quizId}/submissions`, {
                method: "DELETE",
            });

            if (response.ok) {
                setSubmissions([]);
                setShowModal(false);
                toast.success("All scores deleted successfully.", {
                    position: "top-center",
                    style: { backgroundColor: "green", color: "white" },
                });
            } else {
                throw new Error("Failed to delete submissions");
            }
        } catch (error) {
            console.error("Error deleting submissions:", error);
            toast.error("Failed to delete scores.", {
                position: "top-center",
                style: { backgroundColor: "red", color: "white" },
            });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-5">
            <h2 className="text-3xl font-bold mb-4 text-center">Quiz Submissions</h2>
            <button
                onClick={() => setShowModal(true)}
                className="mb-4 px-4 py-2 bg-red-500 text-white rounded-md"
            >
                Delete All Scores
            </button>
            
            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
                        <p className="text-gray-700 mb-6">
                            Are you sure you want to delete all scores for this quiz? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteAllSubmissions}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ul className="space-y-3">
                {submissions.length > 0 ? (
                    submissions.map((submission) => (
                        <li
                            key={submission._id}
                            className="bg-white shadow-md rounded-lg p-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            <p className="font-semibold">
                                Student Name:{" "}
                                <span className="font-normal">
                                    {submission.studentName || "Unknown"}
                                </span>
                            </p>
                            <p className="text-gray-600">
                                Score:{" "}
                                <span className="font-bold text-green-500">
                                    {submission.score || "N/A"}
                                </span>
                            </p>
                        </li>
                    ))
                ) : (
                    <li className="bg-white shadow-md rounded-lg p-4 text-center">
                        No submissions found for this quiz.
                    </li>
                )}
            </ul>
        </div>
    );
};

export default QuizSubmissions;
