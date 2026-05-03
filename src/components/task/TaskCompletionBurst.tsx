import { AnimatePresence, motion } from 'framer-motion'

interface Particle {
  id: number
  angle: number
  distance: number
  color: string
}

const COLORS = ['#00d4ff', '#ffd700', '#c0c0ff', '#00e5a0', '#7b2fff']

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (360 / count) * i + Math.random() * 20 - 10,
    distance: 28 + Math.random() * 20,
    color: COLORS[i % COLORS.length],
  }))
}

const PARTICLES = makeParticles(10)

interface Props {
  show: boolean
  onDone: () => void
}

export default function TaskCompletionBurst({ show, onDone }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-start pl-3 z-10">
          {PARTICLES.map((p) => {
            const rad = (p.angle * Math.PI) / 180
            const x = Math.cos(rad) * p.distance
            const y = Math.sin(rad) * p.distance
            return (
              <motion.span
                key={p.id}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x, y, opacity: 0, scale: 0.3 }}
                exit={{}}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                onAnimationComplete={p.id === 0 ? onDone : undefined}
                style={{
                  position: 'absolute',
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  backgroundColor: p.color,
                  boxShadow: `0 0 6px ${p.color}`,
                }}
              />
            )
          })}
        </div>
      )}
    </AnimatePresence>
  )
}
