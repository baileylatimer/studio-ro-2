import { useState, useEffect } from "react";

interface TimezoneProps {
  timezone?: string;
  showLabel?: boolean;
}

export default function Timezone({ timezone = 'America/Los_Angeles', showLabel = true }: TimezoneProps) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const currentTime = new Date().toLocaleTimeString(['en-GB'], { 
        timeZone: timezone, 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      setTime(currentTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [timezone]);

  const label = showLabel ? (timezone === 'America/Los_Angeles' ? 'Los Angeles ' : '') : '';
  return <span>{label}{time}</span>;
}

export function TimezoneValencia() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const currentTime = new Date().toLocaleTimeString(['en-GB'], { 
        timeZone: 'Europe/Madrid', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      setTime(currentTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return <span className="ml-4">Valencia {time}</span>;
}
