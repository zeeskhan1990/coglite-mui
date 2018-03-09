import * as React from "react"
import { Text } from "../shared/text"
import { CenteredContent } from "../shared/centered-content"
import { FunDog } from "../../assets/fun-dog"
import { Logo } from "../../assets/logo"

export class Dashboard extends React.PureComponent<{}, {}> {
  render() {
    return (
      <CenteredContent>
        <Text>Do a barrel roll.</Text>
        <FunDog />
        <Logo />
      </CenteredContent>
    )
  }
}
