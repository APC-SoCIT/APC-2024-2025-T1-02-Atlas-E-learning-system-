import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import ManageSubjectsPage from "@/app/(routes)/admin/manage-courses/[afosCode]/[moduleId]/page";

test("Page", () => {
  render(
    <ManageSubjectsPage
      params={{
        moduleId: 1,
        afosCode: "BINFN",
      }}
    />
  );
  const button = screen.getByRole("button", { name: "Add" });
  expect(button).toBeDefined();
});
