"use client";

import { useState } from "react";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MCQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface MultipleChoiceProps {
  questions: MCQuestion[];
  setQuestions: (questions: MCQuestion[]) => void;
}

export default function MultipleChoice({
  questions,
  setQuestions,
}: MultipleChoiceProps) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  function handleOptionChange(index: number, value: string) {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  }

  function addQuestion() {
    if (!question || !correctAnswer || options.some((opt) => opt === "")) {
      alert("Please fill all fields!");
      return;
    }

    setQuestions([...questions, { question, options, correctAnswer }]);

    // Reset form
    setQuestion("");
    setOptions(["", "", ""]);
    setCorrectAnswer("");
  }

  return (
    <>
      {questions.length > 0 && (
        <div className="mb-2">
          {questions.map((q, index) => (
            <div key={index} className="p-2">
              <p>
                {index + 1}
                {". "}
                {q.question}
              </p>
              {q.options.map((opt, i) => (
                <p key={i} className="ml-4">
                  {String.fromCharCode(97 + i)}. {opt}
                </p>
              ))}
              <p className="text-green-600">
                Correct Answer: {q.correctAnswer}
              </p>
            </div>
          ))}
        </div>
      )}
      <div className="border p-4 rounded">
        <div className="flex gap-4 items-center">
          <Label htmlFor="question">Question:</Label>
          <Input
            id="question"
            name="question"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div className="ml-14 w-1/2 mt-4 grid gap-4">
          <div className="flex gap-4 items-center">
            <Label htmlFor="a">a:</Label>
            <Input
              id="a"
              value={options[0]}
              onChange={(e) => handleOptionChange(0, e.target.value)}
              name="a"
              type="text"
              required
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label htmlFor="b">b:</Label>
            <Input
              id="b"
              value={options[1]}
              onChange={(e) => handleOptionChange(1, e.target.value)}
              name="b"
              type="text"
              required
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label htmlFor="c">c:</Label>
            <Input
              id="c"
              value={options[2]}
              onChange={(e) => handleOptionChange(2, e.target.value)}
              name="c"
              type="text"
              required
            />
          </div>
          <div className="flex gap-2 items-center">
            <Label htmlFor="correct-answer" className="w-36">
              Correct Answer:
            </Label>
            <Input
              id="correct-answer"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              name="correct-answer"
              type="text"
              required
            />
          </div>
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
