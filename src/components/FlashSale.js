import React, { useMemo, useState } from "react";
import classNames from "classnames";
import { convertCurrency } from "helpers";
import PropTypes from "prop-types";

FlashSale.propTypes = {
  bookListFlashSale: PropTypes.array,
  handleOnGetItem: PropTypes.func,
};

function FlashSale({ bookListFlashSale = [], handleOnGetItem }) {
  const saleTimelines = useMemo(() => ["10:00", "15:00", "18:00", "20:00"], []);
  const [timelineCurrent, setTimelineCurrent] = useState({
    timeline: "10:00",
    index: 1,
  });
  const handleChangeTimelines = (timeClicked = "10:00", index = 1) => {
    setTimelineCurrent({ ...timelineCurrent, timeline: timeClicked, index });
  };
  const renderBookByTimeline = () => {
    return bookListFlashSale
      .slice(timelineCurrent.index, timelineCurrent.index + 2)
      .map((bookItem, index) => {
        return (
          <div
            onClick={(e) => handleOnGetItem(e, bookItem, index)}
            className="bookItem"
            key={bookItem.id || index}
          >
            <div className="bookItemTop">
              <img
                className="bookItem__thumb"
                src={bookItem?.thumbnail_url}
                alt="book unique"
              />
              <img
                className="bookItem__thumbWrapper"
                src="/assets/img/book/thumb-wrapper.png"
                alt="book unique"
              />
            </div>
            <div className="bookItemBot bookInfoWrapper">
              <div className="bookItem__logoTikiNow">
                <img src="/assets/img/logo/TikiNOW.png" alt="tikinow" />
              </div>
              <div className="bookItem__name">
                {bookItem?.name}{" "}
                {bookItem?.book_cover?.value &&
                  `(${bookItem?.book_cover?.value})`}
              </div>
              <div className="bookItem__reviewWrapper">
                <span className="bookItem__reviewWrapper--star">
                  <img src="/assets/img/icon/star.svg" alt="star" />
                  <img src="/assets/img/icon/star.svg" alt="star" />
                  <img src="/assets/img/icon/star.svg" alt="star" />
                  <img src="/assets/img/icon/star.svg" alt="star" />
                  <img src="/assets/img/icon/star.svg" alt="star" />
                </span>
                <span className="bookItem__reviewWrapper--reviewCount">
                  {bookItem?.review_count && `(${bookItem?.review_count})`}
                </span>
              </div>
              <div className="bookItem__priceWrapper">
                <span className="bookItem__priceWrapper--price">
                  {convertCurrency(bookItem?.price)}
                </span>
                {bookItem?.discount_rate !== 0 && (
                  <span className="bookItem__priceWrapper--discountRate">
                    {`-${bookItem?.discount_rate}%`}
                  </span>
                )}
              </div>

              <div className="bookItem__listPrice">
                {convertCurrency(bookItem?.list_price)}
              </div>
            </div>
          </div>
        );
      });
  };
  return (
    <div className="FlashSale">
      <img src="/assets/img/sale/flash-sale.png" alt="banner flash sale" />
      <div className="FlashSale__wrapper">
        {saleTimelines.map((saleTimeLine, index) => {
          return (
            <div
              key={saleTimeLine.id || index}
              className={classNames("FlashSale__wrapper--saleTimeline", {
                active: saleTimeLine === timelineCurrent.timeline,
              })}
              onClick={() => handleChangeTimelines(saleTimeLine, index + 1)}
            >
              {saleTimeLine}
            </div>
          );
        })}
      </div>

      <div className="bookItemWrapper">{renderBookByTimeline()}</div>
    </div>
  );
}

export default FlashSale;
