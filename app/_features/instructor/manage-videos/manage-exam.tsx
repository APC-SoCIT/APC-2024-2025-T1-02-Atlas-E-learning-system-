"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { format } from "date-fns";

// Components
import MultipleChoice from "./multiple-choice";
import Essay from "./essay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ManageExam({
  params,
}: {
  params: { subjectCode: string };
}) {
  const [date, setDate] = useState<Date>();
  const [selectedHour, setSelectedHour] = useState("");
  const [duration, setDuration] = useState<number>();

  const hours = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

  function saveExam() {
    console.log(params.subjectCode);
  }

  return (
    <>
      <div>
        <div className="flex gap-4 items-center">
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <div
                className={
                  selectedHour ? "w-48 text-black" : "w-48 text-gray-500"
                }
              >
                <Select value={selectedHour} onValueChange={setSelectedHour}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pick a time" />
                  </SelectTrigger>
                  <SelectContent>
                    {hours.map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Duration"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                />
              </div>
            </div>
            <Button onClick={saveExam}>Save Exam</Button>
          </div>
        </div>

        <div className="mt-4">
          <div className="grid gap-2 mb-4">
            <h2 className="font-semibold text-lg">Multiple Choice</h2>
            <MultipleChoice />
          </div>
          <h2 className="font-semibold text-lg mb-2">Essay</h2>
          <Essay />
        </div>
      </div>
    </>
  );
}
