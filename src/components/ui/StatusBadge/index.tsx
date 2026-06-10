import { TaskStatus } from "@/types/task";
import { Badge } from "../badge";

type Props = {
  status: TaskStatus;
};

const statusStyles: Record<
  TaskStatus,
  string
> = {
  Pending:
    "bg-yellow-100 text-yellow-700 border-yellow-200",

  "In Progress":
    "bg-blue-100 text-blue-700 border-blue-200",

  Completed:
    "bg-green-100 text-green-700 border-green-200",

  Rejected:
    "bg-red-100 text-red-700 border-red-200",
};

export default function StatusBadge({
  status,
}: Props) {
  return (
    <Badge
      className={`rounded-full border px-3 py-3 text-xs ${statusStyles[status]}`}
    >
      {status}
    </Badge>
  );
}