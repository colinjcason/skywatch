import { useState, useContext } from 'react';
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
import { ListItemAvatar, Typography } from '@mui/material';

const Sidebar = () => {
  const { currentUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const signInWithGooglePopup = async () => {
    await signInWithGoogle()
  }

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  const list = () => (
    <Box
      className='sidebar-container'
      display='flex'
      alignItems='center'
      // justifyContent='center'
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
            {['Phoenix', 'Dallas', 'New York', 'Big Bear'].map(text => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
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