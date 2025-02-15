"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreateWrittenScore from "../actions/create-written-score";
import { useRouter } from "next/navigation";

interface Answer {
  essay_answer_id: number;
  answer_text: string;
  student_serial: number;
  exam_question_id: number;
}

interface Question {
  exam_question_id: number;
  item_number: number;
  question: string;
  correct_answer: string;
  exam_type: string;
  written_exam: number;
}

export default function Students({
  essayQuestions,
  essayAnswers,
  subjectCode,
}: {
  essayQuestions: Question[];
  essayAnswers: Answer[];
  subjectCode: string;
}) {
  const router = useRouter();
  const [grades, setGrades] = useState<{ [key: number]: number }>({});

  const handleGradeChange = (questionId: number, value: string) => {
    setGrades((prevGrades) => ({
      ...prevGrades,
      [questionId]: Number(value),
    }));
  };

  const handleSubmit = () => {
    let totalScore = 0;
    essayQuestions.forEach((question) => {
      grades[question.exam_question_id] =
        grades[question.exam_question_id] || 0;
      totalScore += grades[question.exam_question_id];
    });

    CreateWrittenScore({
      studentSerial: essayAnswers[0].student_serial,
      writtenExam: essayQuestions[0].written_exam,
      essayScore: totalScore,
    }).then((response) => {
      if (response.success) {
        router.push(`/instructor/subjects/${subjectCode}/exam`);
      } else {
        alert("An error occurred. Please try again later");
      }
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {essayQuestions.map((question) => {
        const answer = essayAnswers.find(
          (ans) => ans.exam_question_id === question.exam_question_id
        );

        return (
          <div
            key={question.exam_question_id}
            className="mb-6 p-4 bg-white shadow-md rounded-lg flex items-start"
          >
            <input
              min="0"
              value={grades[question.exam_question_id] || ""}
              onChange={(e) =>
                handleGradeChange(question.exam_question_id, e.target.value)
              }
              className="w-20 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none mr-4"
            />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-900 mb-2">
                {question.item_number}. {question.question}
              </h1>
              {answer && (
                <h2 className="text-md text-gray-700 mb-3 break-words">
                  Answer: {answer.answer_text}
                </h2>
              )}
            </div>
          </div>
        );
      })}

      <div className="flex justify-end">
        <Button onClick={handleSubmit}>Submit Grades</Button>
      </div>
    </div>
  );
}
