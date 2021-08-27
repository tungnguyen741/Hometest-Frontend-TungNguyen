import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import map from "lodash/map";

import routes from "./configs";

import * as Layout from "../layouts";

const AppRoutes = ({ props }) => {
  return (
    <BrowserRouter>
      <Switch>
        {map(routes, (routeItem, key) => {
          const { component, ...rest } = routeItem;

          let ViewLayout = Layout.Defaults;
          if (routeItem.layout) ViewLayout = routeItem.layout;
          return (
            <ViewLayout
              key={key}
              component={component}
              {...rest}
              props={{ ...props, ...routeItem?.configs }}
            >
              <Route
                path={routeItem.path}
                component={routeItem.component}
                exact={routeItem.exact}
                props={{ ...props, ...routeItem?.configs }}
              />
            </ViewLayout>
          );
        })}
      </Switch>
    </BrowserRouter>
  );
};

export default AppRoutes;
