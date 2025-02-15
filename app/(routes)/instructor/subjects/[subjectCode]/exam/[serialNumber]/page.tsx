"use client";

import { ReadEssayAnswers } from "@/app/_features/instructor/manage-exam/actions/read-essay-answers";
import { ReadExam } from "@/app/_features/instructor/manage-exam/actions/read-exam";
import Students from "@/app/_features/instructor/manage-exam/components/students";
import { ReadQuestion } from "@/app/_features/student/assessment/actions/read-question";
import { useEffect, useState } from "react";

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

interface Params {
  subjectCode: string;
  serialNumber: string;
}

async function GetAllQuestions(subjectCode: string): Promise<Question[]> {
  const response = await ReadExam({ subjectCode });
  return response.data && response.data.length > 0
    ? await GetQuestions({ examId: response.data[0].exam_id })
    : [];
}

async function GetQuestions({
  examId,
}: {
  examId: number;
}): Promise<Question[]> {
  const response = await ReadQuestion({ examId });
  return response.success && Array.isArray(response.data)
    ? (response.data as Question[])
    : [];
}

async function GetEssayAnswers({
  serialNumber,
  questionId,
}: {
  serialNumber: number;
  questionId: number[];
}): Promise<Answer[]> {
  const essayAnswerList = await Promise.all(
    questionId.map(async (id) => {
      const response = await ReadEssayAnswers({
        examQuestionId: id,
        studentSerial: serialNumber,
      });
      return response.data?.[0] || null;
    })
  );
  return essayAnswerList.filter((answer): answer is Answer => answer !== null);
}

export default function CheckEssayPage({ params }: { params: Params }) {
  const [essayQuestions, setEssayQuestions] = useState<Question[]>([]);
  const [essayAnswers, setEssayAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    async function fetchData() {
      const questions = await GetAllQuestions(params.subjectCode);
      const filteredQuestions = questions.filter(
        (q) => q.exam_type === "essay"
      );
      const questionId = filteredQuestions.map((q) => q.exam_question_id);

      setEssayQuestions(filteredQuestions);
      const answers = await GetEssayAnswers({
        serialNumber: Number(params.serialNumber),
        questionId,
      });
      setEssayAnswers(answers);
    }

    fetchData();
  }, [params.subjectCode, params.serialNumber]);

  return (
    <Students
      essayQuestions={essayQuestions}
      essayAnswers={essayAnswers}
      subjectCode={params.subjectCode}
    />
  );
}
