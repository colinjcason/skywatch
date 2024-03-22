import { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { UserContext } from '../../contexts/user.context'
import { signInWithGoogle, signOutUser } from '../../utils/firebase'
import './sidebar.css'
import { useGetWeather } from '../../hooks/useGetWeather';
import { fetchFavorites, deleteFavoriteCity, listenForFavoritesChanges } from '../../utils/firebase';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Sidebar = ({ updateCity }) => {
  const { currentUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [city, setCity] = useState('')
  const { loading, data, error } = useGetWeather(city)
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getUserFavorites = async () => {
      try {
        const favorites = await fetchFavorites(currentUser)
        setFavorites(favorites);

        const unsubscribe = listenForFavoritesChanges(currentUser, setFavorites);

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    }

    getUserFavorites();
  }, [currentUser]);

  const signInWithGooglePopup = async () => {
    await signInWithGoogle()
  }

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    
    setIsOpen(open);
  };

  const handleUpdate = (city) => {
    setCity(city);
    updateCity(city)
  }

  const list = () => (
    <Box
      className='sidebar-container'
      display='flex'
      alignItems='center'
      minHeight='100%'
      paddingTop='10px'
      flexDirection='column'
      sx={{ width: 200 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {currentUser ? (
        <>
          <Avatar
            alt='user avatar'
            src={currentUser.photoURL}
          />

          <List>
            {favorites ? (
              favorites.length > 0 ?
                favorites.map((favorite) => (
                  <ListItem key={favorite.cityId} disablePadding>
                    <ListItemButton onClick={() => handleUpdate(favorite.city)}>
                      <ListItemText primary={favorite.city.toUpperCase()} />
                      <DeleteOutlineOutlinedIcon 
                      sx={{ marginLeft: '20px', fontSize: '20px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFavoriteCity(currentUser, favorite.cityId)}}
                       />
                    </ListItemButton>
                  </ListItem>
                )) :
                <Box>No saved cities.</Box>
            ) : (
              <Box>Loading...</Box>
            )}
          </List>

          <Button
            variant='outline'
            onClick={signOutUser}>
            Sign Out
          </Button>
        </>
      ) : (
        <List>
          <Button
            variant='outline'
            onClick={signInWithGooglePopup}>
            Sign In
          </Button>
        </List>
      )}
    </Box>
  );

  return (
    <div className='menu-icon'>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleDrawer(true)}
        sx={{ mr: 2, ...(isOpen && { display: 'none' }) }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </div>
  );
}

export default Sidebar