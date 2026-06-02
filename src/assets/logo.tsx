import { type SVGProps } from 'react'
import { cn } from '@/lib/utils'

export function Logo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      id='nova-analytics-logo'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      height='24'
      width='24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.75'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={cn('size-6', className)}
      {...props}
    >
      <title>Nova Analytics</title>
      {/* Rising bars — analytics */}
      <rect x='2' y='14' width='4' height='7' rx='0.5' fill='currentColor' stroke='none' />
      <rect x='8' y='9' width='4' height='12' rx='0.5' fill='currentColor' stroke='none' />
      <rect x='14' y='5' width='4' height='16' rx='0.5' fill='currentColor' stroke='none' />
      {/* Star / nova spark at top-right */}
      <path d='M21 2l-1 2.5L17.5 5l2.5 0.5L21 8l0.5-2.5L24 5l-2.5-0.5z' fill='currentColor' stroke='none' transform='scale(0.75) translate(5, 0)' />
    </svg>
  )
}
