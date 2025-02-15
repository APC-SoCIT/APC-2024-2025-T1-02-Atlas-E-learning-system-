import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import ManageCoursesPage from "../../app/(routes)/admin/manage-courses/page";

test("Page", () => {
  render(<ManageCoursesPage />);
  const button = screen.getByRole("button", { name: "Add" });
  expect(button).toBeDefined();
});
