import { useState, useEffect } from "react";

export default function Timezone() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const currentTime = new Date().toLocaleTimeString(['en-GB'], { 
        timeZone: 'America/Los_Angeles', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      setTime(currentTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return <span>Los Angeles {time}</span>;
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
