import * as React from "react"
import { inject, observer, IReactComponent } from "mobx-react"
import injectSheet from "react-jss"

/**
 * @param wrappedComponent {IReactComponent} The base component to be wrapped
 * @param styles {style} The styles to be injected
 * @param dynamicStyling {boolean} If the styles needs to be updated dynamically on store updates
 */
export const cogWrap = (
  wrappedComponent: IReactComponent,
  styles?: any,
  dynamicStyling: boolean = false,
) => {
  if (styles) {
    const StyledComponent = injectSheet(styles)(observer(wrappedComponent))
    if (dynamicStyling) {
      const Wrapper = props => {
        return <StyledComponent {...props} {...props.store.uiStore} />
      }
      return inject("store")(observer(Wrapper))
    } else {
      return inject("store")(StyledComponent)
    }
  } else {
    return inject("store")(observer(wrappedComponent))
  }
}
