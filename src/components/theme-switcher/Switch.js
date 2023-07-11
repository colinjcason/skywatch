import React from 'react'
import './theme-switch.css'

const Switch = ({ handleThemeSelection, theme }) => {
  return (
    <label class="switch">
      <input type="checkbox" onClick={handleThemeSelection} />
      <span class="slider round"></span>
      <p>{theme.toUpperCase()}</p>
    </label>
  )
}

export default Switch