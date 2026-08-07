/**
 * ─────────────────────────────────────────────────────────────
 *  ALL SITE CONTENT LIVES HERE. Edit this file only.
 *  Sourced from TribhuwanCV.pdf.
 *  [UConn content is commented out for now — search "UConn" to restore.]
 * ─────────────────────────────────────────────────────────────
 */
import blogPosts from './blogPosts.json'

export const profile = {
  name: 'Tribhuwan Bhatta',
  role: 'Engineer | Project Manager',
  // location: 'Hartford, CT, USA',
  location: 'Kathmandu, Nepal',
  // availability: 'Incoming MS student at UConn',
  email: 'tribhuwanbhatt7@gmail.com',
  phone: '+977-9869068078',
  linkedin: 'https://www.linkedin.com/in/tribbhatt/',
  github: 'https://github.com/Tribhuwan-Bhatta',
  medium: 'https://medium.com/@tribhuwanbhatt7',
  resumeUrl: '/Tribhuwan-Bhatta-CV.pdf',
}

/**
 * Labels here mirror the section headings on the page, so the nav and the
 * content can't drift apart. Full list drives the mobile menu and footer.
 */
export const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Career', href: '#experience' },
  { label: 'My Work', href: '#projects' },
  { label: 'Writing', href: '#writing' },
  { label: 'Skills', href: '#skills' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Contact', href: '#contact' },
]

/** The floating pill nav splits around the centred name — three each side. */
export const navGroups = {
  left: [
    { label: 'About', href: '#about' },
    { label: 'Career', href: '#experience' },
    { label: 'My Work', href: '#projects' },
  ],
  right: [
    { label: 'Writing', href: '#writing' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ],
}

/**
 * Homepage hero — the hand-drawn panel. `image` is the illustration
 * cropped out of tb1.png; drop a cleaner export at the same path to
 * swap it without touching any code.
 */
export const hero = {
  /** Two big lines, each closed with an accent dot. */
  headline: ['Hey', "I'm Tribhuwan"],
  subtitle: ['Engineer & Project Manager' /*, 'Incoming MS student at UConn' */],
  image: '/hero.png',
  imageAlt: 'Illustration of Tribhuwan working at his laptop.',
  /**
   * /hero.png is a transparent cut-out, so it sits directly on the
   * gradient. Set false if you swap in art that has its own painted
   * background — it will then render inside a rounded panel instead.
   */
  imageIsCutOut: true,
  primaryCta: { label: 'See my work', href: '#projects' },
  secondaryCta: { label: 'Who am I?', href: '#about' },
}

/**
 * About reads as prose, so each paragraph is a list of chunks: a plain
 * string, or a { label, href } that renders as an inline link.
 *
 * The 12+ banking clients figure that used to sit in a `highlights` tile
 * is written into the first paragraph instead — the tiles are gone, the
 * fact isn't.
 */
/** A paragraph is a list of these: plain text, or a chunk that renders as a link. */
type ProseChunk = string | { label: string; href: string }

export const about: { heading: string; body: ProseChunk[][] } = {
  heading: 'About',
  /* Kept to three paragraphs so the section still fits one screen. */
  body: [
    [
      "My career began in engineering, but I was quickly drawn to project and product delivery, where technology meets strategy and execution. Since then I've led fintech initiatives across 12+ banking clients, taking products from planning to production with cross-functional teams.",
    ],
    [
      "I'm passionate about improving how organisations operate: automating workflows across Jira and GitHub, establishing a Project Management Office from the ground up, mentoring early-career professionals. The through-line is building systems that are scalable, efficient, and driven by data.",
    ],
    [
      /* UConn sentence removed for now — original:
         '... public services. This fall I begin my MS in Business Analytics and Project Management at UConn. Always happy ...' */
      'My interests span AI, digital transformation, fintech, and governance, particularly how evidence-based decision-making strengthens institutions and public services. Always happy to connect with people building technology that creates meaningful impact.',
    ],
  ],
}

/** No longer rendered — the numbers now live in `about.body`. Kept for reference. */
export const highlights = [
  { title: 'Banking Clients', value: '12+', description: 'Fintech products delivered end-to-end across banking partners.' },
  { title: 'Workload Reduced', value: '30%', description: 'Through automated Jira and GitHub delivery workflows.' },
  { title: 'Faster Response', value: '50%', description: 'Improvement in client response times on live issues.' },
  { title: 'Interns Mentored', value: '6', description: 'Alongside establishing the company PMO from scratch.' },
]

/**
 * The road in "Career so far" — schooling and jobs on one chronological
 * path, left to right. `kind` picks the marker icon: 'study' or 'work'.
 * `note` is an optional fourth line.
 *
 * The road geometry in App.tsx is derived from this array's length, so
 * adding or removing a stop needs no code change.
 *
 * SAIM and Malpi are separate colleges on separate terms, so they get a stop
 * each rather than being collapsed into one line.
 */
export const journey = [
  { period: '2017 — 2019', title: 'Higher Secondary', place: "St. Xavier's College, Kathmandu", kind: 'study' },
  {
    period: '2019 — 2024',
    title: 'BE Electronics & Communication',
    place: 'IOE, Pulchowk Campus',
    /* The only fact the removed education section held that isn't elsewhere. */
    note: '',
    kind: 'study',
  },
  /* Months abbreviated throughout: the road label is w-48 and the period
     renders uppercase with letter-spacing, so "September 2025" spelled out
     wraps onto a second line and pushes the title off its marker. */
  { period: 'Jul 2023 — Apr 2024', title: 'R&D Intern', place: 'NSDevil, South Korea', kind: 'work' },
  { period: 'Jun 2024 — Jul 2026', title: 'Associate Project Manager', place: 'CityTech Group, Kathmandu', kind: 'work' },
  { period: 'Oct 2024 — Aug 2026', title: 'Faculty Member', place: 'SAIM College, Kathmandu', kind: 'work' },
  { period: 'Sep 2025 — Mar 2026', title: 'Faculty Member', place: 'Malpi International College, Kathmandu', kind: 'work' },
  { period: 'Apr 2026 — Aug 2026', title: 'Product Lead, Nagarik Chautari', place: 'Office of the Prime Minister, Govt. of Nepal', kind: 'work' },
  // { period: 'Fall 2026', title: 'MS Business Analytics & Project Management', place: 'University of Connecticut, Hartford', kind: 'study' },
  // { period: 'Fall 2026', title: 'Graduate Research Assistant', place: 'Connecticut Transportation Institute, Storrs, CT', kind: 'work' },
]

/**
 * Superseded by `journey` for the Career road, but kept: `summary`, the
 * bullets and the tags are all still here if you want the detailed cards
 * back. That level of detail otherwise belongs in the CV.
 */
export const experience = [
  {
    company: 'CityTech Group Pvt. Ltd.',
    title: 'Associate Project Manager',
    duration: '05/2024 — Present',
    location: 'Kathmandu, Nepal',
    summary: 'Lead fintech delivery across 12+ banking clients, and automate how the team ships.',
    responsibilities: [
      'Lead end-to-end delivery of fintech products across 12+ banking clients, from planning through production deployment.',
      'Facilitate Scrum ceremonies, manage stakeholder communication, and coordinate cross-functional teams.',
    ],
    achievements: [
      'Automated Jira and GitHub workflows and the live-issue pipeline — 30% less operational workload, 50% faster client response.',
      'Established the PMO, authored project management playbooks, and mentored 6 interns.',
      'Built team KPI and performance reporting used for HR evaluations and workforce planning.',
    ],
    tags: ['Scrum', 'Fintech', 'PMO', 'Stakeholder Management'],
    featured: true,
  },
  {
    company: 'SAIM College · Malpi International College',
    title: 'Faculty Member',
    duration: '10/2024 — Present',
    location: 'Kathmandu, Nepal',
    summary: 'Teach software engineering and project management, and supervise student research.',
    responsibilities: [
      'Teach Computer Systems, Digital Logic, DBMS, Operating Systems, and Software Engineering & Project Management.',
      'Oversee IT lab operations and provide technical support to students and faculty.',
    ],
    achievements: [
      'Designed course materials, assessments, and laboratory exercises across multiple modules.',
      'Supervised student projects and mentored students in technical and research-oriented work.',
    ],
    tags: ['Teaching', 'Mentoring', 'Software Engineering'],
    featured: false,
  },
  {
    company: 'NSDevil',
    title: 'Research and Development Intern',
    duration: '07/2023 — 04/2024',
    location: 'South Korea',
    summary: 'Built perception and navigation for autonomous mobile robots in South Korea.',
    responsibilities: [
      'Developed mobile robots for autonomous real-time perception and navigation using ROS2, Python, VSLAM, and MPC.',
      'Collaborated with an international research team on experiment design and performance evaluation.',
    ],
    achievements: [
      'Analysed experimental data and prepared technical documentation supporting navigation system optimisation.',
    ],
    tags: ['ROS2', 'Python', 'VSLAM', 'Research'],
    featured: false,
  },
]

/**
 * Derived from CV bullets. The Outcome/achievement lines are CV-verified.
 * Enrich the description lines with specifics only you know.
 */
/**
 * `track` decides which "My work" tab a project appears under:
 *   'pm'  → Project Management (work you ran as a PM)
 *   'dev' → Development (work you actually coded)
 * Moving a project between tabs is a one-word edit here.
 */
export const projects = [
  {
    title: 'Live-Issue Management Pipeline',
    /** Rendered as the pinned panel from `caseStudy`, so it's kept out of
     *  the scrolling list to avoid showing it twice. */
    featured: true,
    track: 'pm',
    category: 'Process Automation',
    role: 'Associate Project Manager',
    timeline: '2024',
    status: 'Live',
    description: 'Designed and automated an end-to-end triage pipeline across Jira and GitHub, routing ownership and status without manual chasing.',
    outcome: '30% less operational workload · 50% faster client response',
    technologies: ['Jira', 'GitHub', 'Automation', 'Apps Script'],
  },
  {
    title: 'Establishing the PMO',
    track: 'pm',
    category: 'Governance',
    role: 'Founding PMO Lead',
    timeline: '2024',
    status: 'Delivered',
    description: 'Stood up the company PMO from scratch, authored project management playbooks, and onboarded 6 interns into the new operating model.',
    outcome: 'Consistent governance across delivery teams',
    technologies: ['Confluence', 'Notion', 'Playbooks'],
  },
  {
    title: 'Team KPI & Performance Reporting',
    track: 'pm',
    category: 'Analytics',
    role: 'Associate Project Manager',
    timeline: '2024',
    status: 'Live',
    description: 'Defined team KPIs and built recurring performance reports that turned delivery data into a decision-ready format for HR and leadership.',
    outcome: 'Workforce planning now runs on data, not anecdote',
    technologies: ['Power BI', 'Looker Studio', 'Google Sheets'],
  },
  {
    title: 'Unified Testing Module',
    /* Built in Apps Script, so it sits under Development. Flip `track` to
       'pm' if you'd rather lead with the QA-governance side of it. */
    track: 'dev',
    category: 'QA Tooling',
    role: 'Associate Project Manager',
    /* [TODO] Placeholder year — replace with the real one. */
    timeline: '2025',
    status: 'Live',
    description: 'A UI-based testing platform anyone can pick up unsupported: testers walk the whole product, add test cases as they go, and raise a bug ticket straight from a failed step. Leads assign modules to testers, watch progress live, and generate reports from the same place.',
    outcome: 'Product-wide testing with no QA hand-holding',
    technologies: ['Apps Script', 'Google Sheets', 'Jira', 'HTML Service'],
  },
  {
    title: 'Autonomous Mobile Robot Navigation',
    track: 'dev',
    category: 'Research',
    role: 'R&D Intern',
    timeline: '2023 — 24',
    status: 'Completed',
    description: 'Built perception and control for mobile robots navigating unstructured environments, working with an international research team in South Korea.',
    outcome: 'Validated navigation and perception improvements',
    technologies: ['ROS2', 'VSLAM', 'MPC', 'Python'],
  },
]

/**
 * Products I've worked on — logo and name only, each tile linking out.
 *
 * `logo` is a path under public/, so dropping getpay.png into that folder
 * is all the paths below need. Until a file exists the tile shows the
 * product's initials instead — a blank `logo` *and* a 404 both fall back,
 * so logos can be added one at a time without a broken image on the page.
 *
 * `url` is blank on every entry: a link that 404s reads worse than no link
 * at all, and an entry without one renders as an unlinked tile. Fill them
 * in as you have them.
 *
 * The whole strip is hidden while this array is empty.
 */
export const products: { name: string; logo?: string; url?: string }[] = [
  { name: 'GetPay', logo: '/getpay.webp', url: 'https://getpay.global' },
  { name: 'FinPOS', logo: '/finpos.svg', url: 'https://finpos.global' },
  /* [CHECK] The product is listed as FinPulse but the page is /finpro/ — if the
     product is actually called FinPro, rename it here and in the logo file. */
  { name: 'FinPulse', logo: '/finpulse.webp', url: 'https://citytech.global/finpro/' },
  { name: 'BLB', logo: '/blb.webp', url: 'https://citytech.global/finpro/#branchless-banking' },
  /* [CHECK] Government site is http-only; browsers may flag it as not secure. */
  { name: 'Nagarik Chautari', logo: '/nagarik-chautari.svg', url: 'http://nagarikchautari.opmcm.gov.np' },
  { name: 'Autonomous Robot', logo: '/robo.avif', url: 'https://www.nsdevil.com/nsd-robo?lang=en' },
]

/**
 * The two "My work" tabs. Add projects by giving them a matching `track`.
 * Development currently holds one entry (the robotics work) — add your
 * coded side projects there and they'll appear automatically.
 */
export const workTabs = [
  { id: 'pm', label: 'Project Management' },
  { id: 'dev', label: 'Development' },
]

/** The strongest story to tell at length — expand this as you gather detail. */
/**
 * The pinned panel in "My work". Its own section is gone — this now sits
 * beside the scrolling project list.
 *
 * `steps`, `impact` and `stages` drive the panel; `blocks` and `metrics`
 * are the longer-form version, kept but no longer rendered.
 */
export const caseStudy = {
  eyebrow: 'Featured case study',
  category: 'Process Automation',
  year: '2024',
  title: 'Live-Issue Management Pipeline',
  intro: 'An end-to-end triage pipeline: clients raise an issue through a form, the Jira ticket opens itself, ownership routes to a developer, and resolution emails the client back.',
  /** "What I did" — three beats, in order. */
  steps: ['Mapped the workflow', 'Aligned teams & ownership', 'Automated the handoffs'],
  /** `dir` draws an up or down arrow next to the number. */
  impact: [
    { value: '30%', dir: 'down', label: 'less operational workload' },
    { value: '50%', dir: 'up', label: 'faster client response' },
  ],
  /**
   * The pipeline itself, drawn as a flow. Order matters.
   *
   * `icon` is a key, not a component, so this file stays free of React
   * imports — PipelineFlow maps it, the same way the journey timeline
   * maps its `kind`. `by` marks who moves the work: the automated steps
   * are the ones that used to be manual, which is where the 30% went.
   */
  stages: [
    { label: 'Client submits form', icon: 'form', by: 'Client' },
    { label: 'Logged to Sheets', icon: 'sheet', by: 'Automated' },
    { label: 'Jira ticket created', icon: 'ticket', by: 'Automated' },
    { label: 'Team lead assigns', icon: 'assign', by: 'Team lead' },
    { label: 'Developer resolves', icon: 'dev', by: 'Developer' },
    { label: 'Client emailed', icon: 'mail', by: 'Automated' },
  ],
  blocks: [
    ['Business problem', 'Live issues arrived across scattered channels with no consistent triage path, so engineers absorbed coordination work and clients waited on status updates.'],
    ['My role', 'Owned the end-to-end redesign — mapping the existing flow, defining ownership rules, and building the automation across Jira and GitHub.'],
    ['Process', 'Gave clients a single intake form that lands in Sheets and opens a Jira ticket automatically. From there the team lead assigns a developer, status transitions follow the work, and resolution triggers an email back to the client — no manual handoffs.'],
    ['Outcome', 'Operational workload down 30%, client response times 50% faster, and a documented pipeline the team could run without me.'],
  ],
  metrics: [
    ['Operational workload', '30% reduction'],
    ['Client response time', '50% faster'],
    ['Banking clients served', '12+'],
  ],
}

/**
 * Posts are pulled from your Medium RSS feed by scripts/sync-blog.mjs,
 * which runs automatically before every build. Don't edit blogPosts.json
 * by hand — publish on Medium and it appears on the next deploy.
 */
export const blog = {
  platform: 'Medium',
  profileUrl: profile.medium,
  posts: blogPosts,
}

/**
 * ⚠️ LinkedIn has no public feed and no API for personal profiles without
 * OAuth app review, so these can't be fetched automatically — they're curated.
 *
 * TO FILL IN: open a post on LinkedIn → Copy link → paste the URL below,
 * with a title and a one-line takeaway. Curated beats chronological here:
 * pick the 3 posts you actually want a hiring manager to read.
 */
export const linkedinPosts = [
  {
    title: 'Post title', // [TODO]
    excerpt: 'One line on what this post argues or shows.',
    date: '',
    url: profile.linkedin,
  },
  {
    title: 'Post title', // [TODO]
    excerpt: 'One line on what this post argues or shows.',
    date: '',
    url: profile.linkedin,
  },
  {
    title: 'Post title', // [TODO]
    excerpt: 'One line on what this post argues or shows.',
    date: '',
    url: profile.linkedin,
  },
]

/**
 * Three sticky notes plus Interests, which renders differently (see
 * `interests` below). The old six narrow groups were folded into these.
 */
export const skills = [
  {
    title: 'Management',
    items: ['Delivery planning', 'Roadmaps & risk tracking', 'Scrum ceremonies', 'Sprint & backlog planning', 'Release coordination', 'PMO setup & governance'],
  },
  {
    title: 'Soft Skills',
    items: ['Client communication', 'Executive reporting', 'Cross-functional alignment', 'Mentoring & teaching', 'Stakeholder management', 'Documentation'],
  },
  {
    title: 'Technical',
    /* One skill per line — the "Python · MySQL" pairings are gone. */
    items: ['Python', 'MySQL', 'Apps Script', 'Git', 'Workflow automation'],
  },
]

/**
 * Rendered as a pinned index card rather than a sticky note, so it reads as
 * a different kind of thing. All drawn from work already on this site —
 * swap in whatever you'd rather lead with.
 */
export const interests = [
  'Robotics & autonomous systems',
  'AI in public policy',
  'Teaching & mentoring',
  'Technical writing',
  'Community building',
  'Product & early-stage startups',
]

export const achievements = [
  { title: 'Delivery Automation', description: 'Rebuilt the live-issue pipeline across Jira and GitHub, removing manual triage overhead.', metric: '30% less workload', organization: 'CityTech Group' },
  { title: 'Client Responsiveness', description: 'Faster routing and clearer ownership cut the time clients wait on live issues.', metric: '50% faster response', organization: 'CityTech Group' },
  { title: 'Academic Excellence', description: 'Graduated top of the batch in Electronics, Communication and Information Engineering.', metric: 'GPA 3.97 · Batch Topper', organization: 'IOE, Pulchowk Campus' },
]

export const tools = ['Jira', 'GitHub', 'Confluence', 'Notion', 'Power BI', 'Tableau', 'MS Project', 'Google Workspace']

/**
 * Everything past `accent` is optional and the card only renders what's
 * there — so a certification can gain a logo, a status or a credential link
 * later without touching App.tsx.
 */
type Certification = {
  name: string
  issuer: string
  category: string
  accent: string
  featured?: boolean
  logo?: string
  blurb?: string
  tags?: string[]
  status?: string
  year?: string
  url?: string
}

export const credentials = {
  education: [
    // {
    //   degree: 'MS, Business Analytics and Project Management',
    //   school: 'University of Connecticut, Hartford',
    //   period: 'Fall 2026 — Incoming',
    //   note: 'School of Business',
    // },
    {
      degree: 'BE, Electronics, Communication and Information Engineering',
      school: 'IOE, Pulchowk Campus',
      period: '2019 — 2024',
      note: 'GPA 3.97 · Batch Topper',
    },
    {
      degree: 'Higher Secondary Education',
      school: "St. Xavier's College, Maitighar",
      period: '2017 — 2019',
      note: 'GPA 3.63',
    },
  ],
  /**
   * `featured` renders as the large left-hand card with the Scrum Inc. badge;
   * the rest fill the 2x2 grid beside it. `accent` colours the spine and the
   * category label.
   *
   * [TODO] `year` and `url` are intentionally blank — I don't have the earned
   * dates or credential links, and guessing them on a credential is the kind
   * of thing a recruiter checks. Fill either one in and the card's footer row
   * (date · status · "View credential") appears automatically.
   */
  certifications: [
    {
      name: 'Registered Scrum Master™',
      issuer: 'Agile Education by Scrum Inc.™',
      category: 'Featured credential',
      featured: true,
      accent: '#2f6b4f',
      /**
       * The official badge is a Scrum Inc. trademark, so it isn't bundled
       * here. Save your copy to public/rsm-badge.png — the card swaps it in.
       * If the file is missing the card falls back to the drawn RsmBadge
       * mark, so this path is safe to set before the upload lands. Change
       * the extension here if you save it as .webp/.svg instead.
       */
      logo: '/rsm-badge.png',
      /* Your words are better than mine here — edit freely. */
      blurb: 'Sharpened how I deliver value iteratively, keep cross-functional teams aligned, and improve the process every sprint.',
      tags: ['Agile & Delivery', 'Team Leadership', 'Scrum', 'Project Management'],
      year: '',
      url: '',
    },
    {
      name: 'Google Project Management',
      issuer: 'Google · Professional Certificate',
      category: 'Project management',
      accent: '#3b82f6',
      year: '',
      url: '',
    },
    {
      name: 'Software Processes and Agile Practices',
      issuer: 'University of Alberta',
      /* Same category and accent as the Google certificate, so the two
         project-management cards read as a pair. */
      category: 'Project management',
      accent: '#3b82f6',
      year: '',
      url: '',
    },
    {
      name: 'Software Product Management',
      issuer: 'University of Alberta',
      category: 'Product management',
      accent: '#f97316',
      year: '',
      url: '',
    },
    {
      name: 'Product Foundations',
      issuer: 'Product Vidhyalaya',
      /* Grouped with Software Product Management — same category label and
         accent, so the two read as one pair on the grid. */
      category: 'Product management',
      accent: '#f97316',
      year: '',
      url: '',
    },
    {
      name: 'Python Data Structure',
      issuer: 'University of Michigan',
      category: 'Programming',
      accent: '#8b5cf6',
      year: '',
      url: '',
    },
    {
      name: 'Programming For Everybody',
      issuer: 'University of Michigan',
      category: 'Programming',
      accent: '#8b5cf6',
      year: '',
      url: '',
    },
    {
      name: 'Engineering Licence',
      issuer: 'Nepal Engineering Council',
      category: 'Professional licence',
      accent: '#1e3a8a',
      year: '',
      url: '',
    },
  ] as Certification[],
  publications: [
    {
      citation: 'Bhatt N, Bhatt B, Neupane B, Karki A, Bhatta T, Thapa J, et al. (2021). Perceptions of family planning services and its key barriers among adolescents and young people in Eastern Nepal: A qualitative study.',
      journal: 'PLoS ONE 16(5): e0252184',
      url: 'https://doi.org/10.1371/journal.pone.0252184',
    },
    {
      citation: 'Bhatta T, Mane PM, Bhatt N, Bhatt KB (2020). Global Situation and Trend of COVID-19.',
      journal: 'Journal of Health & Medical Economics 6(1): 46',
      url: 'https://doi.org/10.36648/2471-9927.6.1.46',
    },
  ],
  highlights: [
    'Microsoft Learn Student Ambassador (2022 — 2024)',
    'Curator, TEDxIOE Pulchowk (2023 — 2024)',
    'President, Far-Western Engineering Students Society (2022 — 2023)',
    'Winner, Hult Prize at IOE (2020)',
    'Merit-Based Scholarship, IOE Pulchowk Campus (2019)',
  ],
}
