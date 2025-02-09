import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home/home'
import Settings from './settings/settings'
import Game from './game/game'
import Navbar from './header/navbar'
import { SettingsProvider } from './contexts/settingsContext'

function App() {
  return (
    <>
      <SettingsProvider>
        <Router>
          <Navbar />
          <Routes>
          <Route path="/flappyBird-react-app" element={<FlappyBird />} />
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </SettingsProvider>
    </>
  )
}

export default App
