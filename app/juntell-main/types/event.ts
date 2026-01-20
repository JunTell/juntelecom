export type BenefitItem = {
  id: string
  title: string
  description: string
}

export type BenefitCardProps = {
  item: BenefitItem
  badgePrefix?: string
  className?: string
}