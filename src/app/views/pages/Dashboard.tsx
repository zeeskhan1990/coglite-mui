import * as React from "react"
import { Text } from "../shared/text"
import { CenteredContent } from "../shared/centered-content"
import { FunDog } from "../../assets/fun-dog"
import { Logo } from "../../assets/logo"
import { Slider } from "rmwc/Slider"
import { StoreRoot } from "../../stores/storeRoot"
import { observer, inject } from "mobx-react"

interface IDashboardProps {
  store?: StoreRoot
}

interface IDashboardState {
  sliderValue: number
}

@inject("store")
@observer
export default class extends React.Component<IDashboardProps, IDashboardState> {
  state: IDashboardState = {
    sliderValue: 50,
  }
  //this.props.store.uiStore.updateTheme("velocity")
  handleSliderValue(sliderValue) {
    const uiStore = this.props.store.uiStore
    this.setState({ sliderValue: sliderValue })

    if (sliderValue < 33 && uiStore.themeId !== "velocity") uiStore.updateTheme("velocity")
    else if (sliderValue >= 33 && sliderValue <= 66 && uiStore.themeId !== "myriad")
      uiStore.updateTheme("myriad")
    else if (sliderValue >= 66 && uiStore.themeId !== "ranger") uiStore.updateTheme("ranger")
  }

  render() {
    return (
      <div>
        <CenteredContent>
          <Text>Do a barrel roll.</Text>
          <FunDog />
          <Logo />
        </CenteredContent>
        <Slider
          value={this.state.sliderValue}
          min={0}
          max={100}
          onChange={evt => this.handleSliderValue(evt.target.value)}
        />
      </div>
    )
  }
}
