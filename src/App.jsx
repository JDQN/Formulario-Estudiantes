import React from "react"
import { MainTemplates } from "./templates/MainTemplates"
// import { Login } from "./pages/Login"
import { LoginFormik } from "./pages/LoginFormik"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

function App() {

  return (
    <Router>
      <Routes>
        //Este es un login sin formik la forma numero uno pero no es la mejor
        {/* <Route path="/login" element={<Login />} /> */}

        //Este es un login con formik la forma numero dos y es la mejor MAS CORTA
        <Route path="/login" element={<LoginFormik />} />

        //Aqui tenemos el template principal
        <Route path="/*" element={<MainTemplates />} />
      </Routes>
    </Router>
  )
}

export default App
