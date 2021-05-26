import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles, Button, Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import LockoutlinedIcon from '@material-ui/icons/LockOutlined';
import CommuteOutlinedIcon from '@material-ui/icons/CommuteOutlined';
import { MenuProps } from '@material-ui/core/Menu';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Menu
        </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClick={handleClose}
      >
        <Link to='/'>
          <StyledMenuItem>
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </StyledMenuItem>
        </Link>

        <Link to='/signup'>
          <StyledMenuItem>
            <ListItemIcon>
              <CommuteOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Up" />
          </StyledMenuItem>
        </Link>

        <Link to='/signin'>
          <StyledMenuItem>
            <ListItemIcon>
              <LockoutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Sign In" />
          </StyledMenuItem>
        </Link>
      </StyledMenu>
    </div>
  );
}