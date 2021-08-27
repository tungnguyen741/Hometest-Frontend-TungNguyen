import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SliderBanner from "components/common/Slider";
import { getBannersHome } from "redux/actions/store.actions";

function Banners() {
  const dispatch = useDispatch();
  const bannerStore = useSelector((state) => state.storeReducer.bannerStore);
  const [resBanners, setResBanners] = useState(bannerStore);
  const getBannersHomeApi = () => {
    const callback = (callSuccess, data) => {
      if (callSuccess) {
        setResBanners(data?.row1);
      }
    };
    dispatch(getBannersHome({}, callback));
  };

  useEffect(() => {
    if (bannerStore.length === 0) getBannersHomeApi();
  }, [bannerStore.length]);

  return (
    <div className="banners">
      <SliderBanner data={resBanners} />
      <img
        className="banners__saleImg"
        src="assets/img/sale/baner-sale.png"
        alt=""
      />
    </div>
  );
}

export default Banners;
