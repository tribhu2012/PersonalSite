import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
  href?: string
} & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>

/**
 * Heading with a mint marker swipe behind its lower third. The swipe comes
 * from `.swipe` (an inline background gradient with box-decoration-clone), so
 * a heading that wraps gets a swipe under each line rather than one long bar.
 */
export function Highlighted({ children, as = 'h2', className = '' }: { children: ReactNode; as?: 'h1' | 'h2'; className?: string }) {
  const Tag = as
  return (
    <Tag className={`text-3xl font-extrabold leading-[1.25] tracking-tight text-black sm:text-4xl lg:text-5xl ${className}`}>
      <span className="swipe">{children}</span>
    </Tag>
  )
}

/** Body prose — long measure, generous leading, periwinkle links. */
export function Prose({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`max-w-3xl space-y-6 text-lg leading-9 text-slate-700 sm:text-xl sm:leading-10 ${className}`}>
      {children}
    </div>
  )
}

export function ProseLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith('http') || href.startsWith('mailto')
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="text-link underline decoration-transparent underline-offset-4 transition hover:decoration-current"
    >
      {children}
    </a>
  )
}

/** Centred section header. Body copy stays left-aligned for readability. */
export function SectionHeading({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Highlighted>{title}</Highlighted>
      {description && <p className="mt-6 text-base leading-8 text-slate-700 sm:text-lg sm:leading-9">{description}</p>}
    </div>
  )
}

/** One full-screen section. Content is vertically centred inside it. */
export function Screen({ id, className = '', children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={`screen py-20 ${className}`}>
      <Container className="w-full">{children}</Container>
    </section>
  )
}

/**
 * White card used across every screen — one shadow, one radius. Lifts on
 * hover with a mint hairline, echoing the heading swipe. Pass
 * `interactive={false}` for cards that aren't meant to feel clickable.
 */
export function Card({
  className = '',
  interactive = true,
  children,
}: {
  className?: string
  interactive?: boolean
  children: ReactNode
}) {
  const hover = interactive
    ? 'hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(15,23,42,0.13)] hover:ring-1 hover:ring-mint'
    : ''

  return (
    <div className={`group rounded-3xl bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.07)] transition-all duration-300 ${hover} ${className}`}>
      {children}
    </div>
  )
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

export function Button({ children, variant = 'primary', className = '', href, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'
  const styles = variant === 'primary'
    ? 'bg-sky-700 text-white shadow-[0_10px_30px_rgba(3,105,161,0.2)] hover:bg-sky-800'
    : 'border border-slate-200 bg-white text-slate-700 hover:border-sky-600 hover:text-sky-700'

  if (href) {
    return <a href={href} className={`${base} ${styles} ${className}`} {...props}>{children}</a>
  }

  return <button className={`${base} ${styles} ${className}`} {...props}>{children}</button>
}

/**
 * lucide-react dropped brand icons, so the LinkedIn mark is inlined here.
 * Matches lucide's API (size/className) so it drops into the same slots.
 */
export function LinkedinIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

/**
 * Sticker button — hard black border with an offset shadow, tilted
 * slightly so it reads as something stuck onto the page. Pressing it
 * slides the button into its own shadow.
 */
export function StickerButton({
  href,
  tilt = '-rotate-2',
  variant = 'light',
  children,
}: {
  href: string
  tilt?: string
  variant?: 'light' | 'dark'
  children: ReactNode
}) {
  const styles = variant === 'light'
    ? 'bg-white text-black'
    : 'bg-black text-white'

  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 border-[2.5px] border-black px-6 py-3 text-[15px] font-bold shadow-[5px_5px_0_0_#000] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_0_#000] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${styles} ${tilt}`}
    >
      {children}
    </a>
  )
}

/**
 * Full-screen loading gate: a boxed name with a blinking dot, matching
 * the reference. Waits for window load (so fonts and the hero image are
 * in) plus a short floor so it never flashes, then fades out.
 */
export function Loader({ name }: { name: string }) {
  const [done, setDone] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const MIN_MS = 900
    const start = performance.now()

    const finish = () => {
      const wait = Math.max(0, MIN_MS - (performance.now() - start))
      window.setTimeout(() => setDone(true), wait)
    }

    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })

    // Never trap the page behind a stalled asset.
    const bail = window.setTimeout(() => setDone(true), 5000)
    return () => {
      window.removeEventListener('load', finish)
      window.clearTimeout(bail)
    }
  }, [])

  // Unmount only after the fade so it can't swallow clicks.
  useEffect(() => {
    if (!done) return
    const t = window.setTimeout(() => setGone(true), 500)
    return () => window.clearTimeout(t)
  }, [done])

  if (gone) return null

  return (
    <div
      aria-hidden={done}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-500 ${done ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
    >
      <div className="flex items-center gap-3 border-[3px] border-black px-6 py-3">
        <span className="text-lg font-bold uppercase tracking-[0.08em] text-black sm:text-xl">{name}</span>
        <span className="dot-blink h-2 w-2 rounded-full bg-black" />
      </div>
    </div>
  )
}

/**
 * Sticky note — square corners, paper colour, a slight tilt that
 * straightens on hover, and a curled bottom corner.
 */
export function StickyNote({
  title,
  items,
  tone,
  tilt,
}: {
  title: string
  items: string[]
  tone: string
  tilt: string
}) {
  return (
    <div
      className={`relative h-full p-5 shadow-[5px_7px_16px_rgba(15,23,42,0.16)] transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 ${tone} ${tilt}`}
    >
      <h3 className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-navy">{title}</h3>
      <ul className="mt-3 space-y-1.5 text-[14px] leading-6 text-navy/85">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-navy/35">—</span>
            {item}
          </li>
        ))}
      </ul>
      {/* Curled corner. */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 right-0 h-6 w-6 bg-navy/10 [clip-path:polygon(100%_0,100%_100%,0_100%)]"
      />
    </div>
  )
}

/** Interests: a taped, ruled index card so it reads as a different artefact. */
export function PinnedCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="relative h-full rotate-1 bg-note-card p-5 pt-7 shadow-[5px_7px_16px_rgba(15,23,42,0.14)] ring-1 ring-navy/10 transition-transform duration-300 hover:-translate-y-1 hover:rotate-0">
      {/* Strip of tape across the top edge. */}
      <span
        aria-hidden="true"
        className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-2 bg-tape/80 shadow-sm"
      />
      <h3 className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-navy">{title}</h3>
      <ul className="ruled mt-3 text-[14px] leading-7 text-navy/85">
        {items.map((item) => (
          <li key={item} className="flex gap-2 leading-7">
            <span className="text-dot">★</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Pipeline stages drawn as a boustrophedon flow: two per row, alternating
 * direction, with a drop between rows on whichever side the row ended.
 * Takes any even-ish number of stages; a trailing odd one sits alone.
 */
export function PipelineFlow({ stages }: { stages: string[] }) {
  const rows: string[][] = []
  for (let i = 0; i < stages.length; i += 2) rows.push(stages.slice(i, i + 2))

  const box = 'rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-center text-[11px] font-semibold leading-tight text-navy shadow-sm'

  return (
    <div className="w-full">
      {rows.map((row, r) => {
        // Rows run left-to-right, then right-to-left, so the flow snakes.
        const rightward = r % 2 === 0
        const dropOnRight = rightward

        return (
          <div key={row.join('-')}>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-1.5">
              <div className={box}>{rightward ? row[0] : row[1] ?? ''}</div>
              <span className="text-[13px] text-slate-400">{rightward ? '→' : '←'}</span>
              <div className={row[1] ? box : ''}>{rightward ? row[1] ?? '' : row[0]}</div>
            </div>

            {r < rows.length - 1 && (
              <div className="grid grid-cols-[1fr_auto_1fr] py-1">
                <span className={`text-center text-[13px] text-slate-400 ${dropOnRight ? 'invisible' : ''}`}>↓</span>
                <span />
                <span className={`text-center text-[13px] text-slate-400 ${dropOnRight ? '' : 'invisible'}`}>↓</span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/**
 * Scrum Inc. Registered Scrum Master badge — the hexagon mark, drawn as SVG
 * so it stays sharp at any size and needs no asset. If you have the official
 * artwork, drop it in and swap this for an <img>.
 */
export function RsmBadge({ size = 96, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Registered Scrum Master badge, Scrum Inc."
      className={className}
    >
      {/* Pointy-top hexagon. */}
      <path d="M50 3 L91 26.5 L91 73.5 L50 97 L9 73.5 L9 26.5 Z" fill="#2f6b4f" />
      {/* Rule pairs above and below the lettering. */}
      <g fill="#ffffff">
        <rect x="29" y="30" width="15" height="3.2" rx="1.6" />
        <rect x="56" y="30" width="15" height="3.2" rx="1.6" />
        <rect x="29" y="66.5" width="15" height="3.2" rx="1.6" />
        <rect x="56" y="66.5" width="15" height="3.2" rx="1.6" />
      </g>
      <text
        x="50"
        y="57.5"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="25"
        fontWeight="700"
        letterSpacing="0.5"
        fontFamily="Inter, sans-serif"
      >
        RSM
      </text>
    </svg>
  )
}

export function Badge({ children }: { children: ReactNode }) {
  return <span className="rounded-full bg-slate-100 px-3 py-1 text-[13px] font-semibold text-slate-700">{children}</span>
}

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
