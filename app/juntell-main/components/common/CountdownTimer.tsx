"use client";

import { useEffect, useState } from "react";

type CountdownTimerProps = {
  /** 마감 시간 (Date, timestamp, 또는 파싱 가능한 문자열) */
  endTime: Date | string | number;
  /** 마감 이후에 보여줄 텍스트 */
  endedText?: string;
};

type TimeLeft = {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(endTime: Date | string | number): TimeLeft {
  const end = new Date(endTime).getTime();
  const now = Date.now();
  const diff = Math.max(end - now, 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { total: diff, days, hours, minutes, seconds };
}

const pad = (value: number) => String(value).padStart(2, "0");

export const CountdownTimer = ({
  endTime,
  endedText = "할인이 종료되었습니다.",
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(endTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(endTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const isEnded = timeLeft.total <= 0;

  // 1시간 이내 / 10분 이내에 따라 모션과 색상 변경
  const isUnderOneHour = timeLeft.total <= 1000 * 60 * 60;
  const isUnderTenMinutes = timeLeft.total <= 1000 * 60 * 10;

  const numberClasses = [
    "font-semibold",
    "tracking-[0.1em]",
    "tabular-nums",
    "transition-all",
    "duration-300",
  ];

  if (isUnderOneHour) {
    numberClasses.push("text-red-400");
  } else {
    numberClasses.push("text-white");
  }

  if (isUnderTenMinutes && !isEnded) {
    // 토스처럼 긴장감을 주기 위한 살짝 커졌다 줄어드는 모션
    numberClasses.push("animate-pulse");
  }

  return (
    <div className="w-full flex flex-col items-center justify-center py-6 bg-black text-white">
      {/* 타이틀 */}
      <div className="flex items-center gap-2 mb-3 text-body-1 md:text-lg">
        <span role="img" aria-label="alarm">
          ⏰
        </span>
        <span className="font-medium">할인 종료까지 남은 시간</span>
      </div>

      {/* 타이머 / 종료 텍스트 */}
      {isEnded ? (
        <div className="text-title-4 md:text-title-3 font-semibold text-red-400">
          {endedText}
        </div>
      ) : (
        <div className={numberClasses.join(" ")}>
          {/* 일(day)이 있으면 앞에 붙여서 표시 */}
          {timeLeft.days > 0 && (
            <span className="text-title-1 px-1 md:px-2">
              {pad(timeLeft.days)}:
            </span>
          )}
          <span className="text-title-1">{pad(timeLeft.hours)}</span>
          <span className="text-title-1 px-1 md:px-2">:</span>
          <span className="text-title-1">{pad(timeLeft.minutes)}</span>
          <span className="text-title-1 px-1 md:px-2">:</span>
          <span className="text-title-1">{pad(timeLeft.seconds)}</span>
        </div>
      )}
    </div>
  );
};