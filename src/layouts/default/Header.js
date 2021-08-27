import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Header = ({ props }) => {
  const {
    storeReducer: {
      configColor: { bgColorOrange, bgColorBlue },
    },
  } = useSelector((state) => state);
  const location = useLocation();
  const cartPath = location.pathname === "/cart";
  const bgColor = cartPath ? bgColorOrange : bgColorBlue;
  return (
    <header>
      <div className="status-bar" style={{ background: bgColor }}>
        <img
          className="status-bar__icon"
          src={`assets/img/icon/${cartPath ? "wifi-white.svg" : "wifi.svg"}`}
          alt="wifi-icon"
        />
        <img
          className="status-bar__icon"
          src={`assets/img/icon/${
            cartPath ? "reception-white.svg" : "reception.svg"
          }`}
          alt="reception-icon"
        />
        <img
          className="status-bar__icon"
          src={`assets/img/icon/${
            cartPath ? "battery-white.svg" : "battery.svg"
          }`}
          alt="battery-icon"
        />
        <span
          style={{ color: cartPath ? "#fff" : "" }}
          className="status-bar__clock"
        >
          12:30
        </span>
      </div>
      <div className="nav-bar" style={{ background: bgColor }}>
        {cartPath && <div className="nav-bar__chart">Giỏ hàng</div>}
      </div>
    </header>
  );
};
export default Header;
