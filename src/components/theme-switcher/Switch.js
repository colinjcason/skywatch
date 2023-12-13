import React from 'react'
import './theme-switch.css'

const Switch = ({ handleThemeSelection, theme }) => {
  return (
    <label className="switch">
      <input 
        type="checkbox" 
        onClick={handleThemeSelection} 
        defaultChecked={theme === 'dark' ? true : false}
      />
      <span className="slider round"></span>
      <p>{theme.toUpperCase()}</p>
    </label>
  )
}

export default Switch