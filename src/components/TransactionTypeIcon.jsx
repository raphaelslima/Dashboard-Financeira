import { cva } from 'class-variance-authority'
import { CircleIcon } from 'lucide-react'

const variants = cva(
  'flex w-fit items-center gap-2 rounded-full bg-muted px-2 py-[2px] text-xs font-bold',
  {
    variants: {
      variant: {
        earning: 'text-primary-green fill-primary-green',
        expense: 'text-primary-red fill-primary-red',
        investment: 'text-primary-blue fill-primary-blue',
      },
    },
  }
)

const getText = (variant) => {
  if (variant == 'earning') return 'Ganho'
  if (variant == 'expense') return 'Gasto'
  if (variant == 'investment') return 'Investimento'
  return ''
}

const TransactionTypeIcon = ({ variant }) => {
  return (
    <div className={variants({ variant })}>
      <CircleIcon className="fill-inherit" size={10} /> {getText(variant)}
    </div>
  )
}

export default TransactionTypeIcon
