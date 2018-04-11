import * as React from "react"
import { Slider } from "rmwc/Slider"
import { StoreRoot } from "../../stores/storeRoot"
import { cogWrap } from "./../utils/wrapperUtil"

interface IDashboardProps {
  store?: StoreRoot
}

interface IDashboardState {
  sliderValue: number
}

export class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
  state: IDashboardState = {
    sliderValue: 50,
  }

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

export default cogWrap(Dashboard)
