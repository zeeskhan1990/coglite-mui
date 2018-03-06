import * as React from "react"
import { style } from "typestyle"
import { withStyles } from "material-ui/styles"
import Grid from "material-ui/Grid"
import MenuAppBar from "./pages/MenuAppBar"
import { cssRaw } from "typestyle"

const styles = (theme: any) => ({
  root: {
    flexGrow: 1,
    width: "100vw",
    height: "100vh",
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
})

class AppFrame extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    console.log(props)
    /* this._onClickHandler = this._onClickHandler.bind(this); */
  }

  renderDevTool() {
    if (process.env.NODE_ENV !== "production") {
      const DevTools = require("mobx-react-devtools").default
      return <DevTools />
    }
    return null
  }

  /* private _onClickHandler(e: React.MouseEvent<HTMLElement>) {
    alert('test');
    return false;
  } */

  render() {
    const { classes, theme } = this.props

    return (
      <Grid container className={classes.root}>
        <MenuAppBar />
      </Grid>
    )
  }
}

export default withStyles(styles, { withTheme: true })(AppFrame)
