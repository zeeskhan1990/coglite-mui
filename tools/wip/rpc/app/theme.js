import { createMuiTheme } from 'material-ui';
import { blueGrey, teal, grey, red } from 'material-ui/colors';

const primary = teal;
const secondary = blueGrey;
const backgroundColor = grey[700];
const dangerColor = red[800];
const dangerBackgroundColor = red[100];



const theme = createMuiTheme({
  palette: {
    primary,
    secondary,
    backgroundColor,
    dangerColor,
    dangerBackgroundColor,
  },
  overrides: {
    MuiAppBar: {
      root: {
        padding: 0,
      },
      colorPrimary: {
        backgroundColor,
      },
    },
  },
});

export const publicAppTheme = outerTheme => ({
  ...theme,
  overrides: {
    ...theme.overrides,
    MuiAppBar: {
      ...theme.overrides.MuiAppBar,
      colorPrimary: {
        ...theme.overrides.MuiAppBar.colorPrimary,
        backgroundColor: secondary[900],
      },
    },
  },
});

export default theme;