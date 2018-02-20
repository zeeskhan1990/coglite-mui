// This is the top-most component in the app.
import * as React from "react"
import { useStrict } from "mobx"
import { Provider } from "mobx-react"
//import { Router} from "react-router"
import { SynchronizedHistory } from "mobx-react-router"
import { compose } from "glamor"
import { styles, colors } from "./views/theme"
import { WelcomeScreen } from "./views/home"

// enable MobX strict mode
useStrict(true)

const rootStyles = compose(styles.fullScreen, {
  background: colors.window.background,
  "& ::-webkit-scrollbar": { backgroundColor: colors.scrollbar.base, width: 12, height: 12 },
  "& ::-webkit-scrollbar-track": { backgroundColor: colors.scrollbar.track },
  "& ::-webkit-scrollbar-thumb": { backgroundColor: colors.scrollbar.thumb, borderRadius: 4 },
})

interface IRootType {
  store: any,
  history: SynchronizedHistory
}

export function RootComponent({ store, history }: IRootType) {
  return (
    <Provider {...store}>
      <div {...rootStyles}>
        <WelcomeScreen />
      </div>
  </Provider>
  )
}