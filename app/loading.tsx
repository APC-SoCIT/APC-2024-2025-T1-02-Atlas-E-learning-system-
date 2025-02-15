import type {} from "ldrs";

export default function Loading() {
  return (
    <div className="h-[40rem] grid place-items-center">
      <l-dot-pulse size="43" speed="1.5" color="darkGreen"></l-dot-pulse>
    </div>
  );
}
