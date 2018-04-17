import { ListItem, ListItemIcon, ListItemText } from "material-ui"
import * as React from "react"
import { NavLink } from "react-router-dom"

interface Props {
  route: string
  icon?: any
  label?: string
}

export function DrawerLink({ icon, label, route }: Props) {
  return (
    <ListItem button component={props => <NavLink {...props as any} exact to={route} />}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  )
}
