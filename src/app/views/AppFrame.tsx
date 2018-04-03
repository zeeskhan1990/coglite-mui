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
import ChevronLeftIcon from "material-ui-icons/ChevronLeft"
import ChevronRightIcon from "material-ui-icons/ChevronRight"
import AccountCircle from "material-ui-icons/AccountCircle"
import Menu, { MenuItem } from "material-ui/Menu"
import { inject, observer } from "mobx-react"
import { StoreRoot } from "../stores/storeRoot"

const drawerWidth = 240
const toolbarHeight = 48

const styles: StyleRulesCallback<any> = theme => ({
  gridRoot: {
    flexGrow: 1,
    width: "100vw",
    height: "100vh",
    padding: theme.spacing.unit * 2,
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
  topAppBar: {
    position: "absolute",
  },
  bottomAppBar: {
    position: "absolute",
    top: toolbarHeight,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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
  toolbar: {
    minHeight: toolbarHeight,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawerPaper: {
    position: "absolute",
    top: toolbarHeight,
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
    marginLeft: "12px",
    minHeight: toolbarHeight,
    [theme.breakpoints.up("sm")]: {
      minHeight: toolbarHeight,
    },
    ...theme.mixins.toolbar,
  },
  flex: {
    flex: 1,
  },
  content: {
    width: "100%",
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 24,
    height: "calc(100% - 56px)",
    marginTop: 56,
    [theme.breakpoints.up("sm")]: {
      height: `calc(100% -${toolbarHeight}px)`,
      marginTop: toolbarHeight,
    },
  },
})

const decorate = withStyles(styles, { withTheme: true })

interface IAppFrameProps {
  store?: StoreRoot
}

interface IAppFrameState {
  anchorEl: any
  drawerOpen: boolean
  sliderValue: any
}

export default inject("store")(
  observer(
    decorate(
      class extends React.Component<IAppFrameProps & WithStyles<any>> {
        state: IAppFrameState = {
          anchorEl: null,
          drawerOpen: false,
          sliderValue: undefined,
        }

        handleDrawerOpen = () => {
          this.setState({ drawerOpen: true })
        }

        handleDrawerClose = () => {
          this.setState({ drawerOpen: false })
        }

        handleUserAction = event => {
          this.setState({ anchorEl: event.currentTarget })
        }

        handleUserActionClose = () => {
          this.setState({ anchorEl: null })
        }

        handleUserProfile = () => {
          this.props.store.uiStore.updateTheme("velocity")
          this.setState({ anchorEl: null })
        }

        renderDevTool() {
          if (process.env.NODE_ENV !== "production") {
            const DevTools = require("mobx-react-devtools").default
            return <DevTools />
          }
          return null
        }

        render() {
          const { classes, theme } = this.props
          const { anchorEl } = this.state
          const userActionOpen = Boolean(anchorEl)

          return (
            <Grid container className={classes.gridRoot}>
              <div className={classes.root}>
                <div className={classes.appFrame}>
                  <AppBar className={classNames(classes.appBar, classes.topAppBar)}>
                    <Toolbar disableGutters={!this.state.drawerOpen} className={classes.toolbar}>
                      <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={this.handleDrawerOpen}
                        className={classNames(
                          classes.menuButton,
                          this.state.drawerOpen && classes.hide,
                        )}
                      >
                        <MenuIcon />
                      </IconButton>
                      <Typography variant="title" color="inherit" className={classes.flex} noWrap>
                        Coglite
                      </Typography>
                      <div>
                        <IconButton
                          aria-owns={userActionOpen ? "menu-appbar" : null}
                          aria-haspopup="true"
                          onClick={this.handleUserAction}
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
                          onClose={this.handleUserActionClose}
                        >
                          <MenuItem onClick={this.handleUserProfile}>Profile</MenuItem>
                          <MenuItem onClick={this.handleUserActionClose}>My account</MenuItem>
                        </Menu>
                      </div>
                    </Toolbar>
                  </AppBar>
                  <AppBar
                    className={classNames(
                      classes.appBar,
                      classes.bottomAppBar,
                      this.state.drawerOpen && classes.appBarShift,
                    )}
                  >
                    <Toolbar disableGutters={!this.state.drawerOpen} className={classes.toolbar} />
                  </AppBar>
                  <Drawer
                    variant="permanent"
                    classes={{
                      paper: classNames(
                        classes.drawerPaper,
                        !this.state.drawerOpen && classes.drawerPaperClose,
                      ),
                    }}
                    open={this.state.drawerOpen}
                  >
                    <div className={classes.drawerInner}>
                      <div className={classes.drawerHeader}>
                        <Typography align="right" variant="subheading" color="inherit" noWrap>
                          Application Menu
                        </Typography>
                        <IconButton onClick={this.handleDrawerClose}>
                          {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
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
                  <main className={classes.content}>{this.props.children}</main>
                </div>
              </div>
            </Grid>
          )
        }
      },
    ),
  ),
)
