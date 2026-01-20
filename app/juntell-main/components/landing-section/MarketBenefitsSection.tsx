import Image from "next/image"

export default async function MarketBenefitsSection () {
  return (
    <div className="w-full overflow-hidden">
      <Image
        src="/images/six-benefit.svg" alt="six-benefit" width={80} height={80} className="w-full"
      />
    </div>
  )
}