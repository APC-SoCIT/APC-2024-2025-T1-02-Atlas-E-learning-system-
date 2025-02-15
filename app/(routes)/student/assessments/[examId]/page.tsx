import { ReadChoices } from "@/app/_features/student/assessment/actions/read-choice";
import { ReadQuestion } from "@/app/_features/student/assessment/actions/read-question";
import { ReadStudentSerial } from "@/app/_features/student/assessment/actions/read-serial-id";
import Exam from "@/app/_features/student/assessment/components/exam";
import { cookies } from "next/headers";

async function GetQuestions({ examId }: { examId: number }) {
  const response = await ReadQuestion({ examId }).then((response) => {
    if (response.success) {
      return response.data;
    } else {
      console.log(response.message);
    }
  });
  return response;
}

async function GetChoices({ questionId }: { questionId: number }) {
  const response = await ReadChoices({ examQuestionId: questionId }).then(
    (response) => {
      if (response.success) {
        return response.data;
      } else {
        console.log(response.message);
      }
    }
  );
  return response;
}

type Choices = {
  question_choice_id: number;
  choice: string;
  exam_question_id: number;
};

type Question = {
  exam_question_id: number;
  item_number: number;
  question: string;
  correct_answer: string;
  exam_type: string;
  written_exam: number;
};
export default async function ExamPage({
  params,
}: {
  params: { examId: number };
}) {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;

  const response = await ReadStudentSerial({ userId: Number(userId) });
  const studentId = response.data;

  const data = (await GetQuestions({ examId: params.examId })) as
    | Question[]
    | undefined;

  if (!data || !Array.isArray(data)) {
    return <div>Exam not found</div>;
  }
  async function fetchAllChoices() {
    const allChoices: Choices[] = [];
    if (!data) {
      return;
    }
    for (const question of data) {
      const choices = await GetChoices({
        questionId: question.exam_question_id,
      });
      if (choices) {
        allChoices.push(...(choices as Choices[]));
      }
    }

    return allChoices;
  }

  const allChoices = await fetchAllChoices();

  return (
    <Exam
      questions={data}
      choices={allChoices || []}
      studentSerial={studentId}
      writtenExam={params.examId}
    />
  );
}
