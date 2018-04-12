import * as React from "react"
import { Slider } from "rmwc/Slider"
import { cogWrap, IStyledProps } from "./../../utils/sharedUtil"
import * as SRD from "storm-react-diagrams"
import { StyleRulesCallback } from "material-ui"

interface IDashboardState {
  sliderValue: number
}

const styles: StyleRulesCallback = theme => ({
  diagramBlock: {
    flexGrow: 1,
    padding: 10,
    margin: 10,
    backgroundColor: "black",
    height: 600,
  },
})

const createBasicDiagram = (): SRD.DiagramEngine => {
  // 1) setup the diagram engine
  const engine = new SRD.DiagramEngine()
  engine.installDefaultFactories()

  // 2) setup the diagram model
  const model = new SRD.DiagramModel()
  //model.setGridSize(100)

  // 3) create a default node
  const node1 = new SRD.DefaultNodeModel("Node 1", "rgb(0,192,255)")
  let port1 = node1.addOutPort("Out")
  node1.setPosition(400, 100)

  // 4) create another default node
  const node2 = new SRD.DefaultNodeModel("Node 2", "rgb(192,255,0)")
  let port2 = node2.addInPort("In")
  node2.setPosition(100, 100)

  // 5) link the ports
  let link1 = port1.link(port2)

  // 6) add the models to the root graph
  model.addAll(node1, node2, link1)

  // 7) load model into engine
  engine.setDiagramModel(model)

  return engine
}

const SimpleDiagramWidget = props => {
  return <SRD.DiagramWidget diagramEngine={props.engine} />
}

export class Dashboard extends React.Component<IStyledProps, IDashboardState> {
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
    const { classes } = this.props
    return (
      <div>
        <Slider
          value={this.state.sliderValue}
          min={0}
          max={100}
          onChange={evt => this.handleSliderValue(evt.target.value)}
        />
        <div className={classes.diagramBlock}>
          <SimpleDiagramWidget engine={createBasicDiagram()} />
        </div>
      </div>
    )
  }
}

export default cogWrap(Dashboard, styles)
