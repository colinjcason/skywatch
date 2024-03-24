import { TextField, Button, Grid } from '@mui/material';

const SearchBox = ({ searchField, handleSearch, handleChange }) => {
  return (
    <form>
      <Grid container spacing={2} alignItems="center" direction='column'>
        <Grid item xs={8}>
          <TextField
            className='input'
            fullWidth
            type='search'
            placeholder='Enter location'
            value={searchField}
            onChange={handleChange}
            name='searchField'
            sx={{
              color: 'var(--color-accent)',
              '& input': {
                padding: '.5rem',
                textAlign: 'center',
              },
              '& .MuiInputBase-root': {
                borderRadius: '.4rem',
              },

              '& .MuiOutlinedInput-root': {
                borderRadius: '.4rempx',
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--bg-color)',
              },
            }}
          />
        </Grid>
        <Grid item>
          <Button
            type='submit'
            variant="contained"
            onClick={handleSearch}
            sx={{
              background: 'var(--color-accent)',
              '&:hover': {
                backgroundColor: 'var(--color-accent)',
                opacity: '.8',
              },
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default SearchBox