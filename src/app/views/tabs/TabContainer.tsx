import * as React from "react"
import { Tab } from "./tab"
import { bindKey, unbindKey, commandOrControlKey } from "../shared/keyboard"
import { spacing, colors, styles, cssProps } from "../theme"
import { EnterAnimation } from "../shared/enter-animation"
import { css } from "glamor"

export type TabContainerIndex = "one" | "two" | "three"

export interface TabContainerProps {
  tab: TabContainerIndex
  onChangeTab: (tab: TabContainerIndex) => void
}

const KEY_1 = `${commandOrControlKey()}+1`
const KEY_2 = `${commandOrControlKey()}+2`
const KEY_3 = `${commandOrControlKey()}+3`

// an extra layer just for the drag style due to electron bug
const tabBaseStyle = css(styles.windowDrag)

const tabBarStyles = css(
  styles.column,
  styles.windowDrag,
  cssProps({
    width: "64px",
    overflow: "hidden",
    textAlign: "center",
    height: "100vh",
    paddingLeft: spacing.small,
    paddingRight: spacing.small,
    paddingTop: spacing.verySmall,
    backgroundColor: colors.nav.background,
    justifyContent: "flex-start",
    border: 1,
    borderColor: colors.nav.line,
    borderStyle: "solid",
  }),
)

export class TabContainer extends React.PureComponent<TabContainerProps, {}> {
  changeTab1 = () => this.props.onChangeTab("one")
  changeTab2 = () => this.props.onChangeTab("two")
  changeTab3 = () => this.props.onChangeTab("three")

  componentDidMount() {
    bindKey(KEY_1, this.changeTab1)
    bindKey(KEY_2, this.changeTab2)
    bindKey(KEY_3, this.changeTab3)
  }

  componentWillUnmount() {
    unbindKey(KEY_1)
    unbindKey(KEY_2)
    unbindKey(KEY_3)
  }

  render() {
    const { tab } = this.props

    return (
      <div {...tabBaseStyle}>
        <EnterAnimation animation="slide" delay={100} y={-60}>
          <div {...tabBarStyles}>
            <Tab onClick={this.changeTab1} active={tab === "one"} text="doggo" />
            <Tab onClick={this.changeTab2} active={tab === "two"} text="paragraphs" />
            <Tab onClick={this.changeTab3} active={tab === "three"} text="empty" />
          </div>
        </EnterAnimation>
      </div>
    )
  }
}
