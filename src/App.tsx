import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  CircleCheck,
  GitBranch,
  GraduationCap,
  Mail,
  Menu,
  Star,
  X,
} from 'lucide-react'
import {
  about,
  blog,
  caseStudy,
  credentials,
  // decisions,
  hero,
  interests,
  journey,
  linkedinPosts,
  navGroups,
  navigation,
  products,
  profile,
  projects,
  skills,
  tools,
} from './data/portfolioData'
import {
  Badge,
  Card,
  Container,
  // DecisionReplay,
  Highlighted,
  LinkedinIcon,
  Loader,
  PinnedCard,
  ProductLogo,
  PipelineFlow,
  Prose,
  ProseLink,
  Reveal,
  CertBadge,
  Screen,
  SectionHeading,
  StickerButton,
  StickyNote,
} from './components/ui'

const socialLinks = [
  { icon: LinkedinIcon, label: 'LinkedIn', href: profile.linkedin },
  { icon: GitBranch, label: 'GitHub', href: profile.github },
  { icon: BookOpen, label: 'Medium', href: profile.medium },
  { icon: Mail, label: 'Email', href: `mailto:${profile.email}` },
]

/**
 * The Career road, derived from however many stops `journey` has — add or
 * remove one and the path and markers follow. Each span is one cubic that
 * leaves and rejoins the centre line, so its crest/trough lands exactly at
 * the span's midpoint, which is where the marker is pinned.
 */
const ROAD_SPAN = 200
const ROAD_H = 120
const ROAD_MID = ROAD_H / 2
const ROAD_AMP = 40
/** Container is taller than the road so labels have room above and below. */
const ROAD_BOX_H = 430
const ROAD_TOP = (ROAD_BOX_H - ROAD_H) / 2

const ROAD_W = journey.length * ROAD_SPAN

const ROAD_PATH = journey.reduce((d, _stop, i) => {
  const x0 = i * ROAD_SPAN
  const ctrlY = i % 2 === 0 ? ROAD_MID - ROAD_AMP : ROAD_MID + ROAD_AMP
  return `${d} C${x0 + 50},${ctrlY} ${x0 + 150},${ctrlY} ${x0 + ROAD_SPAN},${ROAD_MID}`
}, `M0,${ROAD_MID}`)

/** Midpoint of a cubic with both controls at ctrlY sits 30 off the centre. */
const ROAD_STOPS = journey.map((_stop, i) => ({
  x: i * ROAD_SPAN + ROAD_SPAN / 2,
  y: i % 2 === 0 ? ROAD_MID - 30 : ROAD_MID + 30,
}))

/** Spine + rule colour, cycled per post. */
const POST_ACCENTS = ['#4ade80', '#fbbf24', '#a78bfa', '#2dd4bf', '#fb7185']

const NOTE_TONES = ['bg-note-yellow', 'bg-note-pink', 'bg-note-blue']
const NOTE_TILTS = ['-rotate-2', 'rotate-1', '-rotate-1']

/** Only render curated LinkedIn posts once they've actually been filled in. */
const curatedLinkedinPosts = linkedinPosts.filter((post) => post.title !== 'Post title')

/**
 * Nav state from scroll position:
 *  - `compact` past 80px  → pill narrows and the name shortens to "TB"
 *  - `hidden` while scrolling down past 140px → bar slides away
 * Scrolling up any amount brings it straight back.
 */
function useNavScroll() {
  const [compact, setCompact] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setCompact(y > 80)
      // Ignore sub-pixel jitter so the bar doesn't flicker.
      if (Math.abs(y - lastY.current) > 6) {
        setHidden(y > lastY.current && y > 140)
        lastY.current = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { compact, hidden }
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { compact, hidden } = useNavScroll()

  // The pinned panel renders `featured`; the scroll list gets the rest.
  const featuredProject = projects.find((project) => project.featured)
  const shownProjects = projects.filter((project) => !project.featured)

  const featuredCert = credentials.certifications.find((cert) => cert.featured)
  const otherCerts = credentials.certifications.filter((cert) => !cert.featured)

  /* One card per category, not per credential — two certificates in the same
     discipline belong in the same box. Built by walking the list in order so
     the categories keep the order they're written in portfolioData, and the
     first entry of each group sets the card's accent. */
  const certGroups = otherCerts.reduce<{ category: string; accent: string; items: typeof otherCerts }[]>((groups, cert) => {
    const group = groups.find((g) => g.category === cert.category)
    if (group) group.items.push(cert)
    else groups.push({ category: cert.category, accent: cert.accent, items: [cert] })
    return groups
  }, [])

  // Derived, not an effect: a hidden bar must not leave a menu on screen.
  const showMenu = menuOpen && !hidden

  // The browser resolves #hash before React has rendered the sections, so a
  // deep link lands at the top. Re-run the jump once the DOM exists.
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return
    const target = document.getElementById(id)
    if (target) requestAnimationFrame(() => target.scrollIntoView())
  }, [])

  return (
    <div className="bg-cream text-slate-700">
      <Loader name={profile.name} />

      {/* ── Nav: hides on scroll down, contracts to "TB" ─────── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 px-4 transition-transform duration-300 sm:px-6 ${
          hidden ? '-translate-y-[130%]' : 'translate-y-0'
        } ${compact ? 'pt-2' : 'pt-4 sm:pt-6'}`}
      >
        <div
          className={`mx-auto flex items-center justify-between gap-4 rounded-full bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)] transition-all duration-300 ${
            compact ? 'max-w-3xl px-4 py-2 sm:px-5' : 'max-w-5xl px-5 py-3 sm:px-7'
          }`}
        >
          <nav className="hidden flex-1 items-center gap-6 text-[15px] font-semibold text-slate-800 lg:flex" aria-label="Primary navigation">
            {navGroups.left.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-dot focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
                {item.label}
              </a>
            ))}
          </nav>

          {/* Swaps to the monogram once contracted. */}
          <a
            href="#home"
            aria-label={profile.name}
            className={`font-extrabold tracking-tight text-black transition-all duration-300 lg:text-center ${
              compact ? 'text-lg' : 'text-base lg:text-lg'
            }`}
          >
            {compact ? 'TB' : profile.name}
          </a>

          <nav className="hidden flex-1 items-center justify-end gap-6 text-[15px] font-semibold text-slate-800 lg:flex" aria-label="Secondary navigation">
            {navGroups.right.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-dot focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
                {item.label}
              </a>
            ))}
          </nav>

          <button className="rounded-full border-2 border-black/15 p-2 text-black lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu" aria-expanded={showMenu}>
            {showMenu ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {showMenu && (
          <div className="mx-auto mt-2 max-w-5xl rounded-3xl bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.12)] lg:hidden">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <a key={item.href} href={item.href} className="rounded-xl px-3 py-2.5 text-[15px] font-semibold text-slate-800 hover:bg-slate-100" onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              ))}
              {/* CV download hidden for now */}
            </div>
          </div>
        )}
      </header>

      <main id="home">
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="hero-gradient screen relative overflow-hidden pt-28 sm:pt-24">
          <Container className="grid w-full items-center gap-8 lg:grid-cols-[1fr_0.95fr] lg:gap-6">
            <Reveal className="max-w-2xl">
              {/* Sized so "I'm Tribhuwan." holds one line — a longer name
                  than the reference's, so it can't take the same scale. */}
              <h1 className="text-5xl font-extrabold leading-[0.95] tracking-tight text-black sm:text-6xl lg:text-7xl">
                {hero.headline.map((line) => (
                  <span key={line} className="block">
                    {line}
                    <span className="text-dot">.</span>
                  </span>
                ))}
              </h1>

              <p className="mt-6 text-xl font-bold leading-8 text-slate-800 sm:text-2xl sm:leading-9">
                {hero.subtitle.map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <StickerButton href={hero.primaryCta.href} tilt="-rotate-2">
                  {hero.primaryCta.label} <ArrowRight size={16} />
                </StickerButton>
                <StickerButton href={hero.secondaryCta.href} tilt="rotate-1" variant="dark">
                  {hero.secondaryCta.label}
                </StickerButton>
              </div>
            </Reveal>

            {/* Whole illustration, uncropped and inside its column — no bleed
                and no height clipping, so the hands, watch and desk all stay
                visible. Lifted slightly, and nudged right with translate so
                the shift doesn't shrink it the way a margin would. */}
            <Reveal className="lg:-mt-8 lg:translate-x-12">
              <img
                src={hero.image}
                alt={hero.imageAlt}
                width={950}
                height={740}
                className={hero.imageIsCutOut ? 'mx-auto block w-full max-w-xl lg:max-w-none' : 'w-full rounded-[1.75rem] shadow-[0_20px_60px_rgba(15,23,42,0.18)]'}
              />
            </Reveal>
          </Container>
        </section>

        {/* ── About: prose, no tiles ────────────────────────── */}
        <Screen id="about" className="tint-tr">
          <Reveal>
            <div className="text-center">
              <Highlighted>{about.heading}</Highlighted>
            </div>
            <Prose className="mx-auto mt-10 text-justify hyphens-auto">
              {about.body.map((paragraph, i) => (
                <p key={i}>
                  {paragraph.map((chunk, j) =>
                    typeof chunk === 'string'
                      ? chunk
                      : <ProseLink key={j} href={chunk.href}>{chunk.label}</ProseLink>,
                  )}
                </p>
              ))}
            </Prose>
          </Reveal>
        </Screen>

        {/* ── Experience ────────────────────────────────────── */}
        <Screen id="experience" className="bg-band tint-bl">
          <Reveal>
            <SectionHeading title="Career so far" />
          </Reveal>

          {/* ── The road: one winding path, school and work as stops ── */}
          <Reveal className="relative mx-auto mt-4 hidden w-full lg:block">
            <div className="relative" style={{ height: ROAD_BOX_H }}>
              <svg
                viewBox={`0 0 ${ROAD_W} ${ROAD_H}`}
                preserveAspectRatio="none"
                aria-hidden="true"
                className="absolute left-0 w-full"
                style={{ top: ROAD_TOP, height: ROAD_H }}
              >
                <defs>
                  {/* Hand-drawn wobble. Turbulence pushes every edge off true
                      by a few units, so the asphalt reads as inked by hand
                      rather than stroked by a machine. Each layer takes a
                      different seed — sharing one would displace them
                      identically and the wobble would cancel out.

                      Low baseFrequency on purpose: the viewBox is squashed
                      horizontally (preserveAspectRatio="none"), which raises
                      the effective frequency, and anything much above ~0.01
                      turns the edge from a meander into fuzz. */}
                  <filter id="road-ink" x="-6%" y="-40%" width="112%" height="180%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="2" seed="4" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                  <filter id="road-ink-2" x="-6%" y="-40%" width="112%" height="180%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="2" seed="11" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>

                {/* Sketched underdraw: a fainter, wider pass offset a touch,
                    the way a pencil line gets gone over twice. */}
                <path
                  d={ROAD_PATH}
                  fill="none"
                  stroke="#1b2a47"
                  strokeWidth="26"
                  strokeLinecap="round"
                  opacity="0.28"
                  filter="url(#road-ink-2)"
                  transform="translate(1.5 2)"
                />

                {/* Asphalt, then the dashed centre line on top. */}
                <path d={ROAD_PATH} fill="none" stroke="#1b2a47" strokeWidth="24" strokeLinecap="round" filter="url(#road-ink)" />
                <path
                  d={ROAD_PATH}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="16 14"
                  opacity="0.8"
                  filter="url(#road-ink-2)"
                />
              </svg>

              {journey.map((stop, i) => {
                const pin = ROAD_STOPS[i]
                const above = pin.y < ROAD_H / 2
                const Icon = stop.kind === 'study' ? GraduationCap : BriefcaseBusiness

                return (
                  <div
                    key={`${stop.title}-${stop.period}`}
                    className="absolute"
                    style={{ left: `${(pin.x / ROAD_W) * 100}%`, top: ROAD_TOP + pin.y }}
                  >
                    {/* Marker sits on the centre line. */}
                    <span className="absolute -left-[15px] -top-[15px] flex h-[30px] w-[30px] items-center justify-center rounded-full border-[3px] border-white bg-dot text-white shadow-md">
                      <Icon size={14} strokeWidth={2.5} />
                    </span>

                    <div
                      className={`absolute left-1/2 w-48 -translate-x-1/2 text-center ${above ? "bottom-8" : "top-8"}`}
                    >
                      <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-dot">{stop.period}</p>
                      <p className="mt-1 text-[14px] font-extrabold leading-snug text-black">{stop.title}</p>
                      <p className="mt-0.5 text-[12px] leading-snug text-slate-500">{stop.place}</p>
                      {stop.note && <p className="mt-0.5 text-[12px] font-semibold leading-snug text-navy/60">{stop.note}</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          </Reveal>

          {/* Mobile: the same stops down a straight rail. */}
          <div className="relative mt-8 lg:hidden">
            <div aria-hidden="true" className="absolute bottom-2 left-[14px] top-2 w-[3px] rounded bg-navy" />
            <div className="space-y-5">
              {journey.map((stop) => {
                const Icon = stop.kind === 'study' ? GraduationCap : BriefcaseBusiness
                return (
                  <Reveal key={`${stop.title}-${stop.period}`} className="relative pl-12">
                    <span className="absolute left-0 top-0 flex h-[30px] w-[30px] items-center justify-center rounded-full border-[3px] border-band bg-dot text-white">
                      <Icon size={14} strokeWidth={2.5} />
                    </span>
                    <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-dot">{stop.period}</p>
                    <p className="mt-0.5 text-[15px] font-extrabold leading-snug text-black">{stop.title}</p>
                    <p className="mt-0.5 text-[13px] text-slate-500">{stop.place}</p>
                    {stop.note && <p className="mt-0.5 text-[13px] font-semibold text-navy/60">{stop.note}</p>}
                  </Reveal>
                )
              })}
            </div>
          </div>

          {/* CV download hidden for now */}
        </Screen>

        {/* ── My work: two tabs, PM vs Development ──────────── */}
        <Screen id="projects" className="tint-tr">
          <Reveal>
            <SectionHeading title="My work" description="Delivery I've run as a project manager, and the things I've built myself." />
          </Reveal>

          {/* Featured panel stays put; the list beside it scrolls, so more
              projects can be added without the section outgrowing a screen. */}
          {/* minmax(0,1fr) is load-bearing: without it the auto row grows to
              fit the tallest column, the fixed height stops clamping, and the
              right-hand list never scrolls. */}
          {/* Height tracks the featured card's tallest column — the pipeline.
              Too short and Card's overflow-hidden clips the tech badges. */}
          <div className="mt-8 grid gap-5 lg:h-[600px] lg:grid-cols-[1.5fr_1fr] lg:grid-rows-[minmax(0,1fr)]">
            <Reveal className="lg:h-full">
              <Card interactive={false} className="flex h-full flex-col overflow-hidden p-6">
                {/* Nothing previously told you this card was the featured one —
                    the eyebrow was in the data but never rendered. */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-dot">
                    {caseStudy.eyebrow}
                    <span className="mx-1.5 text-slate-300">/</span>
                    <span className="text-slate-500">{caseStudy.category}</span>
                  </span>
                  <span className="text-[13px] font-semibold text-slate-500">{caseStudy.year}</span>
                </div>

                <h3 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-black">
                  {caseStudy.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.6] text-slate-600">{caseStudy.intro}</p>

                {/* What I did and what it bought, side by side — both are short
                    lists, so they pair without either feeling cramped. */}
                <div className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                  <div className="flex flex-col">
                    <p className="inline-block self-start text-[13px] font-extrabold text-black">
                      <span className="swipe">What I did</span>
                    </p>
                    <ol className="mt-3 space-y-2">
                      {caseStudy.steps.map((step, i) => (
                        <li key={step} className="flex items-center gap-2.5 text-[13px] leading-5 text-slate-600">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-300 text-[10px] font-bold text-navy">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="flex flex-col">
                    <p className="inline-block self-start text-[13px] font-extrabold text-black">
                      <span className="swipe">Impact</span>
                    </p>
                    <div className="mt-3 space-y-2.5">
                      {caseStudy.impact.map((metric) => (
                        <div key={metric.label} className="flex items-baseline gap-2.5 rounded-2xl bg-band px-4 py-3">
                          <span className="text-2xl font-extrabold leading-none tracking-tight text-navy">
                            {metric.value}
                          </span>
                          {metric.dir === 'down' ? (
                            <ArrowDown size={15} className="shrink-0 self-center text-dot" />
                          ) : (
                            <ArrowUp size={15} className="shrink-0 self-center text-dot" />
                          )}
                          <span className="text-[12px] font-semibold leading-4 text-slate-600">{metric.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* The pipeline gets the full card width so it can run across
                    columns rather than down a single narrow rail. */}
                <div className="mt-5 flex-1 border-t border-dashed border-slate-300 pt-4">
                  <p className="inline-block text-[13px] font-extrabold text-black">
                    <span className="swipe">How it runs</span>
                  </p>
                  <div className="mt-3">
                    <PipelineFlow stages={caseStudy.stages} />
                  </div>
                </div>

                {featuredProject && (
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-slate-100 pt-4">
                    {featuredProject.technologies.map((tech) => <Badge key={tech}>{tech}</Badge>)}
                  </div>
                )}
              </Card>
            </Reveal>

            {/* Scroll column. Fades at the bottom to signal there's more. */}
            <div className="relative lg:h-full">
              <div className="space-y-4 lg:h-full lg:overflow-y-auto lg:pr-1.5 [scrollbar-width:thin]">
                {shownProjects.map((project) => (
                  <Reveal key={project.title}>
                    <Card className="flex flex-col p-5">
                      <div className="flex items-center justify-between gap-2">
                        <Badge>{project.category}</Badge>
                        <span className="text-[13px] font-semibold text-slate-500">{project.timeline}</span>
                      </div>
                      <h3 className="mt-2.5 text-lg font-extrabold tracking-tight text-black">{project.title}</h3>
                      <p className="mt-1.5 text-[13px] leading-6 text-slate-600">{project.description}</p>
                      <p className="mt-3 text-[13px] font-bold text-black">{project.outcome}</p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => <Badge key={tech}>{tech}</Badge>)}
                      </div>
                    </Card>
                  </Reveal>
                ))}
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-10 bg-gradient-to-t from-cream to-transparent lg:block"
              />
            </div>
          </div>

          {/* Products I've worked on — a logo wall, deliberately just marks
              and names. Hidden entirely until `products` has entries. */}
          {products.length > 0 && (
            <div className="mt-10 border-t border-dashed border-slate-300 pt-7">
              <Reveal>
                <p className="text-center text-base font-extrabold text-black sm:text-lg">
                  <span className="swipe">Products I&rsquo;ve worked on</span>
                </p>
              </Reveal>

              <Reveal>
                {/* Marks only, sitting straight on the background — no tile.
                    Deliberately NOT an equal-width grid: these logos run from
                    5:1 wordmarks to 1:1 square marks, so equal cells left the
                    square ones swimming in space. Each mark instead shrink-
                    wraps inside a max-height/max-width box and flex spreads
                    them, so the spacing is even between the marks themselves.
                    The width cap is what keeps a 5:1 wordmark from dwarfing
                    the rest. */}
                <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:justify-between">
                  {products.map((product) => {
                    const shell =
                      'flex h-12 max-w-[130px] items-center justify-center sm:h-14 sm:max-w-[150px]'
                    const inner = <ProductLogo src={product.logo} name={product.name} />

                    return (
                      <li key={product.name}>
                        {product.url ? (
                          <a
                            href={product.url}
                            target="_blank"
                            rel="noreferrer"
                            /* title gives the name back on hover, aria-label to screen readers. */
                            title={product.name}
                            aria-label={product.name}
                            className={`${shell} transition duration-300 hover:-translate-y-0.5 hover:scale-105`}
                          >
                            {inner}
                          </a>
                        ) : (
                          <span className={shell} title={product.name}>
                            {inner}
                          </span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </Reveal>
            </div>
          )}
        </Screen>

        {/* ── Make the call: the decision replay ──────────────
             Commented out until the rationale/cost lines in `decisions`
             are rewritten in your own words — search "decisions" to
             restore. The data and the DecisionReplay component are both
             still in place; uncomment this block, the two imports above,
             and the nav entries in portfolioData, then flip the four
             sections below back to their other tone so the cream/slate
             bands keep alternating.

        <Screen id="decisions" className="bg-band tint-bl">
          <Reveal>
            <SectionHeading title={decisions.heading} description={decisions.description} />
          </Reveal>

          <Reveal className="mt-8">
            <DecisionReplay items={decisions.items} closing={decisions.closing} />
          </Reveal>
        </Screen>
        ─────────────────────────────────────────────────────── */}

        {/* ── Writing ───────────────────────────────────────── */}
        <Screen id="writing" className="bg-band tint-bl">
          <Reveal>
            <SectionHeading title="Thoughts from the build" description="Ideas, reflections, and insights from building products, leading teams, and solving complex problems." />
          </Reveal>

          {/* Each post is its own card: coloured spine, date, serif title,
              matching rule, excerpt, then read time and arrow. */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {blog.posts.map((post, i) => {
              const accent = POST_ACCENTS[i % POST_ACCENTS.length]
              return (
                <Reveal key={post.url}>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_6px_24px_rgba(15,23,42,0.07)] ring-1 ring-navy/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_44px_rgba(15,23,42,0.12)]"
                  >
                    <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[6px]" style={{ background: accent }} />

                    <div className="flex flex-1 flex-col p-4 pl-6">
                      <p className="text-[12px] text-slate-500">{post.date}</p>

                      <h3 className="mt-2 font-serif text-[16px] font-bold leading-[1.3] text-black">{post.title}</h3>
                      <span aria-hidden="true" className="mt-2 block h-[3px] w-8 rounded-full" style={{ background: accent }} />

                      <p className="mt-2 line-clamp-2 text-[13px] leading-[1.45] text-slate-600">{post.excerpt}</p>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-[12px] text-slate-500">{post.readTime} read</span>
                        <ArrowRight size={18} className="text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-black" />
                      </div>
                    </div>
                  </a>
                </Reveal>
              )
            })}

            {/* Fills the last grid cell rather than leaving a gap. */}
            <Reveal>
              <a
                href={blog.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col justify-center rounded-xl border-2 border-dashed border-navy/20 p-5 text-center transition-colors duration-300 hover:border-navy/50 hover:bg-white/50"
              >
                <p className="font-serif text-[17px] font-bold leading-snug text-black">Everything else</p>
                <p className="mt-2 inline-flex items-center justify-center gap-2 text-sm font-bold text-dot">
                  Read on {blog.platform} <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </p>
              </a>
            </Reveal>
          </div>

          {curatedLinkedinPosts.length > 0 && (
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              {curatedLinkedinPosts.map((post) => (
                <Reveal key={post.url}>
                  <Card className="flex h-full flex-col">
                    {post.date && <p className="text-[13px] text-slate-500">{post.date}</p>}
                    <h4 className="mt-1 font-bold leading-6 text-black">{post.title}</h4>
                    <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{post.excerpt}</p>
                    <a href={post.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-dot">
                      View post <ArrowRight size={15} />
                    </a>
                  </Card>
                </Reveal>
              ))}
            </div>
          )}
        </Screen>

        {/* ── Skills ────────────────────────────────────────── */}
        <Screen id="skills" className="tint-tr">
          <Reveal>
            <SectionHeading title="My Project Toolkit" description="The tools and practices I use to turn problems into meaningful products." />
          </Reveal>

          {/* Three sticky notes plus a taped index card for interests. */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill, i) => (
              <Reveal key={skill.title}>
                <StickyNote
                  title={skill.title}
                  items={skill.items}
                  tone={NOTE_TONES[i % NOTE_TONES.length]}
                  tilt={NOTE_TILTS[i % NOTE_TILTS.length]}
                />
              </Reveal>
            ))}
            <Reveal>
              <PinnedCard title="Interests" items={interests} />
            </Reveal>
          </div>

          <Reveal>
            <Card className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <p className="shrink-0 text-xs font-bold uppercase tracking-[0.18em] text-dot">Tools</p>
              <div className="flex flex-wrap gap-1.5">
                {tools.map((tool) => <Badge key={tool}>{tool}</Badge>)}
              </div>
            </Card>
          </Reveal>
        </Screen>

        {/* ── Certifications: one seal card each. Education lives on the
            Career road now, so it isn't repeated here. ─────────────── */}
        <Screen id="credentials" className="bg-band tint-bl">
          <Reveal>
            <SectionHeading title="Certifications" description="Professional certification and licensure." />
          </Reveal>

          {/* Featured credential on the left with the Scrum Inc. badge, the
              rest grouped by category on the right — one card per discipline,
              however many certificates sit inside it. Coloured spine per card. */}
          <div className="mt-8 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            {featuredCert && (
              <Reveal>
                <Card interactive={false} className="relative flex h-full flex-col overflow-hidden p-6">
                  <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[6px]" style={{ background: featuredCert.accent }} />

                  <div className="flex items-center justify-between gap-3 pl-1.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600">
                      <Star size={11} strokeWidth={2.5} className="fill-current" /> {featuredCert.category}
                    </span>
                    {featuredCert.year && <span className="text-[13px] font-semibold text-slate-500">Earned {featuredCert.year}</span>}
                  </div>

                  <div className="mt-5 flex items-start gap-5 pl-1.5">
                    {/* Official badge if one has been dropped into public/, the
                        drawn mark otherwise. See `logo` in portfolioData. */}
                    <CertBadge src={featuredCert.logo} alt={`${featuredCert.name} badge`} size={86} />
                    <div className="min-w-0">
                      <h3 className="text-xl font-extrabold leading-tight tracking-tight text-black">{featuredCert.name}</h3>
                      <p className="mt-1.5 text-[14px] text-slate-600">{featuredCert.issuer}</p>
                    </div>
                  </div>

                  <p className="mt-5 border-t border-slate-100 pt-4 pl-1.5 text-[14px] leading-6 text-slate-600">{featuredCert.blurb}</p>

                  {/* mt-auto, not mt-4: the card stretches to the height of the
                      grouped cards beside it, and with no year/url to render
                      the slack would otherwise pool as dead space below the
                      tags. Pinning them to the bottom turns it into a footer.
                      Below lg the card is content-height, so this is a no-op. */}
                  <div className="mt-auto flex flex-wrap gap-2 pl-1.5 pt-4">
                    {featuredCert.tags?.map((tag) => <Badge key={tag}>{tag}</Badge>)}
                  </div>

                  {featuredCert.url && (
                    <a
                      href={featuredCert.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-auto inline-flex items-center gap-1.5 pl-1.5 pt-5 text-[13px] font-bold transition hover:gap-2.5"
                      style={{ color: featuredCert.accent }}
                    >
                      View credential <ArrowUpRight size={14} />
                    </a>
                  )}
                </Card>
              </Reveal>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              {certGroups.map((group) => (
                <Reveal key={group.category}>
                  <Card className="relative flex h-full flex-col overflow-hidden p-5">
                    <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[5px]" style={{ background: group.accent }} />

                    <p className="pl-1 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: group.accent }}>
                      {group.category}
                    </p>

                    {/* Credentials stack inside the one card, split by a dashed
                        rule rather than each getting a box of its own. */}
                    <div className="mt-1.5 divide-y divide-dashed divide-slate-200">
                      {group.items.map((cert) => (
                        <div key={cert.name} className="py-2.5 first:pt-0 last:pb-0">
                          <h3 className="pl-1 text-[17px] font-extrabold leading-tight tracking-tight text-black">{cert.name}</h3>
                          <p className="mt-1.5 pl-1 text-[13px] leading-snug text-slate-500">{cert.issuer}</p>

                          {(cert.year || cert.status) && (
                            <div className="mt-2 flex items-center gap-3 pl-1 text-[13px] text-slate-600">
                              {cert.year && (
                                <span className="inline-flex items-center gap-1.5">
                                  <CalendarDays size={13} className="text-slate-400" /> {cert.year}
                                </span>
                              )}
                              {cert.status && (
                                <span className="inline-flex items-center gap-1.5">
                                  <CircleCheck size={13} className="text-dot" /> {cert.status}
                                </span>
                              )}
                            </div>
                          )}

                          {cert.url && (
                            <a
                              href={cert.url}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-1.5 inline-flex items-center gap-1.5 pl-1 text-[13px] font-bold transition hover:gap-2.5"
                              style={{ color: group.accent }}
                            >
                              View credential <ArrowUpRight size={13} />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </Screen>

        {/* ── Publications & leadership ─────────────────────── */}
        <Screen id="research" className="tint-tr">
          <Reveal>
            <SectionHeading title="Publications and leadership" description="Peer-reviewed work and the communities I've helped run." />
          </Reveal>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <Card className="h-full">
                <div className="flex items-center gap-2">
                  <BookOpen size={18} className="text-dot" />
                  <h3 className="font-extrabold tracking-tight text-black">Publications</h3>
                </div>
                <div className="mt-4 divide-y divide-slate-100">
                  {credentials.publications.map((pub) => (
                    <a key={pub.url} href={pub.url} target="_blank" rel="noreferrer" className="group block py-3 first:pt-0 last:pb-0">
                      <p className="text-sm leading-6 text-slate-600 transition group-hover:text-black">{pub.citation}</p>
                      <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-dot transition group-hover:gap-2.5">
                        {pub.journal} <ArrowUpRight size={14} />
                      </p>
                    </a>
                  ))}
                </div>
              </Card>
            </Reveal>

            <Reveal>
              <Card className="h-full">
                <h3 className="font-extrabold tracking-tight text-black">Leadership</h3>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
                  {credentials.highlights.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-dot" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </div>
        </Screen>

        {/* ── Contact ───────────────────────────────────────── */}
        <Screen id="contact" className="hero-gradient">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-black sm:text-5xl lg:text-6xl">
                Let&rsquo;s stay in touch
                <span className="text-dot">.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg font-bold leading-8 text-slate-800">
                I’m starting my MS in Business Analytics and Project Management at UConn in Fall 2026, and I&rsquo;m always glad to talk delivery, automation, policy, governance, or whatever you&rsquo;re building. Email is fastest, and I reply to everything.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
                <StickerButton href={`mailto:${profile.email}`} tilt="-rotate-2" variant="dark">
                  {profile.email}
                </StickerButton>
                {/* CV download hidden for now */}
              </div>

              <p className="mt-8 text-sm font-semibold text-slate-700">{profile.location}</p>
            </Reveal>
          </div>
        </Screen>
      </main>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="bg-black py-14 text-white">
        <Container className="flex flex-col items-center gap-8 text-center">
          <a href="#home" className="text-2xl font-extrabold tracking-tight">
            {profile.name}
            <span className="text-dot">.</span>
          </a>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-slate-200 transition hover:border-white/50 hover:text-white"
              >
                <Icon size={16} /> {label}
              </a>
            ))}
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold text-slate-400" aria-label="Footer navigation">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <p className="text-sm text-slate-500">{profile.role}</p>
        </Container>
      </footer>
    </div>
  )
}

export default App
