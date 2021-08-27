import PropTypes from "prop-types";
import React, { Fragment } from "react";
import SliderSlick from "react-slick";

Slider.propTypes = {
  data: PropTypes.array,
  type: PropTypes.string,
  render: PropTypes.func,
};

function Slider({ data = [], type = "banners", render }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: (dots) => (
      <div
        style={{
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <ul className="slider-dot-custom" style={{ marginBottom: "10px" }}>
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          cursor: "pointer",
          width: "8px",
          height: "8px",
          margin: "1px 2px",
          padding: "0px",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "50%",
          outline: "none",
          border: "none",
          opacity: "1",
        }}
      ></div>
    ),
  };

  return (
    <>
      {type === "banners" && (
        <SliderSlick {...settings} className="banners-slider-wrapper">
          {data.map((banner) => {
            return (
              <Fragment key={banner?.id}>
                <img src={banner?.image_url} alt="img-banner" />
              </Fragment>
            );
          })}
        </SliderSlick>
      )}
      {type === "superSale" && (
        <SliderSlick {...settings} className="superSale-slider-wrapper">
          {render()}
        </SliderSlick>
      )}
    </>
  );
}

export default Slider;
