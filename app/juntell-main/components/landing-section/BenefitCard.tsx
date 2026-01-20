import { BenefitCardProps } from "@/types/event";

export function BenefitCard({ item, badgePrefix = '혜택', className = '' }: BenefitCardProps) {
  return (
    <div
      className={`bg-white rounded-lg tablet:rounded-xl lg:rounded-2xl p-5 tablet:p-6 lg:p-8 w-full h-auto tablet:h-[380px] flex flex-col ${className}`}
    >
      <p className="px-2.5 py-0.5 tablet:py-1 bg-secondary-100 text-primary text-caption-2 tablet:text-caption-1 lg:text-body-3 font-semibold rounded-full mb-3 tablet:mb-4">
        {badgePrefix}
        {item.id}
      </p>
      <h4 className="text-[16px] leading-[24px] tablet:text-title-4 lg:text-title-3 font-bold text-label-900 mb-2 tablet:mb-3 lg:mb-4">
        {item.title}
      </h4>
      <p className="text-body-5 leading-[20px] tablet:text-body-4 lg:text-body-3 text-label-700 flex-1">
        {item.description}
      </p>
    </div>
  )
}