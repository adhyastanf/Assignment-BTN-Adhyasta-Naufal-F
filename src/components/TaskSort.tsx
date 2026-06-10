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

export default function TaskSort() {
  const router = useRouter();

  const searchParams =
    useSearchParams();

  const handleChange = (
    value: string
  ) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (!value) {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    router.push(
      `/tasks?${params.toString()}`
    );
  };

  return (
    <Select
      defaultValue={
        searchParams.get("sort") ??
        "default"
      }
      onValueChange={handleChange}
    >
      <SelectTrigger className="w-55">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="default">
          Default
        </SelectItem>

        <SelectItem value="dueDate">
          Due Date (Nearest)
        </SelectItem>

        <SelectItem value="createdAt">
          Created Date (Newest)
        </SelectItem>

        <SelectItem value="priority">
          Priority (Highest)
        </SelectItem>
      </SelectContent>
    </Select>
  );
}