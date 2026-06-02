import { useEffect, useRef, useState } from 'react'
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
  Star,
} from 'lucide-react'
import { Logo } from '@/assets/logo'
import { Button } from '@/components/ui/button'

/* ── Scroll-reveal hook ─────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ── Animated counter ───────────────────────────────────────── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const { ref, visible } = useInView()
  useEffect(() => {
    if (!visible) return
    let start = 0
    const step = Math.ceil(to / 60)
    const id = setInterval(() => {
      start += step
      if (start >= to) { setCount(to); clearInterval(id) }
      else setCount(start)
    }, 16)
    return () => clearInterval(id)
  }, [visible, to])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export function LandingPage() {
  return (
    <div className='min-h-screen bg-background text-foreground overflow-x-hidden'>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulse-glow { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:.7;transform:scale(1.05)} }
        @keyframes slide-up { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fade-in { from{opacity:0} to{opacity:1} }
        @keyframes gradient-x { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes bar-grow { from{height:0} to{height:var(--bar-h)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .animate-float { animation: float 4s ease-in-out infinite }
        .animate-float-delay { animation: float 4s ease-in-out 1s infinite }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite }
        .animate-slide-up { animation: slide-up .7s ease both }
        .animate-fade-in { animation: fade-in .7s ease both }
        .animate-gradient-x { background-size:200% 200%; animation: gradient-x 4s ease infinite }
        .delay-100 { animation-delay:.1s }
        .delay-200 { animation-delay:.2s }
        .delay-300 { animation-delay:.3s }
        .delay-400 { animation-delay:.4s }
        .delay-500 { animation-delay:.5s }
        .reveal { opacity:0; transform:translateY(28px); transition:opacity .7s ease,transform .7s ease }
        .reveal.in-view { opacity:1; transform:none }
      `}</style>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <SocialProof />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

/* ── Navbar ─────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-border/50 bg-background/90 backdrop-blur shadow-sm' : 'bg-transparent'}`}>
      <div className='mx-auto flex h-16 max-w-6xl items-center justify-between px-6'>
        <Link to='/' className='flex items-center gap-2 group'>
          <div className='flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-110'>
            <Logo className='size-4' />
          </div>
          <span className='text-lg font-bold'>Nova Analytics</span>
        </Link>
        <nav className='hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex'>
          <a href='#features' className='transition-colors hover:text-foreground'>Features</a>
          <a href='#why-nova' className='transition-colors hover:text-foreground'>Why Nova</a>
        </nav>
        <div className='flex items-center gap-3'>
          <Button variant='ghost' asChild><Link to='/sign-in'>Sign In</Link></Button>
          <Button className='shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow' asChild>
            <Link to='/sign-up'>Get Started Free</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

/* ── Hero ───────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className='relative overflow-hidden px-6 pb-24 pt-16 text-center'>
      {/* Animated blobs */}
      <div className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'>
        <div className='animate-pulse-glow absolute -top-40 left-1/2 h-[600px] w-[700px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl' />
        <div className='animate-pulse-glow absolute top-20 -left-20 h-64 w-64 rounded-full bg-violet-500/10 blur-2xl' style={{animationDelay:'1.5s'}} />
        <div className='animate-pulse-glow absolute top-32 -right-20 h-64 w-64 rounded-full bg-indigo-400/10 blur-2xl' style={{animationDelay:'0.8s'}} />
      </div>

      {/* Floating decorative dots */}
      <div className='pointer-events-none absolute inset-0 -z-10'>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`absolute size-2 rounded-full bg-primary/30 ${i % 2 === 0 ? 'animate-float' : 'animate-float-delay'}`}
            style={{ left: `${10 + i * 16}%`, top: `${15 + (i % 3) * 20}%` }} />
        ))}
      </div>

      <div className='mx-auto max-w-3xl'>
        <div className='animate-slide-up mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary'>
          <Zap className='size-3.5' />
          Real-time analytics platform
        </div>

        <h1 className='animate-slide-up delay-100 mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl'>
          Turn Your Data Into{' '}
          <span className='animate-gradient-x bg-gradient-to-r from-primary via-violet-400 to-indigo-400 bg-clip-text text-transparent'>
            Decisions
          </span>
        </h1>

        <p className='animate-slide-up delay-200 mx-auto mb-10 max-w-xl text-lg text-muted-foreground'>
          Nova Analytics gives your team a powerful dashboard to track KPIs,
          monitor trends, and act on insights — all in one place.
        </p>

        <div className='animate-slide-up delay-300 flex flex-col items-center justify-center gap-4 sm:flex-row'>
          <Button size='lg' className='gap-2 px-8 shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all' asChild>
            <Link to='/sign-up'>Get Started Free <ArrowRight className='size-4' /></Link>
          </Button>
          <Button size='lg' variant='outline' className='hover:scale-105 transition-transform' asChild>
            <Link to='/sign-in'>Sign In to Dashboard</Link>
          </Button>
        </div>

        <p className='animate-fade-in delay-400 mt-4 text-xs text-muted-foreground'>
          No credit card required · Free forever on starter plan
        </p>
      </div>

      {/* Animated mock dashboard */}
      <div className='animate-slide-up delay-500 mx-auto mt-16 max-w-5xl'>
        <div className='relative rounded-2xl border border-border bg-card p-6 shadow-2xl shadow-primary/10'>
          {/* Glowing border effect */}
          <div className='pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 via-violet-500/5 to-indigo-500/5' />
          <div className='mb-4 flex items-center gap-2'>
            <div className='size-3 rounded-full bg-red-400' />
            <div className='size-3 rounded-full bg-yellow-400' />
            <div className='size-3 rounded-full bg-green-400' />
            <span className='ml-2 text-xs text-muted-foreground'>Nova Analytics · Dashboard</span>
            <div className='ml-auto flex items-center gap-1 text-xs text-green-500'>
              <span className='inline-block size-1.5 rounded-full bg-green-500 animate-pulse' />
              Live
            </div>
          </div>
          <AnimatedDashboard />
        </div>
      </div>
    </section>
  )
}

/* ── Animated mock dashboard ────────────────────────────────── */
function AnimatedDashboard() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2000)
    return () => clearInterval(id)
  }, [])

  const bars = [40, 65, 50, 80, 70, 90, 75, 95, 85, 100, 88, 92]
  const liveBar = bars.map((v) => Math.max(20, v + (tick % 3 === 0 ? 5 : tick % 3 === 1 ? -5 : 0)))

  return (
    <div className='grid gap-4'>
      <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
        {[
          { label: 'Total Revenue', value: '$48,295', change: '+12.5%', up: true },
          { label: 'Active Users', value: '3,842', change: '+8.2%', up: true },
          { label: 'Conversions', value: '1,294', change: '+4.1%', up: true },
          { label: 'Avg Session', value: '4m 32s', change: '-1.3%', up: false },
        ].map((stat, i) => (
          <div key={stat.label} className='rounded-lg border border-border bg-background p-3 text-left transition-transform hover:scale-105 hover:shadow-md'
            style={{ animation: `slide-up .5s ease ${i * 0.1}s both` }}>
            <p className='text-xs text-muted-foreground'>{stat.label}</p>
            <p className='mt-1 text-xl font-bold'>{stat.value}</p>
            <p className={`text-xs font-medium ${stat.up ? 'text-green-500' : 'text-red-500'}`}>{stat.change}</p>
          </div>
        ))}
      </div>
      <div className='grid gap-3 md:grid-cols-2'>
        <div className='rounded-lg border border-border bg-background p-4 text-left'>
          <p className='mb-3 text-sm font-semibold'>Monthly Revenue</p>
          <div className='flex h-24 items-end gap-1'>
            {liveBar.map((h, i) => (
              <div key={i} className='flex-1 rounded-sm bg-primary/80 transition-all duration-700'
                style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className='mt-2 flex justify-between text-xs text-muted-foreground'>
            <span>Jan</span><span>Jun</span><span>Dec</span>
          </div>
        </div>
        <div className='rounded-lg border border-border bg-background p-4 text-left'>
          <div className='mb-3 flex items-center justify-between'>
            <p className='text-sm font-semibold'>User Growth</p>
            <span className='text-xs text-green-500 font-medium'>↑ 24%</span>
          </div>
          <svg viewBox='0 0 300 96' className='h-24 w-full'>
            <defs>
              <linearGradient id='lineGrad' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor='rgb(99 102 241)' stopOpacity='0.3' />
                <stop offset='100%' stopColor='rgb(99 102 241)' stopOpacity='0' />
              </linearGradient>
            </defs>
            {[30,45,40,60,55,75,65,80,72,88,82,95].map((v, i, arr) => i === 0 ? null : (
              <line key={i}
                x1={((i-1)/(arr.length-1))*300} y1={96-arr[i-1]*0.9}
                x2={(i/(arr.length-1))*300} y2={96-v*0.9}
                stroke='rgb(99 102 241)' strokeWidth='2' strokeLinecap='round'
              />
            ))}
            <path d={`M 0,96 ${[30,45,40,60,55,75,65,80,72,88,82,95].map((v,i,a)=>`L ${(i/(a.length-1))*300},${96-v*0.9}`).join(' ')} L 300,96 Z`}
              fill='url(#lineGrad)' />
          </svg>
        </div>
      </div>
    </div>
  )
}

/* ── Stats ──────────────────────────────────────────────────── */
function Stats() {
  const { ref, visible } = useInView()
  return (
    <section ref={ref} className='border-y border-border bg-muted/20 px-6 py-12'>
      <div className='mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4'>
        {[
          { value: 10000, suffix: '+', label: 'Active Users' },
          { value: 99, suffix: '%', label: 'Uptime SLA' },
          { value: 500, suffix: 'M+', label: 'Events tracked' },
          { value: 4, suffix: 'ms', label: 'Avg latency' },
        ].map((s, i) => (
          <div key={s.label} className={`text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: `${i * 100}ms` }}>
            <div className='text-3xl font-bold text-primary'>
              {visible && <Counter to={s.value} suffix={s.suffix} />}
            </div>
            <div className='mt-1 text-sm text-muted-foreground'>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Features ───────────────────────────────────────────────── */
function Features() {
  const { ref, visible } = useInView()
  const features = [
    { icon: BarChart3, title: 'Real-Time Analytics', description: 'Monitor your KPIs as they happen. Live data updates with sub-second latency.' },
    { icon: LineChart, title: 'Trend Analysis', description: 'Identify patterns and forecast future performance with built-in trend detection.' },
    { icon: Users, title: 'Team Collaboration', description: 'Share dashboards and align your team around the same data — no more conflicting spreadsheets.' },
    { icon: Shield, title: 'Secure by Default', description: 'Enterprise-grade security with role-based access control. Encrypted at rest and in transit.' },
    { icon: TrendingUp, title: 'Custom Dashboards', description: 'Build views tailored to each team. Custom date ranges and one-click export to CSV.' },
    { icon: Zap, title: 'Instant Setup', description: 'Connect your data sources in minutes — no engineering required. Start getting insights on day one.' },
  ]
  return (
    <section id='features' className='px-6 py-24'>
      <div className='mx-auto max-w-6xl'>
        <div ref={ref} className={`mb-16 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className='mb-4 text-4xl font-bold'>Everything your team needs</h2>
          <p className='mx-auto max-w-xl text-lg text-muted-foreground'>
            From raw data to executive reports — Nova Analytics covers the full analytics workflow.
          </p>
        </div>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature, index }: { feature: { icon: React.ElementType; title: string; description: string }; index: number }) {
  const { ref, visible } = useInView(0.1)
  return (
    <div ref={ref}
      className={`group rounded-2xl border border-border bg-card p-6 cursor-default
        transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/30
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: visible ? `${index * 80}ms` : '0ms' }}>
      <div className='mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-3'>
        <feature.icon className='size-6' />
      </div>
      <h3 className='mb-2 text-lg font-semibold'>{feature.title}</h3>
      <p className='text-sm leading-relaxed text-muted-foreground'>{feature.description}</p>
    </div>
  )
}

/* ── Social Proof ───────────────────────────────────────────── */
function SocialProof() {
  const { ref, visible } = useInView()
  const items = ['Real-time data updates', 'Role-based access control', 'CSV & PDF export', 'Dark mode support', 'Mobile responsive', 'No credit card required']
  return (
    <section id='why-nova' className='bg-muted/30 px-6 py-24'>
      <div className='mx-auto max-w-6xl'>
        <div ref={ref} className='grid items-center gap-12 md:grid-cols-2'>
          <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className='mb-4 text-4xl font-bold'>Built for teams that move fast</h2>
            <p className='mb-8 text-lg text-muted-foreground'>
              Nova Analytics is designed for growth-stage teams who need answers immediately — not after two sprints of BI setup.
            </p>
            <ul className='space-y-3'>
              {items.map((item, i) => (
                <li key={item} className={`flex items-center gap-3 text-sm transition-all duration-500 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: `${200 + i * 80}ms` }}>
                  <CheckCircle2 className='size-5 shrink-0 text-primary' />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={`relative transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className='rounded-2xl border border-border bg-card p-8 shadow-xl'>
              <div className='mb-2 flex items-center justify-between'>
                <p className='text-sm font-semibold text-muted-foreground uppercase tracking-wider'>This week at a glance</p>
                <div className='flex items-center gap-1 text-xs text-green-500'>
                  <span className='inline-block size-1.5 rounded-full bg-green-500 animate-pulse' /> Live
                </div>
              </div>
              <div className='mb-6 flex gap-1'>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className='size-4 fill-yellow-400 text-yellow-400' />
                ))}
                <span className='ml-2 text-xs text-muted-foreground'>5.0 avg satisfaction</span>
              </div>
              {[
                { label: 'Revenue', value: 92, color: 'bg-primary' },
                { label: 'Users', value: 78, color: 'bg-violet-400' },
                { label: 'Retention', value: 85, color: 'bg-cyan-400' },
                { label: 'Conversion', value: 61, color: 'bg-indigo-300' },
              ].map((metric, i) => (
                <div key={metric.label} className='mb-4'>
                  <div className='mb-1 flex justify-between text-sm'>
                    <span className='font-medium'>{metric.label}</span>
                    <span className='text-muted-foreground'>{metric.value}%</span>
                  </div>
                  <div className='h-2 w-full overflow-hidden rounded-full bg-muted'>
                    <div className={`h-full rounded-full ${metric.color} transition-all duration-1000`}
                      style={{ width: visible ? `${metric.value}%` : '0%', transitionDelay: `${400 + i * 150}ms` }} />
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

/* ── CTA ────────────────────────────────────────────────────── */
function CTA() {
  const { ref, visible } = useInView()
  return (
    <section className='px-6 py-24 text-center'>
      <div ref={ref} className={`mx-auto max-w-2xl transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className='relative rounded-3xl border border-primary/20 bg-primary/5 px-8 py-16 overflow-hidden'>
          <div className='pointer-events-none absolute inset-0 animate-gradient-x bg-gradient-to-br from-primary/10 via-violet-500/5 to-indigo-500/10' />
          {/* Decorative circles */}
          <div className='animate-float pointer-events-none absolute -top-8 -right-8 size-32 rounded-full border border-primary/10' />
          <div className='animate-float-delay pointer-events-none absolute -bottom-8 -left-8 size-24 rounded-full border border-violet-500/10' />
          <h2 className='relative mb-4 text-4xl font-bold'>Ready to get started?</h2>
          <p className='relative mb-8 text-lg text-muted-foreground'>
            Join thousands of teams making smarter decisions with Nova Analytics. Free to start, no setup fees.
          </p>
          <div className='relative flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <Button size='lg' className='gap-2 px-10 shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all' asChild>
              <Link to='/sign-up'>Create Free Account <ArrowRight className='size-4' /></Link>
            </Button>
            <Button size='lg' variant='outline' className='hover:scale-105 transition-transform' asChild>
              <Link to='/sign-in'>I already have an account</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ─────────────────────────────────────────────────── */
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
