import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Logo } from '@/assets/logo'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='container grid h-svh max-w-none items-center justify-center'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:p-8'>
        {/* Back to home */}
        <Link
          to='/'
          className='mb-2 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground self-start'
        >
          <ArrowLeft className='size-4' />
          Back to home
        </Link>

        <div className='mb-4 flex items-center justify-center'>
          <Logo className='me-2' />
          <h1 className='text-xl font-medium'>Nova Analytics</h1>
        </div>
        {children}
      </div>
    </div>
  )
}
