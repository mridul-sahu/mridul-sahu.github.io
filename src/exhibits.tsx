import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useInView, animate } from 'motion/react'
import { stats, type Stat as StatT } from './data'

const EASE = [0.22, 1, 0.36, 1] as const

/* light-on-dark palette for screen-panel diagrams */
const C = {
  on: '#f4f4f2',
  d1: '#cfcfcd',
  d2: '#9a9a98',
  d3: '#6f6f6d',
  hair: 'rgba(244,244,242,0.18)',
}
const OWNER = [C.on, C.d1, C.d2, C.d3]

/* ===================== count-up stats ===================== */
function StatCell({ s }: { s: StatT }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  const [n, setN] = useState(reduce ? s.value : 0)

  useEffect(() => {
    if (reduce || !inView) return
    const controls = animate(0, s.value, {
      duration: 1.5,
      ease: EASE,
      onUpdate: (v) => setN(v),
    })
    return () => controls.stop()
  }, [inView, s.value, reduce])

  return (
    <div className="stat" ref={ref}>
      <div className="stat-num">
        {s.prefix ?? ''}
        {n.toFixed(s.decimals ?? 0)}
        {s.suffix ?? ''}
      </div>
      <div className="stat-label">{s.label}</div>
      {s.sub && <div className="stat-sub">{s.sub}</div>}
    </div>
  )
}

export function StatBand() {
  return (
    <div className="statband">
      {stats.map((s) => (
        <StatCell key={s.label} s={s} />
      ))}
    </div>
  )
}

/* ===================== shared diagram chrome ===================== */
function Dash({ d, active, delay = 0 }: { d: string; active: boolean; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={C.on}
      strokeWidth={1.1}
      strokeDasharray="4 4"
      animate={reduce ? { opacity: active ? 0.7 : 0 } : { opacity: active ? 0.75 : 0, strokeDashoffset: active ? [0, -16] : 0 }}
      transition={reduce ? { duration: 0.4 } : { opacity: { duration: 0.4 }, strokeDashoffset: { duration: 1.2, repeat: Infinity, ease: 'linear', delay } }}
    />
  )
}

/* ===================== 1 · sharding-driven load (interactive) ===================== */
export function ShardingDiagram() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-18% 0px' })
  const [mode, setMode] = useState<'before' | 'after'>(reduce ? 'after' : 'before')
  const [touched, setTouched] = useState(false)

  // auto-advance once when scrolled into view
  useEffect(() => {
    if (reduce || touched || !inView) return
    const t = setTimeout(() => setMode('after'), 1900)
    return () => clearTimeout(t)
  }, [inView, touched, reduce])

  const segX = (i: number) => 60 + i * 72
  const segCx = (i: number) => segX(i) + 33
  const procX = [120, 268, 416, 564]
  const ownerBefore = (i: number) => Math.floor(i / 2)
  const ownerAfter = (i: number) => i % 4
  const owner = mode === 'before' ? ownerBefore : ownerAfter

  const set = (m: 'before' | 'after') => {
    setTouched(true)
    setMode(m)
  }

  return (
    <div className="diagram" ref={ref}>
      <div className="toggle" role="tablist" aria-label="loader comparison">
        <button className={mode === 'before' ? 'on' : ''} onClick={() => set('before')} role="tab" aria-selected={mode === 'before'}>
          Old path
        </button>
        <button className={mode === 'after' ? 'on' : ''} onClick={() => set('after')} role="tab" aria-selected={mode === 'after'}>
          Sharding-driven
        </button>
      </div>

      <svg viewBox="0 0 660 280" width="100%" aria-hidden>
        {/* labels */}
        <text x="60" y="34" className="dlabel" fill={C.d2}>checkpoint file · object storage</text>

        {/* file segments */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.rect
            key={i}
            x={segX(i)}
            y={44}
            width={66}
            height={26}
            rx={3}
            animate={{ fill: OWNER[owner(i)] }}
            transition={{ duration: 0.5, ease: EASE }}
            opacity={0.92}
          />
        ))}

        {/* read arrows — crossfaded per mode */}
        {(['before', 'after'] as const).map((m) => (
          <motion.g key={m} animate={{ opacity: mode === m ? 1 : 0 }} transition={{ duration: 0.4 }}>
            {Array.from({ length: 8 }).map((_, i) => {
              const o = m === 'before' ? ownerBefore(i) : ownerAfter(i)
              return (
                <line key={i} x1={segCx(i)} y1={72} x2={procX[o]} y2={196} stroke={C.hair} strokeWidth={1} />
              )
            })}
          </motion.g>
        ))}

        {/* reshard collective hub — before only */}
        <motion.g animate={{ opacity: mode === 'before' ? 1 : 0 }} transition={{ duration: 0.45 }}>
          {procX.map((x, i) => (
            <Dash key={i} d={`M${x} 196 Q ${(x + 330) / 2} 120 330 138`} active={mode === 'before' && !reduce} delay={i * 0.18} />
          ))}
          <circle cx={330} cy={138} r={17} fill="none" stroke={C.on} strokeWidth={1.2} />
          <text x={330} y={143} className="dsigma" fill={C.on}>
            Σ
          </text>
          <text x={330} y={172} className="dlabel" fill={C.d1} textAnchor="middle">
            jnp.sum reshard
          </text>
        </motion.g>

        {/* processes */}
        {procX.map((x, j) => (
          <g key={j}>
            <rect x={x - 42} y={196} width={84} height={40} rx={5} fill="none" stroke={C.hair} strokeWidth={1} />
            <rect x={x - 30} y={206} width={12} height={20} rx={2} fill={OWNER[j]} opacity={0.92} />
            <rect x={x - 14} y={206} width={12} height={20} rx={2} fill={OWNER[j]} opacity={0.5} />
            <text x={x + 14} y={221} className="dproc" fill={C.d1}>
              P{j}
            </text>
          </g>
        ))}
        <text x="60" y="262" className="dlabel" fill={C.d2}>processes · each owns a device shard</text>
      </svg>

      <div className="dcaps">
        {mode === 'before' ? (
          <>
            <span className="cap warn">file-contiguous slabs</span>
            <span className="cap warn">reshard collective / tensor</span>
            <span className="cap warn">recompiled / tensor</span>
          </>
        ) : (
          <>
            <span className="cap good">byte-range reads from jax.sharding</span>
            <span className="cap good">no collective</span>
            <span className="cap good">~1× cluster I/O</span>
          </>
        )}
      </div>
    </div>
  )
}

/* ===================== 2 · single-replica restore + broadcast ===================== */
export function BroadcastDiagram() {
  const reduce = useReducedMotion()
  const devices = [
    [430, 40],
    [520, 40],
    [430, 96],
    [520, 96],
    [430, 152],
    [520, 152],
    [430, 208],
    [520, 208],
  ] as const
  const replica: [number, number] = [250, 124]

  return (
    <div className="diagram">
      <svg viewBox="0 0 600 250" width="100%" aria-hidden>
        {/* storage */}
        <rect x="40" y="100" width="78" height="50" rx="8" fill="none" stroke={C.hair} />
        <ellipse cx="79" cy="100" rx="39" ry="8" fill="none" stroke={C.hair} />
        <text x="79" y="172" className="dlabel" fill={C.d2} textAnchor="middle">
          storage
        </text>

        {/* edges */}
        <line x1="118" y1="125" x2={replica[0] - 26} y2={replica[1]} stroke={C.hair} strokeWidth={1.1} />
        {devices.map(([x, y], i) => (
          <line key={i} x1={replica[0] + 26} y1={replica[1]} x2={x - 13} y2={y} stroke={C.hair} strokeWidth={1} />
        ))}

        {/* single read pulse: storage -> replica */}
        {!reduce && (
          <motion.circle
            r="4"
            fill={C.on}
            initial={{ cx: 118, cy: 125 }}
            animate={{ cx: [118, replica[0] - 26], cy: [125, replica[1]], opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 1.4, ease: EASE }}
          />
        )}

        {/* replica */}
        <circle cx={replica[0]} cy={replica[1]} r="22" fill="none" stroke={C.on} strokeWidth={1.4} />
        <circle cx={replica[0]} cy={replica[1]} r="5" fill={C.on} />
        <text x={replica[0]} y={replica[1] + 40} className="dlabel" fill={C.d1} textAnchor="middle">
          replica 0
        </text>

        {/* broadcast pulses: replica -> devices */}
        {devices.map(([x, y], i) =>
          reduce ? null : (
            <motion.circle
              key={i}
              r="3.2"
              fill={C.d1}
              initial={{ cx: replica[0] + 26, cy: replica[1] }}
              animate={{ cx: [replica[0] + 26, x - 13], cy: [replica[1], y], opacity: [0, 1, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 1.5, delay: 1 + i * 0.05, ease: EASE }}
            />
          ),
        )}

        {/* devices */}
        {devices.map(([x, y], i) => (
          <g key={i}>
            <rect x={x - 13} y={y - 11} width={26} height={22} rx={4} fill="none" stroke={C.hair} strokeWidth={1} />
            <rect x={x - 7} y={y - 5} width={14} height={10} rx={2} fill={OWNER[i % 4]} opacity={0.85} />
          </g>
        ))}
      </svg>
      <div className="dcaps">
        <span className="cap good">storage reads&nbsp;&nbsp;N× → 1×</span>
        <span className="cap good">faster restart</span>
      </div>
    </div>
  )
}

/* ===================== 3 · async checkpoint save (timeline) ===================== */
export function SaveDiagram() {
  const reduce = useReducedMotion()
  return (
    <div className="diagram">
      <svg viewBox="0 0 600 230" width="100%" aria-hidden>
        {/* BEFORE row */}
        <text x="20" y="36" className="dlabel" fill={C.d2}>before · main thread</text>
        <rect x="20" y="46" width="120" height="26" rx="4" fill={C.d3} opacity={0.55} />
        <rect x="142" y="46" width="190" height="26" rx="4" fill="none" stroke={C.on} strokeDasharray="5 4" />
        <text x="237" y="63" className="dseg" fill={C.on} textAnchor="middle">
          dir-create blocks
        </text>
        <rect x="334" y="46" width="90" height="26" rx="4" fill={C.d3} opacity={0.55} />

        {/* AFTER row */}
        <text x="20" y="120" className="dlabel" fill={C.d2}>after · main thread</text>
        <rect x="20" y="130" width="120" height="26" rx="4" fill={C.d3} opacity={0.55} />
        <rect x="142" y="130" width="90" height="26" rx="4" fill={C.on} opacity={0.9} />
        <text x="187" y="147" className="dseg" fill="#0b0b0c" textAnchor="middle">
          save
        </text>

        {/* async lane */}
        <text x="20" y="186" className="dlabel" fill={C.d2}>async (off critical path)</text>
        <rect x="142" y="196" width="190" height="22" rx="4" fill="none" stroke={C.hair} />
        <text x="237" y="211" className="dseg" fill={C.d1} textAnchor="middle">
          dir-create · CommitFuture
        </text>

        {/* saved bracket */}
        <line x1="232" y1="130" x2="232" y2="156" stroke={C.on} strokeWidth={1} />
        <line x1="334" y1="46" x2="334" y2="156" stroke={C.on} strokeWidth={1} strokeDasharray="3 3" opacity={0.5} />
        <path d="M232 168 H334" stroke={C.on} strokeWidth={1} />
        <text x="283" y="183" className="dseg" fill={C.on} textAnchor="middle">
          −30–50%
        </text>

        {/* playhead */}
        {!reduce && (
          <motion.line
            y1="40"
            y2="160"
            stroke={C.on}
            strokeWidth={1}
            opacity={0.4}
            initial={{ x1: 20, x2: 20 }}
            animate={{ x1: [20, 424], x2: [20, 424] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </svg>
      <div className="dcaps">
        <span className="cap good">30–50% less blocking</span>
        <span className="cap good">Perfy award</span>
      </div>
    </div>
  )
}
