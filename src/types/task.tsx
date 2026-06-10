export type TaskStatus =
  | "Pending"
  | "In Progress"
  | "Completed"
  | "Rejected";

export type TaskPriority =
  | "Low"
  | "Medium"
  | "High"
  | "Critical";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  createdAt: string;
  dueDate: string;
}
