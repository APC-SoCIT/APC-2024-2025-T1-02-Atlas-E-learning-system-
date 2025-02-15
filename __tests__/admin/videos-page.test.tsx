import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import VideosPage from "@/app/(routes)/instructor/subjects/[subjectCode]/videos/page";

test("Page", () => {
  render(
    <VideosPage
      params={{
        subjectCode: "PHYCDN",
      }}
    />
  );
  const button = screen.getByRole("button", { name: "Add" });
  expect(button).toBeDefined();
});
