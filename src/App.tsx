import { useState } from 'react'
import { FullScreenSignup } from '@/components/ui/full-screen-signup'
import { BackgroundDark } from '@/components/ui/background-snippets'

function App() {
  const [isDark, setIsDark] = useState(true)

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: isDark ? undefined : '#ffffff' }}>
      {isDark && <BackgroundDark />}
      <FullScreenSignup isDark={isDark} onToggleTheme={() => setIsDark(prev => !prev)} />
    </div>
  )
}

export default App
