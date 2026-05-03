import { useMemo } from 'react'
import { usePageVisibility } from '../../hooks/usePageVisibility'

interface Particle {
  id: number
  top: string
  left: string
  size: number
  delay: string
  duration: string
  color: string
}

const COLORS = [
  'rgba(0, 212, 255, 0.6)', // cyan
  'rgba(255, 215, 0, 0.5)', // gold
  'rgba(192, 192, 255, 0.5)', // silver
  'rgba(123, 47, 255, 0.4)', // violet
  'rgba(0, 229, 160, 0.4)', // seafoam
]

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    delay: `${(Math.random() * 4).toFixed(2)}s`,
    duration: `${(Math.random() * 3 + 2).toFixed(2)}s`,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }))
}

interface Props {
  count?: number
}

export default function GlitterParticle({ count }: Props) {
  const visible = usePageVisibility()

  // Default count: 60 on mobile (≤640px), 100 on desktop
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640
  const particleCount = count ?? (isMobile ? 60 : 100)

  // Particles are stable across renders (memo with no deps = generated once)
  const particles = useMemo(() => generateParticles(particleCount), [particleCount])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            backgroundColor: p.color,
            animationName: visible ? 'shimmer' : 'none',
            animationDuration: p.duration,
            animationDelay: p.delay,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
        />
      ))}
    </div>
  )
}
