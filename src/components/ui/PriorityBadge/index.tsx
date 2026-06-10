import { TaskPriority } from "@/types/task";
import { Badge } from "../badge";

type Props = {
  priority: TaskPriority;
};

const priorityStyles: Record<
  TaskPriority,
  string
> = {
  Low: "bg-gray-100 text-gray-700 border-gray-200",

  Medium:
    "bg-sky-100 text-sky-700 border-sky-200",

  High:
    "bg-orange-100 text-orange-700 border-orange-200",

  Critical:
    "bg-red-100 text-red-700 border-red-200",
};

export default function PriorityBadge({
  priority,
}: Props) {
  return (
    <Badge
      className={`rounded-full border px-3 py-3 text-xs ${priorityStyles[priority]}`}
    >
      {priority}
    </Badge>
  );
}