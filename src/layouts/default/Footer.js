import React from "react";
import { ReactComponent as HomeSvg } from "../../assets/images/home.svg";
import { ReactComponent as CartSvg } from "../../assets/images/cart.svg";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <div className="bottom-bar">
        <NavLink exact to="/" activeClassName="nav-link-active">
          <div className="bottom-bar__icon active">
            <HomeSvg />
            <div>Trang chủ</div>
          </div>
        </NavLink>
        <NavLink exact to="/cart" activeClassName="nav-link-active">
          <div className="bottom-bar__icon ">
            <CartSvg />
            <div>Giỏ hàng</div>
          </div>
        </NavLink>
      </div>
      <div className="copyright"></div>
    </div>
  );
};
export default Footer;
