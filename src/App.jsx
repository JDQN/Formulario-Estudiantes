import React from "react"
import { MainTemplates } from "./templates/MainTemplates"
import { Login } from "./pages/Login"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<MainTemplates />} />
      </Routes>
    </Router>
  )
}

export default App
