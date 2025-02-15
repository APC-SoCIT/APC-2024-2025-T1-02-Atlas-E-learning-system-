"use client";

import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateModule from "@/app/_features/admin/manage-modules/actions/create-module";

export default function AddModuleButton({
  afosCode,
  moduleLength,
}: {
  afosCode: string;
  moduleLength: number;
}) {
  const [moduleName, setModuleName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setModuleNumber(moduleLength + 1);
  }, [moduleLength]);
  const [moduleNumber, setModuleNumber] = useState(0);

  function handleSubmit() {
    setIsSubmitting(true);

    CreateModule({
      moduleNumber: moduleNumber,
      module: moduleName,
      afosCode: afosCode,
    }).then((response) => {
      setIsSubmitting(false);
      if (response.success) {
        setIsDialogOpen(false);
        toast({
          description: response.message,
        });

        // Reset form
        setModuleNumber(0);
        setModuleName("");
        setIsDialogOpen(false);

        router.refresh();
      } else {
        toast({
          variant: "destructive",
          description: response.message,
        });
      }
    });
  }

  return (
    <Dialog open={isDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus />
          <span>Add</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={() => setIsDialogOpen(false)}
      >
        <DialogHeader>
          <Button
            onClick={() => setIsDialogOpen(false)}
            className="absolute top-0 right-0"
            variant="ghost"
          >
            <X />
          </Button>
          <DialogTitle>Create new module</DialogTitle>
          <DialogDescription>
            Input module details here. Click submit when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              onChange={(e) => setModuleName(e.target.value)}
              value={moduleName}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="number" className="text-right">
              Module number
            </Label>
            <Input
              id="number"
              className="col-span-3"
              onChange={(e) => setModuleNumber(Number(e.target.value))}
              value={moduleNumber}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
