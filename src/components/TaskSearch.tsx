'use client';

import { Search } from 'lucide-react';

import { useRouter, useSearchParams } from 'next/navigation';

import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';
import { useRef } from 'react';

export default function TaskSearch() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set('search', value);
      } else {
        params.delete('search');
      }

      router.replace(`/tasks?${params.toString()}`);
    }, 500);
  };

  return (
    <InputGroup>
      <InputGroupInput placeholder='Search Title or Assignee...' defaultValue={searchParams.get('search') ?? ''} onChange={handleChange} />
      <InputGroupAddon align='inline-start'>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
}
