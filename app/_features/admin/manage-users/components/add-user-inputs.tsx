"use client";

import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import CreateStudent from "@/app/_features/admin/manage-users/actions/create-student";
import { ReadUserByEmail } from "@/app/_features/admin/manage-users/actions/read-user";
import { useState } from "react";

// Components
import { Label } from "@/components/ui/label";
import { ChevronsUpDown } from "lucide-react";
import CreateUser from "@/app/_features/admin/manage-users/actions/create-user";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type UserTypes = "Admin" | "Instructor" | "Student";

export default function AddUserInputs({
  setIsDialogOpen,
}: {
  setIsDialogOpen: (value: boolean) => void;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [role, setRole] = useState<UserTypes>("Student");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleInitial, setMiddleInitial] = useState("");
  const [suffix, setSuffix] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [afos, setAFOS] = useState("");
  const [serialNumber, setSerialNumber] = useState<string>();

  async function handleSubmit() {
    setIsSubmitting(true);

    CreateUser({
      lastName: lastName,
      firstName: firstName,
      middleInitial: middleInitial,
      suffix: suffix,
      email: email,
      password: password,
      role: role,
    }).then((response) => {
      setIsSubmitting(false);
      if (response.success) {
        setIsDialogOpen(false);
        toast({
          description: response.message,
        });

        // Reset form
        setLastName("");
        setFirstName("");
        setMiddleInitial("");
        setSuffix("");
        setPassword("");
        setIsDialogOpen(false);

        if (role !== "Student") {
          setEmail("");
        }

        ReadUserByEmail({ email: email }).then((response) => {
          if (response.success) {
            if (response.data && response.data.length > 0) {
              if (serialNumber) {
                CreateStudent({
                  serialNumber: serialNumber,
                  userId: response.data[0].user_id,
                  afos: afos,
                }).then((response) => {
                  setIsSubmitting(false);
                  if (response.success) {
                    setIsDialogOpen(false);
                    toast({
                      description: response.message,
                    });

                    // Reset form
                    setRole("Student");
                    setAFOS("");
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
            }
          }
          router.refresh();
        });
      } else {
        toast({
          variant: "destructive",
          description: response.message,
        });
      }
    });
  }

  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="flex gap-4">
          <Label htmlFor="level" className="w-2/5">
            Level
          </Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full flex justify-between items-center col-span-3"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {role}
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
                  setRole("Student");
                  setIsDropdownOpen(false);
                }}
              >
                Student
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setRole("Admin");
                  setIsDropdownOpen(false);
                }}
              >
                Admin
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setRole("Instructor");
                  setIsDropdownOpen(false);
                }}
              >
                Instructor
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {role == "Student" && (
          <div className="flex gap-4">
            <Label htmlFor="serial-number" className="w-2/5">
              Serial number<span className="text-red-400">*</span>
            </Label>
            <Input
              id="serial-number"
              className="col-span-3"
              onChange={(e) => setSerialNumber(e.target.value)}
              value={serialNumber}
            />
          </div>
        )}
        <div className="flex gap-4">
          <Label htmlFor="last-name" className="w-2/5">
            Last name<span className="text-red-400">*</span>
          </Label>
          <Input
            id="last-name"
            className="col-span-3"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>
        <div className="flex gap-4">
          <Label htmlFor="first-name" className="w-2/5">
            First name<span className="text-red-400">*</span>
          </Label>
          <Input
            id="first-name"
            className="col-span-3"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </div>
        <div className="flex gap-4">
          <Label htmlFor="middle-initial" className="w-2/5">
            Middle initial
          </Label>
          <Input
            id="middle-initial"
            className="col-span-3"
            maxLength={5}
            onChange={(e) => setMiddleInitial(e.target.value.toUpperCase())}
            value={middleInitial}
          />
        </div>
        <div className="flex gap-4">
          <Label htmlFor="suffix" className="w-2/5">
            Suffix
          </Label>
          <Input
            id="suffix"
            className="col-span-3"
            onChange={(e) => setSuffix(e.target.value)}
            value={suffix}
          />
        </div>
        <div className="flex gap-4">
          <Label htmlFor="email" className="w-2/5">
            Email<span className="text-red-400">*</span>
          </Label>
          <Input
            id="email"
            className="col-span-3"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="flex gap-4">
          <Label htmlFor="password" className="w-2/5">
            Password<span className="text-red-400">*</span>
          </Label>
          <Input
            id="password"
            className="col-span-3"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        {role == "Student" && (
          <div className="flex gap-4">
            <Label htmlFor="afos" className="w-2/5">
              AFOS<span className="text-red-400">*</span>
            </Label>
            <Input
              id="afos"
              className="col-span-3"
              onChange={(e) => setAFOS(e.target.value.toUpperCase())}
              value={afos}
            />
          </div>
        )}
      </div>
      <DialogFooter>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          Submit
        </Button>
      </DialogFooter>
    </>
  );
}
