import { usePageVisibility } from '../../hooks/usePageVisibility'

export default function OceanBackground() {
  const visible = usePageVisibility()

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse at 20% 50%, #0d1f3c 0%, #0a0e1a 50%, #060810 100%)',
        backgroundSize: '200% 200%',
        animation: visible ? 'oceanBreathe 8s ease-in-out infinite' : 'none',
      }}
    >
      {/* Bioluminescent glow accent top-right */}
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
        }}
      />
      {/* Deep violet accent bottom-left */}
      <div
        className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(123,47,255,0.05) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
