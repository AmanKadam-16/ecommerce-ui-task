import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer() {
  const target = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  const Unit = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col items-center">
      <span className="text-xs text-gray-500 font-medium mb-1">{label}</span>
      <span className="text-3xl font-bold text-gray-900">{pad(value)}</span>
    </div>
  );

  const Separator = () => <span className="text-2xl font-bold text-[#4EA674] mt-4">:</span>;

  return (
    <div className="flex items-end gap-3">
      <Unit label="Days" value={timeLeft.days} />
      <Separator />
      <Unit label="Hours" value={timeLeft.hours} />
      <Separator />
      <Unit label="Minutes" value={timeLeft.minutes} />
      <Separator />
      <Unit label="Seconds" value={timeLeft.seconds} />
    </div>
  );
}
