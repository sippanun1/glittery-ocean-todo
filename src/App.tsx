import OceanBackground from './components/ui/OceanBackground'
import GlitterParticle from './components/ui/GlitterParticle'

export default function App() {
  return (
    <>
      <OceanBackground />
      <GlitterParticle />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-ocean-accent">🌊 Glittery Ocean</h1>
          <p className="text-ocean-text-muted">Your daily to-do list</p>
        </div>
      </div>
    </>
  )
}
