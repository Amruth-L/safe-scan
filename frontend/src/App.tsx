import { useState } from 'react'
import { useSession, signOut } from './lib/auth-client'
import AuthModal from './components/AuthModal'
import './App.css'

type ModalState = 'login' | 'register' | null

function LeafMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.58.9 9.2A7.001 7.001 0 0 1 11 20z" />
      <path d="M19 2c-2.26 4.33-5.27 7.14-8 8" />
    </svg>
  )
}

export default function App() {
  const { data: session } = useSession()
  const [modal, setModal] = useState<ModalState>(null)

  return (
    <>
      {/* Navbar */}
      <nav id="main-nav">
        {/* Brand */}
        <a id="brand-link" className="brand" href="/" aria-label="SafeScan home">
          <LeafMark />
          <span>SafeScan</span>
        </a>

        {/* Right side */}
        <div className="nav-right">
          {session ? (
            <>
              <span className="nav-user">{session.user.email}</span>
              <button
                id="signout-btn"
                className="btn-ghost"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <button
                id="login-btn"
                className="btn-ghost"
                onClick={() => setModal('login')}
              >
                Log in
              </button>
              <button
                id="register-btn"
                className="btn-green"
                onClick={() => setModal('register')}
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      {modal && (
        <AuthModal
          defaultTab={modal}
          onClose={() => setModal(null)}
        />
      )}
    </>
  )
}
