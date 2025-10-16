import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import WeatherTest from './components/WeatherTest'    // test component to check API

function App() {

  return (
    <div className="App">
      <h1> Weather App Development</h1>
      <WeatherTest />     {/*Just test componen for nowt*/}
    </div>
  )
}

export default App
