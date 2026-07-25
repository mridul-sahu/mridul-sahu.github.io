import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { roles } from './data'
import { EASE, Reveal, rich } from './ui'

/* a friendly monochrome guide — original mark, not the Rudrite voxel elephant */
function Robot() {
  const reduce = useReducedMotion()
  return (
    <svg viewBox="0 0 72 86" width="98" height="117" className="robot" aria-hidden>
      <line x1="36" y1="9" x2="36" y2="20" stroke="var(--ink)" strokeWidth="2" />
      <motion.circle
        cx="36"
        cy="6"
        r="3.6"
        fill="var(--ink)"
        animate={reduce ? {} : { scale: [1, 1.35, 1], opacity: [1, 0.55, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '36px 6px' }}
      />
      <rect x="11" y="20" width="50" height="45" rx="13" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
      <rect x="16" y="25" width="40" height="35" rx="9" fill="none" stroke="var(--hair)" strokeWidth="1" />
      <motion.g
        animate={reduce ? {} : { scaleY: [1, 1, 0.1, 1, 1] }}
        transition={{ duration: 3.6, times: [0, 0.46, 0.5, 0.54, 1], repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '36px 41px' }}
      >
        <circle cx="28" cy="41" r="3.7" fill="var(--ink)" />
        <circle cx="44" cy="41" r="3.7" fill="var(--ink)" />
      </motion.g>
      <path d="M29 51 Q36 56 43 51" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
      <rect x="23" y="67" width="26" height="13" rx="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
    </svg>
  )
}

function CareerGuide({ index }: { index: number }) {
  const reduce = useReducedMotion()
  const role = roles[index]
  return (
    <div className="guide">
      <motion.div
        className="bot"
        animate={reduce ? {} : { y: [0, -5, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Robot />
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="bubble"
          initial={reduce ? false : { opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <div className="b-theme">{role.theme}</div>
          <p>{role.note}</p>
        </motion.div>
      </AnimatePresence>
      <div className="guide-prog">
        {index + 1} / {roles.length}
      </div>
    </div>
  )
}

export function CareerSection() {
  const [active, setActive] = useState(0)
  const stations = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx)
            if (!Number.isNaN(idx)) setActive(idx)
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    stations.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="section" id="work">
      <div className="wrap">
        <Reveal>
          <div className="sechead big">
            <span className="idx">02</span>
            <h2>Career</h2>
            <span className="sechead-note">eight years · four arcs</span>
          </div>
        </Reveal>
        <div className="career">
          <div className="guide-col">
            <CareerGuide index={active} />
          </div>
          <div className="timeline big">
            {roles.map((r, i) => (
              <Reveal key={r.company + i} delay={0.03}>
                <div
                  className={`station big ${i === active ? 'active' : ''}`}
                  data-idx={i}
                  ref={(el) => {
                    stations.current[i] = el
                  }}
                >
                  <span className="node" />
                  <div className="theme-chip">{r.theme}</div>
                  <div className="st-head">
                    <span className="st-company">
                      {r.company}
                      {r.current && <span className="nowdot">● now</span>}
                    </span>
                    <span className="st-dates">{r.dates}</span>
                  </div>
                  <div className="st-title">
                    {r.title} <span className="loc">· {r.location}</span>
                  </div>
                  <p className="st-summary">{r.summary}</p>
                  <ul className="st-bullets">
                    {r.bullets.map((b, j) => (
                      <li key={j}>{rich(b)}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
