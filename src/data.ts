export const profile = {
  name: 'Mridul Sahu',
  role: 'Senior Software Engineer · Core ML Frameworks',
  org: 'Google',
  location: 'Bangalore, India',
  email: 'mridulsahu01@gmail.com',
  links: {
    github: 'https://github.com/mridul-sahu',
    linkedin: 'https://linkedin.com/in/mridul-sahu',
    x: 'https://x.com/TheMridulSahu',
    resume: '/Mridul_Sahu_Resume.pdf?v=20260725',
  },
}

export type Stat = {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  label: string
  sub?: string
}

export const stats: Stat[] = [
  { value: 50, suffix: '%', label: 'blocking save-time cut', sub: 'Orbax · Perfy award' },
  { value: 80, suffix: '×', label: 'backtesting throughput', sub: 'trading platform' },
  { value: 3.5, decimals: 1, suffix: '×', label: 'faster saves vs PyTorch', sub: 'Orbax · arXiv' },
  { value: 405, suffix: 'B', label: 'params checkpointed', sub: 'llama3 scale' },
]

export type RoleSection = {
  label: string
  bullets: string[]
}

export type Role = {
  era: string
  theme: string
  note: string
  summary: string
  company: string
  title: string
  dates: string
  location: string
  current?: boolean
  bullets: string[]
  sections?: RoleSection[]
}

export const roles: Role[] = [
  {
    era: '2024 – now',
    theme: 'ML infrastructure · JAX',
    note: 'This is the JAX checkpointing layer, where I make saving and loading frontier models fast and fault-tolerant.',
    summary: 'Leading the Orbax India function: performance and reliability for the open-source JAX training stack, Orbax & Tunix.',
    company: 'Google',
    title: 'Senior Software Engineer · Orbax India Lead, Core ML Frameworks',
    dates: 'Nov 2024 – Present',
    location: 'Bangalore',
    current: true,
    bullets: [
      '**Lead the Orbax India function, with direct ownership of its charter and planning**: run OKR planning and work assignment for the India engineering team, set delivery timelines for US counterparts and external Cloud customers, and review the team’s work from design through launch.',
      'Set the long-term plan for **continuous checkpointing** across Google’s flagship training and post-training stacks in service of company-wide TPU-efficiency goals, delegating feature design, implementation, and launch to team engineers and owning final review.',
      '**Direct the resolution of high-stakes Orbax escalations** for big-tech Google Cloud customers: triage and delegate fixes (slow checkpoint loads, storage optimizations, sharding bugs) to team engineers and own review and verification, unblocking training runs of models with **billions to trillions of parameters** on fleets of 32k+ TPU chips.',
      'Founding member of the **Core ML India** team: drove the transfer of Orbax workstream ownership from the US to India, proposed the charter of projects the team owns beyond Orbax, defined hiring signals for early hires, and mentor **8+ engineers** across the Keras, JAX, and Orbax ecosystems.',
      '**Cut Orbax checkpoint blocking-save time 30–50%**, with substantial annualized TPU/GPU savings, by designing an asynchronous directory-creation mechanism on JAX distributed-client coordination; awarded Google’s internal **Perfy** performance award. Now direct team engineers on follow-on save-path optimizations.',
      'Designed a **sharding-driven checkpoint loader** that reads from the target `jax.sharding` rather than file layout, eliminating per-tensor reshard collectives and XLA recompilation and cutting cluster read amplification to **~1×** the checkpoint; direct team engineers on its follow-on sharding fixes.',
      'Cut large-model restart time and **storage read amplification N×→1×** with Single-Replica Restore + Broadcast (one replica loads, then broadcasts); hardened fault tolerance via the Emergency Checkpoint Manager’s two-stage local + persistent save, delegating its follow-on metadata design to team engineers.',
      'Architected Orbax’s next-generation **Dispatcher API**, unifying multi-controller and single-controller checkpointing behind one extensible interface that lets single-controller frameworks like **Pathways** checkpoint at large distributed scale; directed the follow-on design and development, delegated to team engineers.',
      'Built Orbax’s checkpoint **benchmarking and observability framework** (stage timings, XProf traces, per-device HBM usage, TensorStore I/O) with A/B regression baselines, correctness digests, and CI/CD, validated at **llama3-8B/70B/405B** scale; delegated the design of the internal and open-source testing harnesses and Cloud benchmarking setups built on it, and administer the Cloud benchmark project, its usage policy, and request approvals.',
      'Built v0 of the **Knowledge Distillation** module for **Tunix** (Google’s JAX-native LLM post-training library): a strategy-pattern framework for logit, feature/attention transfer, and pooling/projection alignment across heterogeneous architectures; directed the module’s continued development by team engineers.',
    ],
  },
  {
    era: '2021 – 24',
    theme: 'Planet-scale backend',
    note: 'Backend at planet scale: billions of users and O(100K) writes per second.',
    summary: 'Storage and benefits infrastructure for one of the world’s largest consumer products.',
    company: 'Google One',
    title: 'Software Engineer III',
    dates: 'Oct 2021 – Oct 2024',
    location: 'Bangalore',
    bullets: [],
    sections: [
      {
        label: 'Storage Quota Service · Apr 2023 – Oct 2024',
        bullets: [
          'Designed an **asynchronous processing system** that eliminated database lock contention and sustained **O(100K) write QPS**, unlocking usage-calculation capacity across all Google services.',
          'Tech-led a Gmail × Storage Quota Service initiative for a **billion-plus-user** base: built a scalable experimentation framework, piloted a 30-day storage grace period in Gmail’s codebase, and shipped email + in-Gmail warning banners alerting millions of users.',
          'Shipped a phased out-of-storage launch reaching **millions of users** each year with **zero production incidents**, driving substantial Google One signups and upgrades.',
          'Built a **data-validation and recovery pipeline** safeguarding storage-usage integrity for **billions of user accounts**, plus a precision outage-recovery mechanism restoring usage across Gmail, Photos, and Drive.',
          'Built real-time **service-level usage-breakdown** infrastructure for Enterprise Customers, eliminating inefficient caching of millions of user-level rows in admin consoles.',
        ],
      },
      {
        label: 'Benefits · Oct 2021 – Apr 2023',
        bullets: [
          'Built the foundational **benefits-eligibility backend** (cornerstone of a major customer-acquisition feature), improving performance **70% over v1**, plus a reconciliation framework preventing data inconsistencies across partner teams (Photos, YouTube, Workspace, GStore).',
          'Led multiple benefit launches and international expansions impacting **millions of users** as central technical liaison across Product Areas; built backend to dynamically split/combine benefits for tailored delivery.',
          'Fixed critical infrastructure deficiencies affecting millions of users; established alerting/SLO/monitoring standards; owned a **zero-incident on-call migration** of the Benefits and Storage Quota Service teams from the US to India.',
        ],
      },
    ],
  },
  {
    era: '2018 – 21',
    theme: 'Low-latency trading',
    note: 'Electronic trading systems: exchanges, order management, and an ~80× speedup.',
    summary: 'Built trading, exchange-protocol, and developer-education platforms end to end.',
    company: 'Zopte Technologies',
    title: 'Software Engineer',
    dates: 'Jun 2018 – Sep 2021',
    location: 'Mumbai',
    bullets: [
      'Engineered a Python **backtesting and live-trading platform** (Bloomberg, Zerodha, NSE-NNF, QuickFIX, custom TimeSeries DB) with an **~80× performance uplift**, plus a distributed backtesting optimizer for strategy-parameter search over a compute cluster.',
      'Built a low-level **NSE/NFO exchange** library (proprietary protocols, binary structures, security compliance), an **Order Management System (OMS)**, and Tick Collector; maintained an NSE-licensed CTCL (computer-to-computer link) trading application in production at a brokerage.',
      'Built a **code generator** producing customizable, mockable server- and client-side codebases (up to **60% of project code**), wired to a custom real-time continuous-deployment system.',
      'Architected a **microservices service mesh** from scratch on Kubernetes with GCP and Istio (gRPC/REST, Zookeeper, Redis, Elasticsearch, MongoDB); built pluggable Flutter / Angular Dart UI components.',
    ],
  },
  {
    era: '2017',
    theme: 'Where it started',
    note: 'Where it began: games, C++, and shipping fast.',
    summary: 'First taste of shipping software: cross-platform games and tooling.',
    company: 'CrispyGames',
    title: 'Software Engineer, Intern',
    dates: 'Jun – Jul 2017',
    location: 'Mumbai',
    bullets: [
      'Built 2D cross-platform games (Cocos2dx, Android SDK, Swift, C++) and Java-based web administration tooling deployed on AWS.',
    ],
  },
]

export type Highlight = {
  kicker: string
  title: string
  body: string
  viz: 'shard' | 'save' | 'broadcast' | 'tick'
}

export const highlights: Highlight[] = [
  {
    kicker: 'Orbax · JAX',
    title: 'Sharding-driven checkpoint load',
    body: 'Drives reads from the target `jax.sharding` instead of file layout, coalescing each process’s shards into byte-range reads. Removes a per-tensor reshard collective and per-tensor XLA recompilation.',
    viz: 'shard',
  },
  {
    kicker: 'Orbax · Perfy Award',
    title: 'Asynchronous checkpoint save',
    body: 'An async directory-creation mechanism keeps directory work off the main training thread. Blocking-save time dropped 30–50%, with large annualized TPU/GPU savings.',
    viz: 'save',
  },
  {
    kicker: 'Orbax',
    title: 'Single-Replica Restore + Broadcast',
    body: 'One replica loads the checkpoint from storage and broadcasts it across all devices, collapsing storage read amplification from N× to 1× and shrinking restart time.',
    viz: 'broadcast',
  },
  {
    kicker: 'Trading · Zopte',
    title: '~80× backtesting uplift',
    body: 'A Python backtesting and live-trading platform across Bloomberg / Zerodha / NSE with a distributed strategy-parameter optimizer over a compute cluster.',
    viz: 'tick',
  },
]

export const publications = [
  {
    when: '2026',
    title: 'Orbax: Distributed Checkpointing with JAX',
    href: 'https://arxiv.org/abs/2605.23066',
    authors: 'C. Gaffney, S. Li, D. Ng, M. Sahu, et al. · arXiv:2605.23066 (cs.DC / cs.LG)',
    body: 'A modular, JAX-native checkpointing library demonstrating up to 3.5× faster saving and 2× faster loading vs. comparable PyTorch checkpointing.',
  },
  {
    when: '2018',
    title: 'EvoCut: A Generalization of the Albert-Barabási Model for Evolution of Complex Networks',
    href: 'https://ieeexplore.ieee.org/document/8468280',
    authors: 'S. K. Jaiswal, M. Pal, M. Sahu, P. Sahu, A. Dev · 22nd FRUCT Conference',
    body: '',
  },
]

export const projects = [
  {
    kicker: 'Independent Research · 2025 – now',
    title: 'research.rudrite.com',
    href: 'https://research.rudrite.com',
    body: 'Building a site that visualizes and explains landmark AI/ML research papers as interactive, animated explainers. The library keeps growing, covering the systems behind the models, redrawn and made legible.',
    tags: ['Training at scale', 'Megatron · GSPMD · ZeRO', 'LLM serving', 'Transformers', 'RLHF · reasoning'],
  },
  {
    kicker: 'Interactive Explainers · 2026 – now',
    title: 'explainers.rudrite.com',
    href: 'https://explainers.rudrite.com',
    body: 'A library of 30+ interactive visual explainers of system design, distributed systems, and real code, spanning high-level architecture down to line-by-line code walks.',
    tags: ['System design', 'Distributed systems', 'Code walkthroughs', 'Interactive'],
  },
  {
    kicker: 'TPU Mastery Courses · 2026 – now',
    title: 'kernels.rudrite.com',
    href: 'https://kernels.rudrite.com',
    body: 'Four open, lab-driven mastery courses on the TPU ML stack: Pallas kernels, JAX, XLA, and PyTorch. 53 chapters with 30 runnable labs, drill gyms, reproduced-failure exhibits, and live instruments, every published number benchmarked on real chips.',
    tags: ['Pallas', 'JAX', 'XLA', 'PyTorch', 'TPU'],
  },
]

export const skillGroups = [
  { label: 'Languages', items: ['Python', 'Go', 'C++', 'Java', 'Dart', 'JavaScript'] },
  {
    label: 'ML & Performance',
    items: ['JAX', 'XLA', 'Orbax', 'Flax (NNX)', 'Optax', 'Tunix', 'TensorStore', 'Pathways', 'Sharding', 'Collectives', 'TPU', 'XProf', 'Knowledge distillation'],
  },
  {
    label: 'Technical Leadership',
    items: ['Roadmap & OKR planning', 'Work assignment & delegated design', 'Design/launch review', 'Escalation direction', 'Cross-org & customer timelines', 'Hiring signals', 'Mentoring'],
  },
  {
    label: 'Systems & Architecture',
    items: ['Distributed systems', 'Microservices', 'System design', 'Low-latency / trading (FIX, OMS)', 'gRPC', 'REST'],
  },
  {
    label: 'Infrastructure & Data',
    items: ['Kubernetes', 'GCP', 'Docker', 'Linux', 'Git', 'SQL', 'MySQL', 'MongoDB', 'Elasticsearch', 'Redis', 'Cloud Pub/Sub'],
  },
]

export const education = {
  school: 'National Institute of Technology, Meghalaya',
  degree: 'B.Tech, Computer Science & Engineering',
  cgpa: 8.76,
  dates: '2014 – 2018',
  location: 'Shillong, India',
}
