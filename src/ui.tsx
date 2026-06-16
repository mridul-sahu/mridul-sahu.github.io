import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

export const EASE = [0.22, 1, 0.36, 1] as const

/* inline rich text: **bold** and `mono` */
export function rich(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) return <b key={i}>{p.slice(2, -2)}</b>
    if (p.startsWith('`') && p.endsWith('`'))
      return (
        <span className="mono" key={i}>
          {p.slice(1, -1)}
        </span>
      )
    return <span key={i}>{p}</span>
  })
}

export function Reveal({ children, delay = 0, y = 18 }: { children: ReactNode; delay?: number; y?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}
