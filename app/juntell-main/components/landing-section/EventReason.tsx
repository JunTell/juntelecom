import Image from "next/image";

export function EventReason() {
  return (
    <div className="w-full overflow-hidden">
      <Image
        src="/images/event-reason.svg" alt="event-reason" width={80} height={80} className="w-full"
      />
    </div>
  );
}