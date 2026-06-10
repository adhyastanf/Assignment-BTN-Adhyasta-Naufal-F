import { Task, TaskPriority } from "@/types/task";

const priorityOrder: Record<TaskPriority, number> = {
  Critical: 4,
  High: 3,
  Medium: 2,
  Low: 1,
};

export const filterTasks = (
  tasks: Task[],
  search: string,
  status: string
): Task[] => {
  return tasks.filter((task) => {
    const keyword = search.trim().toLowerCase();

    const matchesSearch =
      !keyword ||
      task.title.toLowerCase().includes(keyword) ||
      task.assignee.toLowerCase().includes(keyword);

    const matchesStatus =
      status === "All" ||
      !status ||
      task.status === status;

    return matchesSearch && matchesStatus;
  });
};

export const sortTasks = (
  tasks: Task[],
  sort: string
): Task[] => {
  const sortedTasks = [...tasks];

  switch (sort) {
    case "dueDate":
      return sortedTasks.sort(
        (a, b) =>
          new Date(a.dueDate).getTime() -
          new Date(b.dueDate).getTime()
      );

    case "createdAt":
      return sortedTasks.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );

    case "priority":
      return sortedTasks.sort(
        (a, b) =>
          priorityOrder[b.priority] -
          priorityOrder[a.priority]
      );

    default:
      return sortedTasks;
  }
};

export const getTaskSummary = (tasks: Task[]) => {
  return {
    total: tasks.length,
    pending: tasks.filter(
      (task) => task.status === "Pending"
    ).length,
    inProgress: tasks.filter(
      (task) => task.status === "In Progress"
    ).length,
    completed: tasks.filter(
      (task) => task.status === "Completed"
    ).length,
    rejected: tasks.filter(
      (task) => task.status === "Rejected"
    ).length,
  };
};