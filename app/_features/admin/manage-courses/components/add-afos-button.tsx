"use client";

import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Components
import CreateAFOS from "@/app/_features/admin/manage-courses/actions/create-afos";
import { ChevronsUpDown, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type AFOSLevel = "Basic" | "Advanced";

export default function AddAFOSButton() {
  const { toast } = useToast();
  const [afosLevel, setAfosLevel] = useState<AFOSLevel>("Basic");
  const [afosName, setAfosName] = useState("");
  const [afosCode, setAfosCode] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  function handleSubmit() {
    setIsSubmitting(true);

    CreateAFOS({
      afosCode: afosCode,
      afos: afosName,
      level: afosLevel,
    }).then((response) => {
      setIsSubmitting(false);
      if (response.success) {
        setIsDialogOpen(false);
        toast({
          description: response.message,
        });

        // Reset form
        setAfosLevel("Basic");
        setAfosName("");
        setAfosCode("");
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
          <DialogTitle>Create new AFOS</DialogTitle>
          <DialogDescription>
            Input AFOS details here. Click submit when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="level" className="text-right">
              Level
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex justify-between items-center col-span-3"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {afosLevel}
                  <ChevronsUpDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[17.3rem]"
                onCloseAutoFocus={() => setIsDropdownOpen(false)}
                onInteractOutside={() => setIsDropdownOpen(false)}
              >
                <DropdownMenuItem
                  onClick={() => {
                    setAfosLevel("Basic");
                    setIsDropdownOpen(false);
                  }}
                >
                  Basic
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setAfosLevel("Advanced");
                    setIsDropdownOpen(false);
                  }}
                >
                  Advanced
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              onChange={(e) => setAfosName(e.target.value)}
              value={afosName}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code" className="text-right">
              Code
            </Label>
            <Input
              id="code"
              className="col-span-3"
              maxLength={5}
              onChange={(e) => setAfosCode(e.target.value.toUpperCase())}
              value={afosCode}
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
