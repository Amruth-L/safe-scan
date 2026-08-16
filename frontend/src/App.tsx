import { useEffect, useState } from 'react'
import './App.css'

type ApiState = 'checking' | 'online' | 'offline'

function ShieldMark() {
  return (
    <svg viewBox="0 0 64 72" aria-hidden="true">
      <path d="M32 3 57 12v19c0 18-10.6 31.8-25 38C17.6 62.8 7 49 7 31V12L32 3Z" />
      <path d="m20 35 8 8 17-19" />
    </svg>
  )
}

function App() {
  const [apiState, setApiState] = useState<ApiState>('checking')

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/health', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('API unavailable')
        setApiState('online')
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setApiState('offline')
      })

    return () => controller.abort()
  }, [])

  return (
    <main>
      <nav aria-label="Main navigation">
        <a className="brand" href="/" aria-label="SafeScan home">
          <span className="brand-mark"><ShieldMark /></span>
          <span>SafeScan</span>
        </a>
        <div className={`api-state ${apiState}`} role="status">
          <span className="status-dot" />
          API {apiState}
        </div>
      </nav>

      <section className="hero">
        <div className="eyebrow"><span>01</span> Secure inspection platform</div>
        <h1>Scan clearly.<br /><em>Act safely.</em></h1>
        <p className="intro">
          Your SafeScan workspace is ready. React is serving the interface and
          Express is standing by for your first scan.
        </p>
        <div className="stack-grid" aria-label="Project stack">
          <article>
            <span className="card-number">FRONT / 5173</span>
            <h2>Vite + React</h2>
            <p>Fast refresh, TypeScript, and a clean foundation for the scanner UI.</p>
          </article>
          <article>
            <span className="card-number">API / 3000</span>
            <h2>Express + TS</h2>
            <p>A strict TypeScript API with health checks and production builds.</p>
          </article>
        </div>
      </section>

      <footer>
        <span>System initialized</span>
        <span className="rule" />
        <code>safe-scan/v1</code>
      </footer>
    </main>
  )
}

export default App
