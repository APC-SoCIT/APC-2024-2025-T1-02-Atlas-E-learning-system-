import { useState } from "react";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EssayQuestion {
  question: string;
}

interface EssayProps {
  questions: EssayQuestion[];
  setQuestions: (questions: EssayQuestion[]) => void;
}

export default function Essay({ questions, setQuestions }: EssayProps) {
  const [question, setQuestion] = useState("");

  function addQuestion() {
    if (!question) {
      alert("Please enter a question!");
      return;
    }

    setQuestions([...questions, { question }]);
    setQuestion("");
  }

  return (
    <>
      <div className="mb-2">
        {questions.map((q, index) => (
          <div key={index} className="p-2 mt-2">
            <p>
              {index + 1}
              {". "}
              {q.question}
            </p>
          </div>
        ))}
      </div>
      <div className="border p-4 rounded">
        <div className="flex gap-4 items-center">
          <Label htmlFor="question">Question:</Label>
          <Input
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            name="question"
            type="text"
            required
          />
        </div>
        <div className="flex justify-end gap-4 items-center mt-4">
          <Button variant="outline" onClick={addQuestion}>
            Add question
          </Button>
        </div>
      </div>
    </>
  );
}
