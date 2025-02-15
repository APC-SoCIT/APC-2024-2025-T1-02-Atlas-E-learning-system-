import Link from "next/link";

export default function StudentCard({
  name,
  score,
  serialNumber,
  subjectCode,
}: {
  name: string;
  score: number;
  serialNumber: number;
  subjectCode: string;
}) {
  return (
    <Link href={`/instructor/subjects/${subjectCode}/exam/${serialNumber}`}>
      <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg cursor-pointer transition transform hover:shadow-lg hover:-translate-y-1 active:scale-95">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500">Score: {score}</p>
      </div>
    </Link>
  );
}
