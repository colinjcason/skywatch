import React from 'react'
import './search-box.css'

const SearchBox = ({ searchField, handleSearch, handleChange }) => {
  return (
    <div className='search-box-container'>
      <input 
          type='search'
          placeholder='Enter location'
          value={searchField}
          onChange={handleChange}
          name='searchField'
        />
        <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default SearchBox