import type { ReactNode } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { profile, publications, projects } from './data'
import { Reveal, rich } from './ui'
import { Icon } from './icons'
import { StatBand, ShardingDiagram, BroadcastDiagram, SaveDiagram } from './exhibits'
import { CareerSection } from './career'
import { SkillsSection, EducationSection } from './sections'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  return <motion.div className="progress" style={{ scaleX }} aria-hidden />
}

type System = { flip: boolean; kicker: string; title: string; body: string; diagram: ReactNode }

const SYSTEMS: System[] = [
  {
    flip: false,
    kicker: 'Orbax · JAX — the marquee',
    title: 'A loader that reads the sharding, not the file',
    body: 'The old multi-host loader had every host read a file-contiguous slab, build a transient `(hosts, …)` array, then collapse it with a per-tensor `jnp.sum` reshard — a cross-host collective and a fresh XLA compile for **every tensor**. I rewrote it to read from the target `jax.sharding`: each process resolves its devices’ shards, turns their index domains into coalesced **byte-range reads**, and assembles locally — no collective, no recompilation, ~1× cluster I/O.',
    diagram: <ShardingDiagram />,
  },
  {
    flip: true,
    kicker: 'Orbax — restart',
    title: 'Single-Replica Restore + Broadcast',
    body: 'On restart, instead of every host re-reading the full checkpoint from storage, **one replica loads and broadcasts** across all devices — collapsing storage read amplification from **N× to 1×** and cutting startup time in multi-controller / multi-slice runs.',
    diagram: <BroadcastDiagram />,
  },
  {
    flip: false,
    kicker: 'Orbax · Perfy Award',
    title: 'Checkpoint saves that don’t block training',
    body: 'Directory creation used to block the main training thread on every checkpoint. I moved it off the critical path with an async mechanism coordinated through the JAX distributed client and `CommitFuture` — **cutting blocking save time 30–50%** with large annualized TPU/GPU savings.',
    diagram: <SaveDiagram />,
  },
]

export default function App() {
  const { links, email } = profile
  return (
    <>
      <ScrollProgress />

      <header>
        <div className="wrap headrow">
          <div className="mark">
            <b>Mridul Sahu</b>
            <span className="mark-suffix">
              <span className="dotsep">/</span> Core ML @ Google
            </span>
          </div>
          <div className="headright">
            <nav>
              <a href="#systems">Systems</a>
              <a href="#work">Career</a>
              <a href="#skills">Skills</a>
              <a href="#writing">Writing</a>
            </nav>
            <span className="hr-div" />
            <a className="top-email" href={`mailto:${email}`} aria-label="Email Mridul Sahu">
              <Icon name="mail" size={15} />
              <span className="te-text">{email}</span>
            </a>
            <a className="btn-resume" href={links.resume} target="_blank" rel="noreferrer">
              <Icon name="file" size={15} />
              <span>
                Résumé <span className="br-tag">PDF</span>
              </span>
            </a>
          </div>
        </div>
      </header>

      <main className="wrap hero">
        <Reveal>
          <div className="kicker">Senior SWE · Core ML Frameworks · Google</div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1>
            Mridul
            <br />
            Sahu
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="role">
            I build and optimize <span className="serif">Orbax</span> — JAX&rsquo;s distributed checkpointing library.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="tag">// distributed ML systems, made legible</p>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="lede">
            I work the <span className="mono">JAX / XLA</span> training stack at the sharding, collective, and compiler
            level — checkpoint I/O, fault tolerance, and large-model save/load. 8+ years building high-performance
            distributed systems across ML infrastructure, planet-scale backend services, and low-latency trading
            platforms.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="cta">
            <a className="btn primary" href={links.resume} target="_blank" rel="noreferrer">
              <Icon name="file" /> Résumé
            </a>
            <a className="btn icon" href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Icon name="github" />
            </a>
            <a className="btn icon" href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Icon name="linkedin" />
            </a>
            <a className="btn icon" href={links.x} target="_blank" rel="noreferrer" aria-label="X">
              <Icon name="x" />
            </a>
            <a className="btn icon" href={`mailto:${email}`} aria-label="Email">
              <Icon name="mail" />
            </a>
          </div>
        </Reveal>
        <div style={{ height: 'clamp(36px, 6vh, 64px)' }} />
        <Reveal delay={0.1}>
          <StatBand />
        </Reveal>
      </main>

      <section className="section" id="systems">
        <div className="wrap">
          <Reveal>
            <div className="sechead big">
              <span className="idx">01</span>
              <h2>Selected systems</h2>
              <span className="sechead-note">mechanisms, not bullet points</span>
            </div>
          </Reveal>
          {SYSTEMS.map((s) => (
            <Reveal key={s.title} delay={0.04}>
              <div className={`exhibit ${s.flip ? 'flip' : ''}`}>
                <div className="ex-text">
                  <div className="kicker">{s.kicker}</div>
                  <h3>{s.title}</h3>
                  <p>{rich(s.body)}</p>
                </div>
                <div className="ex-viz">{s.diagram}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CareerSection />

      <SkillsSection />

      <section className="section" id="writing">
        <div className="wrap">
          <Reveal>
            <div className="sechead big">
              <span className="idx">04</span>
              <h2>Writing &amp; research</h2>
            </div>
          </Reveal>
          <div className="rows">
            {publications.map((p) => (
              <Reveal key={p.title}>
                <div className="row">
                  <div className="when">{p.when}</div>
                  <div>
                    <h3>
                      <a href={p.href} target="_blank" rel="noreferrer">
                        {p.title} ↗
                      </a>
                    </h3>
                    <p className="authors">{p.authors}</p>
                    {p.body && <p>{p.body}</p>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ height: 26 }} />
          {projects.map((project, i) => (
            <div key={project.href}>
              {i > 0 && <div style={{ height: 26 }} />}
              <Reveal>
                <div className="feature">
                  <div className="kicker">{project.kicker}</div>
                  <h3>
                    <a href={project.href} target="_blank" rel="noreferrer">
                      {project.title} ↗
                    </a>
                  </h3>
                  <p>{project.body}</p>
                  <div className="tags">
                    {project.tags.map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <EducationSection />

      <footer id="contact">
        <div className="wrap">
          <div className="footgrid">
            <h2>Let&rsquo;s talk.</h2>
            <div className="links">
              <a aria-label="Email" href={`mailto:${email}`}>
                <Icon name="mail" />
              </a>
              <a aria-label="GitHub" href={links.github} target="_blank" rel="noreferrer">
                <Icon name="github" />
              </a>
              <a aria-label="LinkedIn" href={links.linkedin} target="_blank" rel="noreferrer">
                <Icon name="linkedin" />
              </a>
              <a aria-label="X" href={links.x} target="_blank" rel="noreferrer">
                <Icon name="x" />
              </a>
              <a aria-label="Résumé PDF" href={links.resume} target="_blank" rel="noreferrer">
                <Icon name="file" />
              </a>
            </div>
          </div>
          <div className="colophon">© 2026 Mridul Sahu · Bangalore, India · built with React + Motion</div>
        </div>
      </footer>
    </>
  )
}
