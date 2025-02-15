"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import CreateEssayAnswer from "../actions/create-essay-answer";
import { useRouter } from "next/navigation";
import CreateMCScore from "../actions/create-mc-score";

interface Question {
  exam_question_id: number;
  item_number: number;
  question: string;
  correct_answer: string;
  exam_type: string;
  written_exam: number;
}

interface Choice {
  question_choice_id: number;
  choice: string;
  exam_question_id: number;
}

export default function Exam({
  questions,
  choices,
  studentSerial,
  writtenExam,
}: {
  questions: Question[];
  choices: Choice[];
  studentSerial: number;
  writtenExam: number;
}) {
  const router = useRouter();
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [essayAnswers, setEssayAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [score, setScore] = useState<number | null>(null);

  const mcQuestions = questions.filter(
    (question) => question.exam_type === "mc"
  );

  const essayQuestions = questions.filter(
    (question) => question.exam_type === "essay"
  );

  const handleSelect = (questionId: number, choice: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: choice,
    }));
  };

  const handleEssayChange = (questionId: number, value: string) => {
    setEssayAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Handle submission & scoring
  const handleSubmit = async () => {
    let correctCount = 0;

    mcQuestions.forEach((question) => {
      const selectedAnswer = selectedAnswers[question.exam_question_id];
      if (selectedAnswer === question.correct_answer) {
        correctCount += 1;
      }
    });

    Object.entries(essayAnswers).forEach(async ([questionId, answer]) => {
      const response = await CreateEssayAnswer({
        answerText: answer,
        studentSerial: studentSerial,
        examQuestionId: parseInt(questionId),
      });
      console.log(response);
    });

    const response = await CreateMCScore({
      studentSerial,
      score: correctCount,
      writtenExam,
    });
    console.log(response);

    setScore(correctCount);
    console.log(score);
  };

  return (
    <>
      {score !== null && score > 0 ? (
        <div className="flex flex-col justify-center items-center py-64">
          <div className="bg-white shadow-md rounded-lg p-6 w-80 md:w-96 text-center">
            <h3 className="text-2xl font-semibold text-gray-800">
              Multiple Choice Score: {score} / {mcQuestions.length}
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              The essay answers will be graded shortly. You can review them
              later.
            </p>
            <Button
              className="mt-6"
              onClick={() => router.push("/student/assessments")}
            >
              Go to assessments page
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-8">
          <div className="grid gap-4">
            <h2 className="text-xl font-semibold">Multiple Choice</h2>
            {mcQuestions.map((question) => (
              <div
                key={question.exam_question_id}
                className="bg-white/20 p-6 rounded-2xl hover:shadow-lg transition-shadow ease-in-out duration-300"
              >
                <h3 className="text-md text-gray-800 mb-4">
                  {question.item_number}. {question.question}
                </h3>
                <ul className="space-y-3">
                  {choices
                    .filter(
                      (choice) =>
                        choice.exam_question_id === question.exam_question_id
                    )
                    .map((choice) => (
                      <li
                        key={choice.question_choice_id}
                        className="flex items-center gap-3 p-3 border rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <input
                          type="radio"
                          id={`choice-${choice.question_choice_id}`}
                          name={`question-${question.exam_question_id}`}
                          value={choice.choice}
                          checked={
                            selectedAnswers[question.exam_question_id] ===
                            choice.choice
                          }
                          onChange={() =>
                            handleSelect(
                              question.exam_question_id,
                              choice.choice
                            )
                          }
                          className="w-5 h-5 text-blue-500 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={`choice-${choice.question_choice_id}`}
                          className="text-gray-700 cursor-pointer"
                        >
                          {choice.choice}
                        </label>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="grid gap-6">
            <h2 className="text-2xl font-bold text-gray-800">Essay</h2>
            {essayQuestions.map((question) => (
              <div
                key={question.exam_question_id}
                className="p-6 rounded-xl grid gap-4 bg-white/20 hover:shadow-lg transition-shadow ease-in-out duration-300"
              >
                <h3 className="text-md text-gray-700">
                  {question.item_number}. {question.question}
                </h3>
                <Textarea
                  value={essayAnswers[question.exam_question_id] || ""}
                  onChange={(e) =>
                    handleEssayChange(question.exam_question_id, e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      )}
    </>
  );
}
