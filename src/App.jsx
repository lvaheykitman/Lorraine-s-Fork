import { Routes, Route } from 'react-router-dom'
import LayoutWithMainNav from './components/LayoutWithMainNav'
import RosterOverview from './pages/RosterOverview'
import InjuryReview from './pages/InjuryReview'
import TrainingDevelopment from './pages/TrainingDevelopment'
import Notifications from './pages/Notifications'

function App() {
  return (
    <LayoutWithMainNav>
      <Routes>
        <Route path="/" element={<RosterOverview />} />
        <Route path="/roster-overview" element={<RosterOverview />} />
        <Route path="/injury-review" element={<InjuryReview />} />
        <Route path="/training-development" element={<TrainingDevelopment />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </LayoutWithMainNav>
  )
}

export default App