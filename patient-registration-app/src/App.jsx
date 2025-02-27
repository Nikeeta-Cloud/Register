import { Routes, Route } from 'react-router-dom'
import PatientRegistration from './components/PatientRegistration'
import PatientList from './components/PatientList'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  return (
    <div className="app-container">
      {/* <Navbar /> */}
      <div className="content-container">
        <Routes>
      
          {/* <Route path="/" element={<PatientList />} /> */}
          <Route path="/register" element={<PatientRegistration />} />
        </Routes>
      </div>
    </div>
  )
}

export default App