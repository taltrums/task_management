"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlayIcon, PauseIcon, RefreshCwIcon } from "lucide-react";

interface PomodoroTimerProps {
  taskId: number;
  onTimerComplete: (taskId: number) => void;
}

export default function PomodoroTimer({ taskId, onTimerComplete }: PomodoroTimerProps) {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      onTimerComplete(taskId);
    }

    return () => clearInterval(interval);
  }, [isActive, time, taskId, onTimerComplete]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm font-medium w-12">{formatTime(time)}</div>
      <Button size="icon" variant="ghost" onClick={toggleTimer}>
        {isActive ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
      </Button>
      <Button size="icon" variant="ghost" onClick={resetTimer}>
        <RefreshCwIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
