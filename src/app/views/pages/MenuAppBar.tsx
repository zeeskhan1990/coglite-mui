import * as React from "react"
import { withStyles } from "material-ui/styles"
import * as classNames from "classnames"
import AppBar from "material-ui/AppBar"
import Drawer from "material-ui/Drawer"
import Toolbar from "material-ui/Toolbar"
import List from "material-ui/List"
import Divider from "material-ui/Divider"
import Typography from "material-ui/Typography"
import IconButton from "material-ui/IconButton"
import Menu, { MenuItem } from "material-ui/Menu"
import { Button } from "rmwc/Button"
import { Slider } from "rmwc/Slider"
//import style from '@material/button/dist/mdc.button.min.css';

const drawerWidth = 240

type StylesDeclaration = {
  [key: string]: React.CSSProperties | StylesDeclaration
}

type ThemedStylesDeclaration = (theme: any) => StylesDeclaration

const styles: ThemedStylesDeclaration = theme => ({
  root: {
    flexGrow: 1,
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
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawerPaper: {
    position: "relative",
    height: "100%",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
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

interface IMenuAppBarProps {
  classes: any
  theme: any
}

interface IMenuAppBarState {
  anchorEl: any
  drawerOpen: boolean
  sliderValue: any
}

class MenuAppBar extends React.Component<IMenuAppBarProps, IMenuAppBarState> {
  state: IMenuAppBarState = {
    anchorEl: null,
    drawerOpen: false,
    sliderValue: undefined,
  }

  handleMenu = (event: any) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleDrawerOpen = () => {
    this.setState({ drawerOpen: true })
  }

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false })
  }

  render() {
    const { classes, theme } = this.props
    const { anchorEl } = this.state
    const userActionOpen = Boolean(anchorEl)

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, this.state.drawerOpen && classes.appBarShift)}
            position="static"
          >
            <Toolbar disableGutters={!this.state.drawerOpen}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, this.state.drawerOpen && classes.hide)}
              >
                <i className="material-icons">menu</i>
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Coglite
              </Typography>
            </Toolbar>
            <div>
              <IconButton
                aria-owns={userActionOpen ? "menu-appbar" : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <i className="material-icons">account_circle</i>
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
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
              </Menu>
            </div>
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
                <IconButton onClick={this.handleDrawerClose}>
                  {theme.direction === "rtl" ? (
                    <i className="material-icons">chevron_left</i>
                  ) : (
                    <i className="material-icons">chevron_right</i>
                  )}
                </IconButton>
              </div>
              <Divider />
              <List>{}</List>
              <Divider />
              <List>{}</List>
            </div>
          </Drawer>
          <main className={classes.content}>
            <Typography noWrap>{"You think water moves fast? You should see ice."}</Typography>
            <Button>Hello World</Button>
            <Slider
              value={this.state.sliderValue === undefined ? 50 : this.state.sliderValue}
              onChange={evt => this.setState({ sliderValue: evt.target.value })}
            />
          </main>
        </div>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(MenuAppBar)
