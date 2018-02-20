import * as React from "react"
import { CSSProperties } from "react"
import { spacing, styles, cssProps } from "../theme"
import { compose } from "glamor"

export interface ScrollableContentProps {
  children?: React.ReactNode
  style?: CSSProperties | CSSProperties[] | null | false
}

const scrollableStyles = compose(
  styles.column,
  styles.flex1,
  cssProps({ padding: spacing.small, overflowY: "scroll" }),
)

export function ScrollableContent(props: ScrollableContentProps) {
  return <div {...compose(scrollableStyles, props.style)}>{props.children}</div>
}
