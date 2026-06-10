import z from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, 'Title wajib diisi'),

  description: z.string(),

  assignee: z.string().min(1, 'Assignee wajib diisi'),

  priority: z.enum(['Low', 'Medium', 'High', 'Critical']),

  dueDate: z.string().min(1, 'Due Date wajib diisi'),
});
