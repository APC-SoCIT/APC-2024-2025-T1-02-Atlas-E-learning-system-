import { ReadStudentGrades } from "@/app/_features/student/grades/actions/read-grades";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cookies } from "next/headers";

type Score = {
  written_score: number;
  score_id: number;
  score: number;
  student_serial: number;
  subject: string;
  written_exam?: number;
};

export default async function GradesPage() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value?.toString() || "";

  const response = await ReadStudentGrades({ userId });

  // Ensure data.data exists and is properly typed
  const scores: Score[] = (response.data ?? []) as Score[];

  if (scores.length === 0) {
    return <div>No grades available.</div>;
  }

  // Grouping scores by subject
  const groupedScores: Record<string, Score[]> = {};

  scores.forEach((score) => {
    if (!groupedScores[score.subject]) {
      groupedScores[score.subject] = [];
    }
    groupedScores[score.subject].push(score);
  });

  return (
    <div className="p-4 border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Subject</TableHead>
            <TableHead>Written Score</TableHead>
            <TableHead>Practical Score</TableHead>
            <TableHead>Subject Grade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(groupedScores).map(([subject, scores]) => {
            const writtenScore = scores[0].written_score;
            const practicalScore = scores[0].score;

            // Calculate total based on practical score being zero or not
            const totalScore =
              practicalScore > 0
                ? (writtenScore / 100) * 40 + (practicalScore / 100) * 60
                : writtenScore;

            return (
              <TableRow key={subject}>
                <TableCell className="font-bold">{subject}</TableCell>
                <TableCell>{writtenScore}</TableCell>
                <TableCell>{practicalScore}</TableCell>
                <TableCell>{totalScore.toFixed(0)}</TableCell>{" "}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
