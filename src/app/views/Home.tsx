import * as React from "react"
import { TabContainer, TabContainerIndex } from "./tabs/TabContainer"
import { LongTab, DogTab } from "./pages"
import { styles, cssProps } from "./theme"
import Store = require("electron-store")
import { css } from "glamor"

const hiddenStyle = cssProps({
  display: "none",
})

// a sample store
const store = new Store()

interface WelcomeScreenState {
  tab: TabContainerIndex
}

export class WelcomeScreen extends React.Component<{}, WelcomeScreenState> {
  state: WelcomeScreenState = {
    tab: "one",
  }

  componentDidMount() {
    // grab the persisted tab if we have one
    const tab = store.get("tab") || "one"
    this.setState({ tab })
  }

  setTab = (tab: TabContainerIndex) => {
    // persist the store... pretty trivial example, but ya, it's that easy.
    // Probably not the best idea to hit disk everytime you change a tab, but
    // if you're gunning for a prototype, everything is fair game.
    store.set("tab", tab)
    this.setState({ tab })
  }

  render() {
    return (
      <div id="WelcomeScreen" {...css(styles.row, styles.flex1)}>
        <TabContainer tab={this.state.tab} onChangeTab={this.setTab} />
        <DogTab style={this.state.tab !== "one" && hiddenStyle} />
        <LongTab style={this.state.tab !== "two" && hiddenStyle} />
      </div>
    )
  }
}
