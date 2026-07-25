import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useInView, animate } from 'motion/react'
import { skillGroups, education } from './data'
import { EASE, Reveal } from './ui'

export function SkillsSection() {
  const reduce = useReducedMotion()
  return (
    <section className="section" id="skills">
      <div className="wrap">
        <Reveal>
          <div className="sechead big">
            <span className="idx">03</span>
            <h2>Skills</h2>
            <span className="sechead-note">the toolkit</span>
          </div>
        </Reveal>
        <div className="skillgrid">
          {skillGroups.map((g) => (
            <Reveal key={g.label}>
              <div className="skillgroup">
                <div className="sg-label">{g.label}</div>
                <div className="chips">
                  {g.items.map((it, i) => (
                    <motion.span
                      key={it}
                      className="chip"
                      initial={reduce ? false : { opacity: 0, y: 10, scale: 0.96 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: '-6% 0px' }}
                      transition={{ duration: 0.4, ease: EASE, delay: Math.min(i * 0.03, 0.45) }}
                      whileHover={reduce ? {} : { y: -2 }}
                    >
                      {it}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EducationSection() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const [cgpa, setCgpa] = useState(reduce ? education.cgpa : 0)

  useEffect(() => {
    if (reduce || !inView) return
    const c = animate(0, education.cgpa, { duration: 1.4, ease: EASE, onUpdate: (v) => setCgpa(v) })
    return () => c.stop()
  }, [inView, reduce])

  return (
    <section className="section" id="education">
      <div className="wrap">
        <Reveal>
          <div className="sechead big">
            <span className="idx">05</span>
            <h2>Education</h2>
          </div>
        </Reveal>
        <Reveal>
          <div className="educard" ref={ref}>
            <div className="edu-main">
              <div className="theme-chip">{education.dates}</div>
              <h3>{education.school}</h3>
              <p>
                {education.degree} · {education.location}
              </p>
            </div>
            <div className="edu-cgpa">
              <div className="cgpa-num">{cgpa.toFixed(2)}</div>
              <div className="cgpa-label">CGPA / 10</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
