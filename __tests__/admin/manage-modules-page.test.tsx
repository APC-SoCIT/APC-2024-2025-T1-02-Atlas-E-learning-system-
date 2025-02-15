import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import ManageModulesPage from "@/app/(routes)/admin/manage-courses/[afosCode]/page";

test("Page", () => {
  render(
    <ManageModulesPage
      params={{
        afosCode: "BINFN",
      }}
    />
  );
  const button = screen.getByRole("button", { name: "Add" });
  expect(button).toBeDefined();
});
