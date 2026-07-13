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
    resume: '/Mridul_Sahu_Resume.pdf',
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
}

export const roles: Role[] = [
  {
    era: '2024 — now',
    theme: 'ML infrastructure · JAX',
    note: 'This is the JAX checkpointing layer — where I make saving and loading frontier models fast and fault-tolerant.',
    summary: 'Performance and reliability for the open-source JAX training stack — Orbax & Tunix.',
    company: 'Google',
    title: 'Senior Software Engineer, Core ML Frameworks',
    dates: 'Nov 2024 – Present',
    location: 'Bangalore',
    current: true,
    bullets: [
      'Cut Orbax checkpoint **blocking-save time 30–50%** with an asynchronous directory-creation mechanism (JAX distributed-client + `CommitFuture`) — awarded Google’s internal **Perfy** performance award.',
      'Designed a **sharding-driven checkpoint loader** that reads from the target `jax.sharding` rather than file layout, eliminating a **per-tensor reshard collective and per-tensor XLA recompilation** (~1× read amplification).',
      '**Single-Replica Restore + Broadcast** cut large-model restart time and storage read amplification **N×→1×**; hardened fault tolerance via the Emergency Checkpoint Manager.',
      'Architected Orbax’s **Dispatcher API** over multi- and single-controller JAX (incl. colocated Python) backends; built the **Knowledge Distillation** module for **Tunix** (Google’s JAX-native LLM post-training library).',
      'Built Orbax’s **benchmarking / observability framework** (`jax.monitoring`, XProf, HBM, TensorStore I/O), validated at **llama3-8B/70B/405B** scale. Founding member of the Core ML India team.',
    ],
  },
  {
    era: '2021 — 24',
    theme: 'Planet-scale backend',
    note: 'Backend at planet scale — billions of users and O(100K) writes per second.',
    summary: 'Storage and benefits infrastructure for one of the world’s largest consumer products.',
    company: 'Google One',
    title: 'Software Engineer III',
    dates: 'Oct 2021 – Oct 2024',
    location: 'Bangalore',
    bullets: [
      'Designed an **asynchronous processing system** that eliminated database lock contention and sustained **O(100K) write QPS** across all Google services.',
      'Tech-led a Gmail × Storage Quota Service initiative for an **XX Billion-user** base; piloted a 30-day storage grace period and shipped in-Gmail warning banners.',
      'Shipped a phased out-of-storage launch impacting **XX Million users/year** with **zero production incidents**, and a data-validation + outage-recovery pipeline safeguarding integrity for **XX Billion users** (Gmail, Photos, Drive).',
      'Built the **benefits-eligibility backend** (+70% over v1) impacting **XX Million users**; owned a **zero-incident** on-call migration of two teams from the US to India.',
    ],
  },
  {
    era: '2018 — 21',
    theme: 'Low-latency trading',
    note: 'Electronic trading systems — exchanges, order management, and an ~80× speedup.',
    summary: 'Built trading, exchange-protocol, and developer-education platforms end to end.',
    company: 'Zopte Technologies',
    title: 'Software Engineer',
    dates: 'Jun 2018 – Sep 2021',
    location: 'Mumbai',
    bullets: [
      'Engineered a Python **backtesting + live-trading platform** (Bloomberg, Zerodha, NSE-NNF, QuickFIX) with an **~80× performance uplift**, plus a distributed optimizer over a compute cluster.',
      'Built a low-level **NSE/NFO exchange** library, an **Order Management System (OMS)**, and Tick Collector; maintained an NSE-licensed CTCL application in production at a brokerage.',
      'Architected a **microservices service mesh** from scratch (gRPC, Redis, Kubernetes, Istio) and a code generator producing up to **60% of project code**; founded Zopte Academy and built ML pipelines for information extraction.',
    ],
  },
  {
    era: '2017',
    theme: 'Where it started',
    note: 'Where it began — games, C++, and shipping fast.',
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
    body: 'Drives reads from the target `jax.sharding` instead of file layout — coalescing each process’s shards into byte-range reads. Removes a per-tensor reshard collective and per-tensor XLA recompilation.',
    viz: 'shard',
  },
  {
    kicker: 'Orbax · Perfy Award',
    title: 'Asynchronous checkpoint save',
    body: 'An async directory-creation mechanism keeps directory work off the main training thread — cutting blocking-save time 30–50% with large annualized TPU/GPU savings.',
    viz: 'save',
  },
  {
    kicker: 'Orbax',
    title: 'Single-Replica Restore + Broadcast',
    body: 'One replica loads the checkpoint from storage and broadcasts it across all devices — collapsing storage read amplification from N× to 1× and shrinking restart time.',
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
    authors: 'C. Gaffney, S. Li, D. Ng, M. Sahu, et al. — arXiv:2605.23066 (cs.DC / cs.LG)',
    body: 'A modular, JAX-native checkpointing library demonstrating up to 3.5× faster saving and 2× faster loading vs. comparable PyTorch checkpointing.',
  },
  {
    when: '2018',
    title: 'EvoCut: A Generalization of the Albert-Barabási Model for Evolution of Complex Networks',
    href: 'https://ieeexplore.ieee.org/document/8468280',
    authors: 'S. K. Jaiswal, M. Pal, M. Sahu, P. Sahu, A. Dev — 22nd FRUCT Conference',
    body: '',
  },
]

export const projects = [
  {
    kicker: 'Independent Research · 2025 — now',
    title: 'research.rudrite.com',
    href: 'https://research.rudrite.com',
    body: 'Building a site that visualizes and explains landmark AI/ML research papers as interactive, animated explainers — a growing library covering the systems behind the models, redrawn and made legible.',
    tags: ['Training at scale', 'Megatron · GSPMD · ZeRO', 'LLM serving', 'Transformers', 'RLHF · reasoning'],
  },
  {
    kicker: 'Interactive Explainers · 2026 — now',
    title: 'explainers.rudrite.com',
    href: 'https://explainers.rudrite.com',
    body: 'Interactive visual explainers of system design, distributed systems, and real code — a growing library spanning high-level architecture down to line-by-line code walks.',
    tags: ['System design', 'Distributed systems', 'Code walkthroughs', 'Interactive'],
  },
]

export const skillGroups = [
  { label: 'Languages', items: ['Python', 'Go', 'C++', 'Java', 'Dart', 'JavaScript'] },
  {
    label: 'ML & Performance',
    items: ['JAX', 'XLA', 'Orbax', 'Flax (NNX)', 'Optax', 'Tunix', 'TensorStore', 'Pathways', 'Sharding', 'Collectives', 'TPU', 'XProf', 'Knowledge distillation'],
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

export const certs = [
  'Generative AI with LLMs — DeepLearning.AI',
  'Learning JAX — LinkedIn',
  'Transformer Models & BERT — Google Cloud',
  'Distributed Systems for Practitioners — Educative',
]

export const education = {
  school: 'National Institute of Technology, Meghalaya',
  degree: 'B.Tech, Computer Science & Engineering',
  cgpa: 8.76,
  dates: '2014 – 2018',
  location: 'Shillong, India',
}
