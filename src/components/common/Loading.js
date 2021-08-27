import React from "react";
import { useSelector } from "react-redux";
import Lottie from "react-lottie";

// import { Animation } from "../assets";
import windowDimensions from "./useWindowDimensions";

const LoadingCom = () => {
  const loading = useSelector((state) => state.storeReducer.loading);

  const { width } = windowDimensions();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: "",
  };

  if (loading) {
    return (
      <div className="loading-wrapper">
        <div className="loading-wrapper-inner">
          <div className="loading-content">
            <Lottie
              options={defaultOptions}
              width={width > 475 ? width / 10 : width / 4}
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default LoadingCom;
