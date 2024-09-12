"use client";

import { Task } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import PomodoroTimer from "./PomodoroTimer";

interface TaskItemProps {
  task: Task;
  onTaskUpdate: (updatedTask: Task) => void;
}

export default function TaskItem({ task, onTaskUpdate }: TaskItemProps) {
  const [isCompleted, setIsCompleted] = useState(task.completed);

  const handleCheckboxChange = async (checked: boolean) => {
    setIsCompleted(checked);
    const updatedTask = { ...task, completed: checked };
    
    try {
      const response = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      onTaskUpdate(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      setIsCompleted(!checked);
    }
  };

  const handleTimerComplete = (taskId: number) => {
    console.log(`Timer completed for task ${taskId}`);
    // You can add additional logic here, such as marking the task as completed
  };

  return (
    <li className="flex items-center justify-between py-3 border-b last:border-b-0">
      <div className="flex items-center space-x-3 flex-grow">
        <Checkbox 
          id={`task-${task.id}`} 
          checked={isCompleted}
          onCheckedChange={handleCheckboxChange}
        />
        <label 
          htmlFor={`task-${task.id}`} 
          className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${isCompleted ? 'line-through text-gray-500' : ''}`}
        >
          {task.title}
        </label>
      </div>
      <div className="flex-shrink-0 ml-4">
        <PomodoroTimer taskId={task.id} onTimerComplete={handleTimerComplete} />
      </div>
    </li>
  );
}
