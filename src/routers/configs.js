/* Homepage */
import HomePage from "../pages/home/Home";
import CartPage from "../pages/cart/Cart";

/* Error 404 */
import NotFound from "../layouts/errors/404";

// import * as Layout from '../layouts'

/** **************
  configs: {
    headerHide: true,           // Ẩn header mặc định
    btnBackHide: true,          // Ẩn nút back trên header
    headerTitle: 'my title',  // Tiêu dề header
    footerShow: true            // Hiện footer
  }
******************* */

const routes = [
  {
    path: "/",
    component: HomePage,
    exact: true,
    configs: {
      headerHide: false,
      footerShow: true,
    },
  },
  {
    path: "/cart",
    component: CartPage,
    exact: true,
    configs: {
      headerHide: false,
      footerShow: true,
    },
  },
  // {
  //   path: "/active/:eps",
  //   component: ActivedPage,
  //   configs: {
  //     headerHide: true,
  //   },
  // },

  { component: NotFound, configs: { headerHide: true } },
];

export default routes;
