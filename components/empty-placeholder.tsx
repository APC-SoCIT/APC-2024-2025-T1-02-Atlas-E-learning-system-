import { Box } from "lucide-react";

export default function EmptyPlaceholder() {
  return (
    <div className="grid place-items-center h-[50rem]">
      <div className="grid place-items-center">
        <Box size={60} color="darkGreen" />
        <h2 className="text-xl font-medium mt-2">No data to show</h2>
      </div>
    </div>
  );
}
