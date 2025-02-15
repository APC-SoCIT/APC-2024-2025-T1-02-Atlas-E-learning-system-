import Link from "next/link";

interface SubjectCardProps {
  subjectName: string;
  subjectCode: string;
}

export default function SubjectCard({
  subjectName,
  subjectCode,
}: SubjectCardProps) {
  return (
    <Link
      href={`/instructor/subjects/${subjectCode}/videos`}
      className="inline-block h-full w-[400px]"
    >
      <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col h-full transition transform hover:shadow-lg hover:-translate-y-1 active:scale-95">
        <div className="mb-2 h-40 w-full bg-darkGreen-400 rounded" />
        <div className="flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-900 leading-tight mb-2">
            {subjectName}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{subjectCode}</p>
        </div>
      </div>
    </Link>
  );
}
