import { Link } from '@tanstack/react-router'
import {
  BarChart3,
  TrendingUp,
  Users,
  Shield,
  Zap,
  LineChart,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { Logo } from '@/assets/logo'
import { Button } from '@/components/ui/button'

export function LandingPage() {
  return (
    <div className='min-h-screen bg-background text-foreground'>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <SocialProof />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

function Navbar() {
  return (
    <header className='sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur'>
      <div className='mx-auto flex h-16 max-w-6xl items-center justify-between px-6'>
        <Link to='/' className='flex items-center gap-2'>
          <div className='flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
            <Logo className='size-4' />
          </div>
          <span className='text-lg font-bold'>Nova Analytics</span>
        </Link>

        <nav className='hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex'>
          <a href='#features' className='transition-colors hover:text-foreground'>Features</a>
          <a href='#why-nova' className='transition-colors hover:text-foreground'>Why Nova</a>
        </nav>

        <div className='flex items-center gap-3'>
          <Button variant='ghost' asChild>
            <Link to='/sign-in'>Sign In</Link>
          </Button>
          <Button asChild>
            <Link to='/sign-up'>Get Started Free</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className='relative overflow-hidden px-6 pb-24 pt-20 text-center'>
      {/* Background glow */}
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl' />
      </div>

      <div className='mx-auto max-w-3xl'>
        <div className='mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary'>
          <Zap className='size-3.5' />
          Real-time analytics platform
        </div>

        <h1 className='mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl'>
          Turn Your Data Into{' '}
          <span className='bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent'>
            Decisions
          </span>
        </h1>

        <p className='mx-auto mb-10 max-w-xl text-lg text-muted-foreground'>
          Nova Analytics gives your team a powerful dashboard to track KPIs,
          monitor trends, and act on insights — all in one place.
        </p>

        <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
          <Button size='lg' className='gap-2 px-8' asChild>
            <Link to='/sign-up'>
              Get Started Free <ArrowRight className='size-4' />
            </Link>
          </Button>
          <Button size='lg' variant='outline' asChild>
            <Link to='/sign-in'>Sign In to Dashboard</Link>
          </Button>
        </div>

        <p className='mt-4 text-xs text-muted-foreground'>
          No credit card required · Free forever on starter plan
        </p>
      </div>

      {/* Mock dashboard preview */}
      <div className='mx-auto mt-16 max-w-5xl'>
        <div className='rounded-2xl border border-border bg-card p-6 shadow-2xl shadow-primary/10'>
          <div className='mb-4 flex items-center gap-2'>
            <div className='size-3 rounded-full bg-red-400' />
            <div className='size-3 rounded-full bg-yellow-400' />
            <div className='size-3 rounded-full bg-green-400' />
            <span className='ml-2 text-xs text-muted-foreground'>Nova Analytics · Dashboard</span>
          </div>
          <MockDashboard />
        </div>
      </div>
    </section>
  )
}

function MockDashboard() {
  const bars = [40, 65, 50, 80, 70, 90, 75, 95, 85, 100, 88, 92]
  const line = [30, 45, 40, 60, 55, 75, 65, 80, 72, 88, 82, 95]

  return (
    <div className='grid gap-4'>
      {/* Stats row */}
      <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
        {[
          { label: 'Total Revenue', value: '$48,295', change: '+12.5%', up: true },
          { label: 'Active Users', value: '3,842', change: '+8.2%', up: true },
          { label: 'Conversions', value: '1,294', change: '+4.1%', up: true },
          { label: 'Avg Session', value: '4m 32s', change: '-1.3%', up: false },
        ].map((stat) => (
          <div key={stat.label} className='rounded-lg border border-border bg-background p-3 text-left'>
            <p className='text-xs text-muted-foreground'>{stat.label}</p>
            <p className='mt-1 text-xl font-bold'>{stat.value}</p>
            <p className={`text-xs font-medium ${stat.up ? 'text-green-500' : 'text-red-500'}`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className='grid gap-3 md:grid-cols-2'>
        {/* Bar chart mock */}
        <div className='rounded-lg border border-border bg-background p-4 text-left'>
          <p className='mb-3 text-sm font-semibold'>Monthly Revenue</p>
          <div className='flex h-24 items-end gap-1'>
            {bars.map((h, i) => (
              <div
                key={i}
                className='flex-1 rounded-sm bg-primary/80'
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className='mt-2 flex justify-between text-xs text-muted-foreground'>
            <span>Jan</span><span>Jun</span><span>Dec</span>
          </div>
        </div>

        {/* Line chart mock */}
        <div className='rounded-lg border border-border bg-background p-4 text-left'>
          <p className='mb-3 text-sm font-semibold'>User Growth</p>
          <svg viewBox='0 0 300 96' className='h-24 w-full'>
            <defs>
              <linearGradient id='lineGrad' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor='rgb(99 102 241)' stopOpacity='0.3' />
                <stop offset='100%' stopColor='rgb(99 102 241)' stopOpacity='0' />
              </linearGradient>
            </defs>
            <path
              d={`M ${line.map((v, i) => `${(i / (line.length - 1)) * 300},${96 - v * 0.9}`).join(' L ')}`}
              fill='none'
              stroke='rgb(99 102 241)'
              strokeWidth='2'
              strokeLinecap='round'
            />
            <path
              d={`M 0,96 L ${line.map((v, i) => `${(i / (line.length - 1)) * 300},${96 - v * 0.9}`).join(' L ')} L 300,96 Z`}
              fill='url(#lineGrad)'
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

function Features() {
  const features = [
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      description: 'Monitor your KPIs as they happen. Live data updates with sub-second latency so you\'re always looking at the freshest numbers.',
    },
    {
      icon: LineChart,
      title: 'Trend Analysis',
      description: 'Identify patterns and forecast future performance with built-in trend detection across all your key metrics.',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share dashboards, annotate charts, and align your team around the same data — no more conflicting spreadsheets.',
    },
    {
      icon: Shield,
      title: 'Secure by Default',
      description: 'Enterprise-grade security with role-based access control. Your data stays yours — always encrypted at rest and in transit.',
    },
    {
      icon: TrendingUp,
      title: 'Custom Dashboards',
      description: 'Build views tailored to each team. Drag-and-drop widgets, custom date ranges, and one-click export to PDF or CSV.',
    },
    {
      icon: Zap,
      title: 'Instant Setup',
      description: 'Connect your data sources in minutes — no engineering required. Start getting insights on day one.',
    },
  ]

  return (
    <section id='features' className='px-6 py-24'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-16 text-center'>
          <h2 className='mb-4 text-4xl font-bold'>Everything your team needs</h2>
          <p className='mx-auto max-w-xl text-lg text-muted-foreground'>
            From raw data to executive reports — Nova Analytics covers the full analytics workflow.
          </p>
        </div>

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature) => (
            <div
              key={feature.title}
              className='group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-primary/5'
            >
              <div className='mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground'>
                <feature.icon className='size-6' />
              </div>
              <h3 className='mb-2 text-lg font-semibold'>{feature.title}</h3>
              <p className='text-sm leading-relaxed text-muted-foreground'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SocialProof() {
  const items = [
    'Real-time data updates',
    'Role-based access control',
    'CSV & PDF export',
    'Dark mode support',
    'Mobile responsive',
    'No credit card required',
  ]

  return (
    <section id='why-nova' className='bg-muted/30 px-6 py-24'>
      <div className='mx-auto max-w-6xl'>
        <div className='grid items-center gap-12 md:grid-cols-2'>
          <div>
            <h2 className='mb-4 text-4xl font-bold'>
              Built for teams that move fast
            </h2>
            <p className='mb-8 text-lg text-muted-foreground'>
              Nova Analytics is designed for growth-stage teams who need answers
              immediately — not after two sprints of BI setup.
            </p>
            <ul className='space-y-3'>
              {items.map((item) => (
                <li key={item} className='flex items-center gap-3 text-sm'>
                  <CheckCircle2 className='size-5 shrink-0 text-primary' />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual block */}
          <div className='relative'>
            <div className='rounded-2xl border border-border bg-card p-8 shadow-xl'>
              <p className='mb-6 text-sm font-semibold text-muted-foreground uppercase tracking-wider'>This week at a glance</p>
              {[
                { label: 'Revenue', value: 92, color: 'bg-primary' },
                { label: 'Users', value: 78, color: 'bg-violet-400' },
                { label: 'Retention', value: 85, color: 'bg-cyan-400' },
                { label: 'Conversion', value: 61, color: 'bg-indigo-300' },
              ].map((metric) => (
                <div key={metric.label} className='mb-4'>
                  <div className='mb-1 flex justify-between text-sm'>
                    <span className='font-medium'>{metric.label}</span>
                    <span className='text-muted-foreground'>{metric.value}%</span>
                  </div>
                  <div className='h-2 w-full overflow-hidden rounded-full bg-muted'>
                    <div
                      className={`h-full rounded-full ${metric.color} transition-all`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className='pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-primary/5 blur-2xl' />
          </div>
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className='px-6 py-24 text-center'>
      <div className='mx-auto max-w-2xl'>
        <div className='relative rounded-3xl border border-primary/20 bg-primary/5 px-8 py-16'>
          <div className='pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-b from-primary/10 to-transparent' />
          <h2 className='mb-4 text-4xl font-bold'>
            Ready to get started?
          </h2>
          <p className='mb-8 text-lg text-muted-foreground'>
            Join thousands of teams making smarter decisions with Nova Analytics.
            Free to start, no setup fees.
          </p>
          <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <Button size='lg' className='gap-2 px-10' asChild>
              <Link to='/sign-up'>
                Create Free Account <ArrowRight className='size-4' />
              </Link>
            </Button>
            <Button size='lg' variant='outline' asChild>
              <Link to='/sign-in'>I already have an account</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className='border-t border-border px-6 py-8'>
      <div className='mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row'>
        <div className='flex items-center gap-2'>
          <div className='flex size-6 items-center justify-center rounded bg-primary text-primary-foreground'>
            <Logo className='size-3' />
          </div>
          <span className='font-semibold text-foreground'>Nova Analytics</span>
          <span>· © {new Date().getFullYear()}</span>
        </div>
        <div className='flex gap-6'>
          <Link to='/sign-in' className='transition-colors hover:text-foreground'>Sign In</Link>
          <Link to='/sign-up' className='transition-colors hover:text-foreground'>Sign Up</Link>
        </div>
      </div>
    </footer>
  )
}
