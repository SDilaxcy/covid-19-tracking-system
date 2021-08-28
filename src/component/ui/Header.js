import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withRouter } from 'react-router-dom';

import { isAuthenticated, signout } from '../../auth';

import logo from '../assets/logo.png';
import { Typography } from '@material-ui/core';

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}
const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      height: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      height: '1.25em',
    },
  },
  logo: {
    height: '10em',
    padding: '1em',
    [theme.breakpoints.down('md')]: {
      height: '6em',
    },
    [theme.breakpoints.down('xs')]: {
      height: '5.5em',
    },
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
  },
  button: {
    borderRadius: '2px',
    marginLeft: 'auto',
    marginRight: '25px',
    height: '45px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  logoContainer: {
    padding: 0,
  },
  menu: {
    backgroundColor: theme.palette.common.UIBlue,
    color: 'white',
  },
  menuItem: {
    ...theme.typography.tab,
    color: 'white',
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  drawerIcon: {
    height: '50px',
    widht: '50px',
    color: 'white',
  },
  drawer: {
    backgroundColor: theme.palette.common.UIBlue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: 'white',
    opacity: 0.7,
  },
  drawerEstimate: {
    backgroundColor: theme.palette.common.UIOrnage,
  },
  drawerItemSelected: {
    '& .MuiListItemText-root': {
      opacity: 1,
    },
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },
}));
const Header = ({ history }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(false);

  const { data } = isAuthenticated();

  useEffect(() => {}, [history]);

  const tabs = (
    <React.Fragment>
      {isAuthenticated() ? (
        <React.Fragment>
          <div
            style={{
              marginLeft: 'auto',
              marginRight: '2em',
            }}
          >
            <div>
              <Typography variant='subtitle2'>
                Welcome {data.user.firstname}
              </Typography>
            </div>
            <div>
              <Button
                variant='contained'
                onClick={() =>
                  signout(() => {
                    history.push('/');
                  })
                }
                color='secondary'
                style={{ color: 'white', marginLeft: '3em' }}
              >
                LOGOUT
              </Button>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <Button
          variant='contained'
          component={Link}
          to='/'
          color='secondary'
          className={classes.button}
        >
          LOGIN
        </Button>
      )}
    </React.Fragment>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />

        <List disablePadding>
          <ListItem
            classes={{
              root: classes.drawerEstimate,
              selected: classes.drawerItemSelected,
            }}
            component={Link}
            to='/'
            divider
            button
            onClick={() => setOpenDrawer(false)}
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar className={classes.appbar}>
          <Toolbar disableGutters>
            <Button component={Link} to='/' className={classes.logoContainer}>
              <img
                alt='company logo'
                className={classes.logo}
                src={logo}
                style={{ resize: 'block' }}
              />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
};

export default withRouter(Header);
