'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  ArrowUp,
  CalendarCheck,
  Globe,
  Layout,
  Play,
  Plus,
  Signature,
  Sparkles,
  Target,
} from 'lucide-react'

const MESCHAC_AVATAR = 'https://avatars.githubusercontent.com/u/47919550?v=4'
const BERNARD_AVATAR = 'https://avatars.githubusercontent.com/u/31113941?v=4'
const THEO_AVATAR = 'https://avatars.githubusercontent.com/u/68236786?v=4'
const GLODIE_AVATAR = 'https://avatars.githubusercontent.com/u/99137927?v=4'

export type Customer = {
  id: number | string
  date: string
  status: 'Paid' | 'Cancelled' | 'Ref'
  statusVariant: 'success' | 'danger' | 'warning'
  name: string
  avatar: string
  revenue: string
}

export type CustomersTableCardProps = {
  title?: string
  subtitle?: string
  className?: string
  customers?: Customer[]
}

const DEFAULT_CUSTOMERS: Customer[] = [
  {
    id: 1,
    date: '10/31/2023',
    status: 'Paid',
    statusVariant: 'success',
    name: 'Bernard Ng',
    avatar: BERNARD_AVATAR,
    revenue: '$43.99',
  },
  {
    id: 2,
    date: '10/21/2023',
    status: 'Ref',
    statusVariant: 'warning',
    name: 'Meschac Irung',
    avatar: MESCHAC_AVATAR,
    revenue: '$19.99',
  },
  {
    id: 3,
    date: '10/15/2023',
    status: 'Paid',
    statusVariant: 'success',
    name: 'Glodie Ng',
    avatar: GLODIE_AVATAR,
    revenue: '$99.99',
  },
  {
    id: 4,
    date: '10/12/2023',
    status: 'Cancelled',
    statusVariant: 'danger',
    name: 'Theo Ng',
    avatar: THEO_AVATAR,
    revenue: '$19.99',
  },
]

const Badge = ({
  children,
  variant,
}: {
  children: React.ReactNode
  variant: 'success' | 'danger' | 'warning'
}) => {
  const styles =
    variant === 'success'
      ? 'bg-lime-500/15 text-lime-800 dark:text-lime-300'
      : variant === 'danger'
      ? 'bg-red-500/15 text-red-800 dark:text-red-300'
      : 'bg-yellow-500/15 text-yellow-800 dark:text-yellow-300'

  return (
    <span className={cn('rounded-full px-2 py-1 text-xs font-medium', styles)}>
      {children}
    </span>
  )
}

export function CustomersTableCard({
  title = 'Customers',
  subtitle = 'New users by first-user primary channel group (default)',
  customers = DEFAULT_CUSTOMERS,
  className,
}: CustomersTableCardProps) {
  return (
    <section
      className={cn(
        'relative w-full overflow-hidden rounded-2xl border border-border/60 bg-background shadow-md ring-1 ring-foreground/5',
        className,
      )}
      aria-label={title}
    >
      <div className="space-y-1 border-b border-border/60 p-6">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full border border-black/5 bg-muted" />
          <span className="size-2 rounded-full border border-black/5 bg-muted" />
          <span className="size-2 rounded-full border border-black/5 bg-muted" />
        </div>
        <h2 className="text-lg font-semibold leading-none tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-160 border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-muted/50 supports-backdrop-filter:backdrop-blur-sm">
            <tr className="text-muted-foreground *:px-3 *:py-3 *:text-left *:font-medium">
              <th className="w-12">#</th>
              <th className="min-w-30">Date</th>
              <th className="min-w-30">Status</th>
              <th className="min-w-55">Customer</th>
              <th className="min-w-30 pr-4 text-right">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, idx) => (
              <tr
                key={customer.id}
                className="border-b border-border/60 transition-colors last:border-0 hover:bg-muted/30 *:px-3 *:py-2"
              >
                <td className="text-muted-foreground">{idx + 1}</td>
                <td className="whitespace-nowrap">{customer.date}</td>
                <td>
                  <Badge variant={customer.statusVariant}>{customer.status}</Badge>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="size-7 overflow-hidden rounded-full ring-1 ring-border/60">
                      <img
                        src={customer.avatar}
                        alt={customer.name}
                        width={28}
                        height={28}
                        loading="lazy"
                      />
                    </div>
                    <span className="truncate font-medium text-foreground">{customer.name}</span>
                  </div>
                </td>
                <td className="pr-4 text-right font-medium tabular-nums">{customer.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-border/60 p-4 text-xs text-muted-foreground">
        <span>
          Showing <strong>{customers.length}</strong> {customers.length === 1 ? 'row' : 'rows'}
        </span>
        <span>Updated just now</span>
      </div>
    </section>
  )
}

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-black" id="features">
      <div className="bg-black mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Feature Section</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Production-ready building blocks for fast, reliable AI product delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full overflow-hidden border-border/60 bg-secondary/30 p-6">
            <Layout className="size-5 text-primary" />
            <h3 className="mt-5 text-lg font-semibold text-foreground">AI Code Generation</h3>
            <p className="mt-3 max-w-xl text-balance text-muted-foreground">
              Advanced models transform natural language into production-ready code for faster iteration.
            </p>
            <div className="mt-8 overflow-hidden rounded-xl border border-border/60 bg-background">
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=80"
                alt="Dashboard preview"
                className="h-72 w-full object-cover object-top"
                loading="lazy"
              />
            </div>
          </Card>

          <Card className="overflow-hidden border-border/60 bg-secondary/30 p-6">
            <Target className="size-5 text-primary" />
            <h3 className="mt-5 text-lg font-semibold text-foreground">Team Sync</h3>
            <p className="mt-3 text-balance text-muted-foreground">
              Keep engineering teams aligned with contextual updates and intelligent recommendations.
            </p>
            <MeetingIllustration />
          </Card>

          <Card className="group overflow-hidden border-border/60 bg-secondary/30 px-6 pt-6">
            <CalendarCheck className="size-5 text-primary" />
            <h3 className="mt-5 text-lg font-semibold text-foreground">Intelligent Review</h3>
            <p className="mt-3 text-balance text-muted-foreground">
              Detect bugs, security gaps, and performance regressions before they reach production.
            </p>
            <CodeReviewIllustration />
          </Card>

          <Card className="group overflow-hidden border-border/60 bg-secondary/30 px-6 pt-6">
            <Sparkles className="size-5 text-primary" />
            <h3 className="mt-5 text-lg font-semibold text-foreground">Contextual Assistant</h3>
            <p className="mt-3 text-balance text-muted-foreground">
              A personalized AI copilot that understands your repository and helps solve complex tasks.
            </p>
            <div className="-mx-2 -mt-2 px-2 pt-2">
              <AIAssistantIllustration />
            </div>
          </Card>

          <div className="col-span-full mt-2">
            <CustomersTableCard />
          </div>
        </div>
      </div>
    </section>
  )
}

const MeetingIllustration = () => {
  return (
    <Card aria-hidden className="mt-9 aspect-video border-border/60 p-4">
      <div className="mb-0.5 text-sm font-semibold">AI Strategy Meeting</div>
      <div className="mb-4 flex gap-2 text-sm">
        <span className="text-muted-foreground">2:30 - 3:45 PM</span>
      </div>
      <div className="mb-2 flex -space-x-1.5">
        <div className="flex -space-x-1.5">
          {[
            { src: MESCHAC_AVATAR, alt: 'Meschac Irung' },
            { src: BERNARD_AVATAR, alt: 'Bernard Ngandu' },
            { src: THEO_AVATAR, alt: 'Theo Balick' },
            { src: GLODIE_AVATAR, alt: 'Glodie Lukose' },
          ].map((avatar, index) => (
            <div
              key={index}
              className="size-7 rounded-full border bg-background p-0.5 shadow shadow-zinc-950/5"
            >
              <img
                className="aspect-square rounded-full object-cover"
                src={avatar.src}
                alt={avatar.alt}
                height="460"
                width="460"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="text-sm font-medium text-muted-foreground">ML Pipeline Discussion</div>
    </Card>
  )
}

const CodeReviewIllustration = () => {
  return (
    <div aria-hidden className="relative mt-6">
      <Card className="aspect-video w-4/5 translate-y-4 border-border/60 p-3 transition-transform duration-200 ease-in-out group-hover:-rotate-3">
        <div className="mb-3 flex items-center gap-2">
          <div className="size-6 rounded-full border bg-background p-0.5 shadow shadow-zinc-950/5">
            <img
              className="aspect-square rounded-full object-cover"
              src={MESCHAC_AVATAR}
              alt="M Irung"
              height="460"
              width="460"
              loading="lazy"
            />
          </div>
          <span className="text-sm font-medium text-muted-foreground">Meschac Irung</span>
          <span className="text-xs text-muted-foreground/75">2m</span>
        </div>

        <div className="ml-8 space-y-2">
          <div className="h-2 rounded-full bg-foreground/10"></div>
          <div className="h-2 w-3/5 rounded-full bg-foreground/10"></div>
          <div className="h-2 w-1/2 rounded-full bg-foreground/10"></div>
        </div>

        <Signature className="ml-8 mt-3 size-5" />
      </Card>
      <Card className="absolute -top-4 right-0 flex aspect-3/5 w-2/5 translate-y-4 border-border/60 p-2 transition-transform duration-200 ease-in-out group-hover:rotate-3">
        <div className="m-auto flex size-10 rounded-full bg-foreground/5">
          <Play className="m-auto size-4 fill-foreground/50 stroke-foreground/50" />
        </div>
      </Card>
    </div>
  )
}

const AIAssistantIllustration = () => {
  return (
    <Card
      aria-hidden
      className="mt-6 aspect-video translate-y-4 border-border/60 p-4 pb-6 transition-transform duration-200 group-hover:translate-y-0"
    >
      <div className="w-fit">
        <Sparkles className="size-3.5 fill-purple-300 stroke-purple-300" />
        <p className="mt-2 line-clamp-2 text-sm">
          How can I optimize my neural network to reduce inference time while maintaining accuracy?
        </p>
      </div>
      <div className="-mx-3 -mb-3 mt-3 space-y-3 rounded-lg bg-foreground/5 p-3">
        <div className="text-sm text-muted-foreground">Ask AI Assistant</div>

        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="size-7 rounded-2xl bg-transparent shadow-none">
              <Plus />
            </Button>
            <Button variant="outline" size="icon" className="size-7 rounded-2xl bg-transparent shadow-none">
              <Globe />
            </Button>
          </div>

          <Button size="icon" className="size-7 rounded-2xl bg-black text-white hover:bg-black/90">
            <ArrowUp strokeWidth={3} />
          </Button>
        </div>
      </div>
    </Card>
  )
}
