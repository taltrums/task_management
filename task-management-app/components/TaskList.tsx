"use client";

import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import AddTaskForm from "./AddTaskForm";
import { Task } from "@/lib/types";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  return (
    <div>
      <AddTaskForm onTaskAdded={handleTaskAdded} />
      <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onTaskUpdate={handleTaskUpdate} />
        ))}
      </ul>
    </div>
  );
}
