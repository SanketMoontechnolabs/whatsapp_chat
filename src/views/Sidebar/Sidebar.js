import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
// import NotificationsIcon from "@mui/icons-material/Notifications";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Fade, Grid, Menu, MenuItem } from "@mui/material";
import { GoogleLogout } from "react-google-login";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { store } from "../../redux/store";
import Notification from "../../component/notification/Notification";
import { URLS } from "../../API/UrlList";


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("xs")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  position: "fixed",
  top: 0,
  paddingRight:
    "1                                                                                                                                                                                                                                                                                                                                                                    0px",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    // bgcolor: "#ffffff",
  }),
  ...{
    display: "flex",
    ...theme.mixins.toolbar,
    width: !open ? `calc(100% - ${drawerWidth}px)` : `calc(100% - 64px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));



export default function Sidebar({ children }) {
  
  const clientid =
    "420808172961-qh7r67c4li8puci68jvg5l373c46k2dp.apps.googleusercontent.com";

  const [open, setOpen] = React.useState(false);
  const [showNotification, setShowNotification] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const { userData } = store.getState().AuthReducer;
  const openHeaderMenu = Boolean(anchorEl);

  const location = useLocation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const onsuccess = () => {
    console.log("Log Out Sucessfully");
  };

  const logout = () => {
    onsuccess();

    localStorage.clear();
    setTimeout(() => {
      window.location.replace(`${window.location.origin}/#/login`);
      window.location.reload();
    }, 100);
  };

  const navigateArr = useMemo(
    () => [
      {
        name: "Dashboard",
        route: "/dashboard",
      },
      {
        name: "Whatsapp",
        route: "/whatsapp",
      },
      {
        name: "Send email",
        route: "/email",
      },
      {
        name: "Drafts",
        route: "/drafts",
      },
    ],
    []
  );

  const currentRoute = React.useMemo(() => {
    return navigateArr.find((item) => item.route === location.pathname);
  }, [location.pathname, navigateArr]);

  React.useEffect(() => {
    if (currentRoute) {
      setActiveIndex(navigateArr.indexOf(currentRoute));
    }
  }, [currentRoute, navigateArr]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      <AppBar className="header" open={open}>
        <div className="header-menu">
          <div className="flex items-center mr-[-12px]">
            <Notification
              setShowNotification={setShowNotification}
              showNotification={showNotification}
            />
          </div>

          <IconButton
            className="header_logout_button "
            id="fade-button"
            aria-controls={openHeaderMenu ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openHeaderMenu ? "true" : undefined}
            onClick={handleClick}
          >
            <Box sx={{ textAlign: "center", alignItems: "center" }}>
              <img
                className=" h-12 w-12  rounded-full"
                src={`${URLS?.BASE_URL}/${userData?.profile_image}`}
                alt=""
              />

              <Grid sx={{ display: "none" }}>
                <GoogleLogout
                  clientId={clientid}
                  buttonText={"Logout"}
                  onLogoutSuccess={onsuccess}
                ></GoogleLogout>
              </Grid>
            </Box>
          </IconButton>

          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={openHeaderMenu}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </div>
      </AppBar>

      <Drawer
        className="drawer_bg"
        variant="permanent"
        open={!open}
      >
        <DrawerHeader>
          <IconButton
          className="open_menu_icon"
            style={{ color: "white" }}
            onClick={!open ? handleDrawerOpen : handleDrawerClose}
          >
            {!open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider className="dividerColor" />
        <List>
          {navigateArr.map((text, index) => (
            <Link key={text.name} to={text.route}>
              <ListItem
              className="active_list"
                key={text.name}
                disablePadding
                sx={{
                  display: "block",
                  backgroundColor:
                    index === activeIndex ? "#343541" : "transparent",
                }}
              >
                <ListItemButton
                  className="sidebar_text"
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    className="sidebar_text"
                    sx={{
                      minWidth: 0,

                      mr: !open ? 5 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={text.name}
                    sx={{ opacity: open ? 0 : 1 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider className="dividerColor" />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                className="sidebar_text"
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  className="sidebar_text"
                  sx={{
                    minWidth: 0,

                    mr: !open ? 5 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 0 : 1 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"

        sx={{
          flexGrow: 3,
          p: 5,
          mt: 8,
          backgroundColor:"#F7F7F8",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* <DrawerHeader /> */}
        {children}
      </Box>
    </Box>
  );
}
Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};
