import * as React from "react"
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List"
import InboxIcon from "material-ui-icons/MoveToInbox"
import DraftsIcon from "material-ui-icons/Drafts"
import StarIcon from "material-ui-icons/Star"
import SendIcon from "material-ui-icons/Send"
import MailIcon from "material-ui-icons/Mail"
import DeleteIcon from "material-ui-icons/Delete"
import ReportIcon from "material-ui-icons/Report"
import withStyles, { WithStyles, StyleRulesCallback } from "material-ui/styles/withStyles"
import Grid from "material-ui/Grid"
import * as classNames from "classnames"
import Drawer from "material-ui/Drawer"
import AppBar from "material-ui/AppBar"
import Toolbar from "material-ui/Toolbar"
import List from "material-ui/List"
import Typography from "material-ui/Typography"
import Divider from "material-ui/Divider"
import IconButton from "material-ui/IconButton"
import MenuIcon from "material-ui-icons/Menu"
import ArrowBackIcon from "material-ui-icons/ArrowBack"
import AccountCircle from "material-ui-icons/AccountCircle"
import Menu, { MenuItem } from "material-ui/Menu"
import { inject, observer } from "mobx-react"
import { StoreRoot } from "../stores/storeRoot"
import Tabs, { Tab } from "material-ui/Tabs"
import * as _ from "lodash"

/* import Image from "material-ui-image" */

const cogliteLogo = require("../assets/coglite-logo-dark-gold-box.png")

const drawerWidth = 240

const styles: StyleRulesCallback<any> = theme => ({
  gridRoot: {
    flexGrow: 1,
    width: "100vw",
    height: "100vh",
    padding: 0,
    margin: 0,
  },
  root: {
    width: "100%",
    zIndex: 1,
    overflow: "hidden",
  },
  appFrame: {
    position: "relative",
    display: "flex",
    width: "100%",
    height: "100%",
  },
  appBar: {
    position: "absolute",
    /* zIndex: theme.zIndex.drawer + 1, */
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 60,
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawerPaper: {
    position: "relative",
    height: "100%",
    width: drawerWidth,
    overflow: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    overflow: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 8px",
    boxShadow: theme.shadows["4"],
    ...theme.mixins.toolbar,
  },
  flex: {
    flex: 1,
  },
  headerLogo: {
    position: "relative",
    padding: 0,
    width: "120px",
    height: "40px",
  },
  content: {
    width: "100%",
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 24,
    height: "calc(100% - 56px)",
    marginTop: 56,
    [theme.breakpoints.up("sm")]: {
      height: "calc(100% - 64px)",
      marginTop: 64,
    },
  },
})
interface IAppFrameProps {
  store?: StoreRoot
}

interface IAppFrameState {
  anchorEl: any
  sliderValue: any
  tabValue: number
}

interface ITabContainerProps {
  children: React.ReactNode
  tabValue: number
}

const TabContainer: React.SFC<ITabContainerProps> = props => {
  return (
    <Typography component="div" style={{ padding: 8 * 1 }}>
      <div style={{ padding: 8 * 1, display: "flex", justifyContent: "center" }}>
        {props.tabValue + 1}
      </div>
      <div style={{ padding: 8 * 1 }}>{props.children}</div>
    </Typography>
  )
}

@inject("store")
@observer
export class AppFrame extends React.Component<IAppFrameProps & WithStyles<any>, IAppFrameState> {
  state: IAppFrameState = {
    anchorEl: null,
    sliderValue: undefined,
    tabValue: 0,
  }

  toggleMenuDrawer = (openState: boolean) => {
    //debugger
    this.props.store.uiStore.updateMenuDrawerState(openState)
  }

  toggleUserAction = (event?: any) => {
    const anchorElement = event ? event.currentTarget : null
    this.setState({ anchorEl: anchorElement })
  }

  handleUserProfile = () => {
    this.props.store.uiStore.updateTheme("velocity")
    this.setState({ anchorEl: null })
  }

  handleUserSettings = event => {
    //no-op
  }

  handleTabChange = (event, tabValue) => {
    this.setState({ tabValue })
  }

  handleAppBarTransition = _.debounce(() => {
    console.log("APP BAR TRANSITION CAUGHT....")
    debugger
    //Broke the 4th Wall Right here ---
    window.dispatchEvent(new Event("resize"))
  }, 200)

  handleDrawerTransition = event => {
    //no-op
  }

  renderDevTool() {
    if (process.env.NODE_ENV !== "production") {
      const DevTools = require("mobx-react-devtools").default
      return <DevTools />
    }
    return null
  }

  render() {
    debugger
    const { classes } = this.props
    const isMenuDrawerOpen = this.props.store.uiStore.isMenuDrawerOpen
    const { anchorEl, tabValue } = this.state
    const userActionOpen = Boolean(anchorEl)

    return (
      <Grid container className={classes.gridRoot}>
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <AppBar
              className={classNames(classes.appBar, isMenuDrawerOpen && classes.appBarShift)}
              onTransitionEnd={this.handleAppBarTransition}
            >
              <Toolbar disableGutters={!isMenuDrawerOpen}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => this.toggleMenuDrawer(true)}
                  className={classNames(classes.menuButton, isMenuDrawerOpen && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                <Tabs
                  value={tabValue}
                  onChange={this.handleTabChange}
                  centered
                  indicatorColor="secondary"
                  className={classes.flex}
                >
                  <Tab label="Item One" href="#" />
                  <Tab label="Item Two" href="#" />
                  <Tab label="Item Three" href="#" />
                  <Tab label="Item Four" href="#" />
                  <Tab label="Item Five" href="#" />
                </Tabs>
                <div>
                  <IconButton
                    aria-owns={userActionOpen ? "menu-appbar" : null}
                    aria-haspopup="true"
                    onClick={event => this.toggleUserAction(event)}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={userActionOpen}
                    onClose={event => this.toggleUserAction()}
                  >
                    <MenuItem onClick={this.handleUserProfile}>Profile</MenuItem>
                    <MenuItem onClick={event => this.handleUserSettings(event)}>
                      My account
                    </MenuItem>
                  </Menu>
                </div>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              classes={{
                paper: classNames(
                  classes.drawerPaper,
                  !isMenuDrawerOpen && classes.drawerPaperClose,
                ),
              }}
              open={isMenuDrawerOpen}
              onTransitionEnd={this.handleDrawerTransition}
            >
              <div className={classes.drawerInner}>
                <div className={classes.drawerHeader}>
                  <img src={cogliteLogo} style={{ padding: 0 }} className={classes.headerLogo} />
                  <IconButton onClick={() => this.toggleMenuDrawer(false)}>
                    <ArrowBackIcon />
                  </IconButton>
                </div>
                <Divider />
                <List>
                  <div>
                    <ListItem button>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText primary="Inbox" />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <StarIcon />
                      </ListItemIcon>
                      <ListItemText primary="Starred" />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <SendIcon />
                      </ListItemIcon>
                      <ListItemText primary="Send mail" />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Drafts" />
                    </ListItem>
                  </div>
                </List>
                <Divider />
                <List>
                  <div>
                    <ListItem button>
                      <ListItemIcon>
                        <MailIcon />
                      </ListItemIcon>
                      <ListItemText primary="All mail" />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <DeleteIcon />
                      </ListItemIcon>
                      <ListItemText primary="Trash" />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <ReportIcon />
                      </ListItemIcon>
                      <ListItemText primary="Spam" />
                    </ListItem>
                  </div>
                </List>
              </div>
            </Drawer>
            <main className={classes.content}>
              <TabContainer tabValue={tabValue}>{this.props.children}</TabContainer>
            </main>
          </div>
        </div>
      </Grid>
    )
  }
}

export default withStyles(styles)(AppFrame)
