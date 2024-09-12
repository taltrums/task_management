import { NextResponse } from 'next/server';
import { Task } from '@/lib/types';

let tasks: Task[] = [
  { id: 1, title: "Learn Next.js", completed: false },
  { id: 2, title: "Build a task management app", completed: false },
];

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const { title } = await request.json();
  const newTask: Task = {
    id: tasks.length + 1,
    title,
    completed: false,
  };
  tasks.push(newTask);
  return NextResponse.json(newTask, { status: 201 });
}

export async function PUT(request: Request) {
  const { id, completed } = await request.json();
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = completed;
    return NextResponse.json(task);
  }
  return NextResponse.json({ error: 'Task not found' }, { status: 404 });
}
