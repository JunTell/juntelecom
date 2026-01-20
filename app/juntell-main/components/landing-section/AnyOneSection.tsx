import Image from "next/image";

export function AnyOneSection () {
  return (
    <div className="w-full overflow-hidden">
      <Image
        src="/images/event-anyone.svg" alt="event_image" width={80} height={80} className="w-full"
      />
    </div>
  )
}