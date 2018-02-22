import * as React from "react"
import { CSSProperties } from "react"
import { Text } from "../shared/text"
import { CenteredContent } from "../shared/centered-content"
import { FunDog } from "../../assets/fun-dog"
import { Logo } from "../../assets/logo"

export interface DogTabProps {
  style?: CSSProperties | CSSProperties[] | null | false
}

export class DogTab extends React.PureComponent<DogTabProps, {}> {
  render() {
    return (
      <CenteredContent style={this.props.style}>
        <Text>Do a barrel roll.</Text>
        <FunDog />
        <Logo />
      </CenteredContent>
    )
  }
}
