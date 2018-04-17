import * as React from "react"

interface ITabContainerProps {
  children: React.ReactNode
  tabValue: number
  classRules: any
}

export const TabContainer: React.SFC<ITabContainerProps> = props => {
  return <div className={props.classRules.tabContainer}>{props.children}</div>
}
