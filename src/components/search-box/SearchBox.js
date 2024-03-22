import React from 'react'
import './search-box.css'

const SearchBox = ({ searchField, handleSearch, handleChange }) => {
  return (
    <form className='search-box-container'>
      <input 
          type='search'
          placeholder='Enter location'
          value={searchField}
          onChange={handleChange}
          name='searchField'
        />
        <button onClick={handleSearch} type='submit'>Search</button>
    </form>
  )
}

export default SearchBox