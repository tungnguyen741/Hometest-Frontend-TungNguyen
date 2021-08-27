import React from 'react'
import { Route } from 'react-router-dom'

const PublicRoute = ({
  props, component, component: Component, ...rest
}) => {
  return (
    <Route
      {...rest}
      key="route"
      render={(props) => {
        return <Component component={component} {...rest} {...props} />
      }}
    />
  )
}

export default PublicRoute
