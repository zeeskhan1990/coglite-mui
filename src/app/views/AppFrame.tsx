import * as React from 'react';
import { style } from "typestyle";
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import MenuAppBar from "./pages/MenuAppBar";

/* const myGrid = style('test-classname', {
  margin: 'auto',
  display: 'grid',
  width: '100vw',
  height: '100vh',
  gridTemplateRows: '[row1-start] 40px [row1-end row2-start] auto [row2-end]',
  gridTemplateColumns: '200px auto',
  gridTemplateAreas: `
      "content content content"
      "content content content"
    `
});

const sidebar = style({
  gridArea: 'sidebar',
  padding: 20,
  backgroundColor: '#444',
  color: '#111'
})

const content = style({
  gridArea: 'content',
  backgroundColor: '#666',
  color: '#111'
});

const header = style({
  gridArea: 'header'
}); */

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});


class AppFrame extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    console.log(props);
    /* this._onClickHandler = this._onClickHandler.bind(this); */
  }
  
  renderDevTool() {
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('mobx-react-devtools').default;
      return (<DevTools />);
    }
    return null;
  };

  /* private _onClickHandler(e: React.MouseEvent<HTMLElement>) {
    alert('test');
    return false;
  } */



  render() {
    const { classes, theme } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
            <MenuAppBar/>
        </Grid>
        <Grid container className={classes.demo} justify="center" spacing={theme.spacing.unit * 2}>
          <Grid item xs={12}>
              Content
          </Grid>
        </Grid>
      </Grid>
    );
  }
};

export default withStyles(styles, {withTheme: true})(AppFrame);