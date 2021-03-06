import React, {useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import {withRouter} from "react-router-dom";
import {
  DashboardButton,
  EditorButton,
  SettingsButton,
  LogoutButton,
  SchemaPageButton,
  FeedbackButton} from "./buttons";
import {ROOT_URL, SETTINGS_URL} from "../../../common/costants/urls";
import {authenticationService} from "../../../common/services/authenticationService";
import {atom} from "recoil";
import {useSetRecoilState} from "recoil/dist";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      textAlign: 'center',
    },
  },
  grow: {
    flexGrow: 1,
  },
  leftSection: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
      display: 'flex',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(1),
      width: 'auto',
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

export const navBarHeightState = atom({
  key: 'navBarHeight', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

function NavBar(props) {

  const navBarRef = useRef(null);
  const classes = useStyles();
  const {history} = props;
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const setNavBarHeight = useSetRecoilState(navBarHeightState);

  useEffect(() => {
    setNavBarHeight(navBarRef.current.clientHeight);
  }, [setNavBarHeight]);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };



  const mobileMenuId = 'primary-navbar-menu-mobile';
  const menuId = 'primary-navbar-menu-desktop';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => history.push(SETTINGS_URL)}>
        <SettingsButton menuId={mobileMenuId}/>
        <p>Settings</p>
      </MenuItem>
      <MenuItem onClick={() => console.log("click feedback")}>
        <FeedbackButton menuId={mobileMenuId}/>
        <p>Feedback</p>
      </MenuItem>
      <MenuItem onClick={() => {
        authenticationService.logout();
        history.push(ROOT_URL);
      }}>
        <LogoutButton menuId={mobileMenuId}/>
        <p>Log Out</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div ref={navBarRef} className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <div className={classes.leftSection}>
            <DashboardButton menuId={menuId}/>
            <EditorButton menuId={menuId}/>
            <SchemaPageButton menuId={menuId}/>
          </div>
          <Typography variant="h6" className={classes.title} noWrap>Grask</Typography>
          <div className={classes.sectionDesktop}>
            <SettingsButton menuId={menuId}/>
            <FeedbackButton menuId={menuId}/>
            <LogoutButton menuId={menuId}/>
          </div>
          <div className={classes.sectionMobile}>
            <div>
              <DashboardButton menuId={menuId}/>
              <EditorButton menuId={menuId}/>
              <SchemaPageButton menuId={menuId}/>
            </div>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      <Toolbar variant="dense"/>
    </div>
  );
}

export default withRouter(NavBar);
