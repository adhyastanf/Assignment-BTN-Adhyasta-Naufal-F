'use client';

import { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldError, FieldGroup, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from './ui/input-group';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { CalendarIcon, Send } from 'lucide-react';
import { InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { taskSchema } from '@/utils/schema';
import { Button } from './ui/button';
import { toast } from 'sonner';

type TaskFormData = z.infer<typeof taskSchema>;

export default function TaskForm() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [month, setMonth] = useState<Date | undefined>();
  const [value, setValue] = useState('');

  const { handleSubmit, control, reset } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),

    defaultValues: {
      title: '',
      description: '',
      assignee: '',
      priority: 'Low',
      dueDate: '',
    },
  });

  const onSubmit = (data: TaskFormData) => {
    toast('Task Has Been Successfully Created', {
      description: (
        <pre className='mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground'>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: 'bottom-right',
      classNames: {
        content: 'flex flex-col gap-2',
      },
      style: {
        '--border-radius': 'calc(var(--radius)  + 4px)',
      } as React.CSSProperties,
    });

    reset();
  };

  return (
    <div>
      <form id='form-task' onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <FieldGroup>
          <Controller
            name='title'
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='form-title'>Title</FieldLabel>
                <Input {...field} id='form-title' aria-invalid={fieldState.invalid} placeholder='Enter task title' autoComplete='off' />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name='description'
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='form-description'>Description</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea {...field} id='form-description' placeholder='Enter task description' rows={6} className='min-h-24 resize-none' aria-invalid={fieldState.invalid} maxLength={100} />
                  <InputGroupAddon align='block-end'>
                    <InputGroupText className='tabular-nums'>{field.value.length}/100 characters</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name='assignee'
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='form-assignee'>Assignee</FieldLabel>
                <Input {...field} id='form-assignee' aria-invalid={fieldState.invalid} placeholder='Enter assignee name' autoComplete='off' />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name='priority'
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='form-priority'>Priority</FieldLabel>
                <Select {...field} value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className='w-45' id='form-priority' aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder='Select Priority' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='Low'>Low</SelectItem>
                      <SelectItem value='Medium'>Medium</SelectItem>
                      <SelectItem value='High'>High</SelectItem>
                      <SelectItem value='Critical'>Critical</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name='dueDate'
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='form-dueDate'>Due Date</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id='form-dueDate'
                    value={value}
                    placeholder='2026-12-31'
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      setValue(e.target.value);
                      if (isValidDate(date)) {
                        setDate(date);
                        setMonth(date);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        setOpen(true);
                      }
                    }}
                  />
                  <InputGroupAddon align='inline-end'>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <InputGroupButton id='date-picker' variant='ghost' size='icon-xs' aria-label='Select date'>
                          <CalendarIcon />
                          <span className='sr-only'>Select date</span>
                        </InputGroupButton>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto overflow-hidden p-0' align='end' alignOffset={-8} sideOffset={10}>
                        <Calendar
                          mode='single'
                          selected={date}
                          month={month}
                          onMonthChange={setMonth}
                          onSelect={(date) => {
                            const formattedDate = formatDate(date);
                            setDate(date);
                            setValue(formattedDate);

                            field.onChange(formattedDate);

                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        <Button type='submit' form='form-task' className='w-full py-6'>
          <Send />
          Create Task
        </Button>
      </form>
    </div>
  );
}

function formatDate(date: Date | undefined) {
  if (!date) {
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}
