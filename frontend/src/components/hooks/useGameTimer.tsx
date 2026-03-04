import { useState, useEffect, useRef } from 'react';

interface UseGameTimerProps {
  gameId: number;
  userId: number;
  onTimerEnd?: () => void;
}

export const useGameTimer = ({ gameId, userId, onTimerEnd }: UseGameTimerProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = async () => {
    try {
      const response = await fetch('/api/sessions/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, gameId }),
      });
      const data = await response.json();
      setSessionId(data.sessionId);
      setIsRunning(true);
      setElapsedTime(0);
    } catch (error) {
      console.error('Failed to start timer:', error);
    }
  };

  const stopTimer = async () => {
    if (!sessionId) return;
    
    try {
      await fetch('/api/sessions/stop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });
      setIsRunning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      onTimerEnd?.();
    } catch (error) {
      console.error('Failed to stop timer:', error);
    }
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  return {
    isRunning,
    elapsedTime,
    startTimer,
    stopTimer,
  };
};