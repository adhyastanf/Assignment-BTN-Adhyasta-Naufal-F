"use client";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TaskFilter() {
  const router = useRouter();

  const searchParams =
    useSearchParams();

  const handleChange = (
    value: string
  ) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (value === "All") {
      params.delete("status");
    } else {
      params.set("status", value);
    }

    router.push(
      `/tasks?${params.toString()}`
    );
  };

  return (
    <Select
      defaultValue={
        searchParams.get("status") ??
        "All"
      }
      onValueChange={handleChange}
    >
      <SelectTrigger className="w-45">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="All">
          All
        </SelectItem>

        <SelectItem value="Pending">
          Pending
        </SelectItem>

        <SelectItem value="In Progress">
          In Progress
        </SelectItem>

        <SelectItem value="Completed">
          Completed
        </SelectItem>

        <SelectItem value="Rejected">
          Rejected
        </SelectItem>
      </SelectContent>
    </Select>
  );
}