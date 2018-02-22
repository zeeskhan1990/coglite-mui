// This is the top-most component in the app.
import * as React from "react"
import { useStrict } from "mobx"
import { Provider } from "mobx-react"
import { Router} from "react-router"
import { SynchronizedHistory } from "mobx-react-router"
//import { styles, colors } from "./views/theme"
import Reboot from 'material-ui/Reboot';
import AppFrame from "./views/AppFrame"
import Routes from './routes';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#767ec4',
      main: '#465293',
      dark: '#112a65',
      contrastText: '#fff',
    },
    secondary: {
      light: '#8e99f3',
      main: '#5c6bc0',
      dark: '#26418f',
      contrastText: '#fff',
    },
  },
});

// enable MobX strict mode
useStrict(true)

interface IRootType {
  store: any,
  history: SynchronizedHistory
}

export function RootComponent({ store, history }: IRootType) {
  return (
    <Provider {...store}>
      <MuiThemeProvider theme={theme}>
        <Reboot />
        <AppFrame>
          <Router history={history}>
              <Routes/>
          </Router>   
        </AppFrame>
      </MuiThemeProvider>
  </Provider>
  )
}