import React from "react";
import { convertCurrency } from "helpers";
import PropTypes from "prop-types";

UniqueSaleBookRenderer.propTypes = {
  bookList: PropTypes.array,
  classNames: PropTypes.string,
  handleOnGetItem: PropTypes.func,
};

function UniqueSaleBookRenderer({
  bookList = [],
  classNames = "bookItemWrapper",
  handleOnGetItem,
}) {
  return (
    <div className={classNames}>
      {bookList?.length > 0 &&
        bookList.map((bookUniqueItem, index) => {
          return (
            <div
              onClick={(e) => handleOnGetItem(e, bookUniqueItem, index)}
              className="bookItem"
              key={bookUniqueItem.id || index}
            >
              <div className="bookItemTop">
                <img
                  className="bookItem__thumb"
                  src={bookUniqueItem?.thumbnail_url}
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
                  {bookUniqueItem?.name}{" "}
                  {bookUniqueItem?.book_cover?.value &&
                    `(${bookUniqueItem?.book_cover?.value})`}
                </div>
                <div className="bookItem__reviewWrapper d-flex align-items-center">
                  <div
                    className="position-relative"
                    style={{ marginRight: "4.16px" }}
                  >
                    <span
                      className="bookItem__reviewWrapper--star"
                      style={{
                        position: "absolute",
                        width: `${bookUniqueItem?.rating_average * (100 / 5)}%`,
                        whiteSpace: "nowrap",
                        left: " 0px",
                        top: "0px",
                        overflow: "hidden",
                      }}
                    >
                      <img src="/assets/img/icon/star.svg" alt="star" />
                      <img src="/assets/img/icon/star.svg" alt="star" />
                      <img src="/assets/img/icon/star.svg" alt="star" />
                      <img src="/assets/img/icon/star.svg" alt="star" />
                      <img src="/assets/img/icon/star.svg" alt="star" />
                    </span>
                    <span className="bookItem__reviewWrapper--star" style={{}}>
                      <img src="/assets/img/icon/star-opacity.svg" alt="star" />
                      <img src="/assets/img/icon/star-opacity.svg" alt="star" />
                      <img src="/assets/img/icon/star-opacity.svg" alt="star" />
                      <img src="/assets/img/icon/star-opacity.svg" alt="star" />
                      <img src="/assets/img/icon/star-opacity.svg" alt="star" />
                    </span>
                  </div>
                  <span className="bookItem__reviewWrapper--reviewCount">
                    {bookUniqueItem?.review_count &&
                      `(${bookUniqueItem?.review_count})`}
                  </span>
                </div>
                <div className="bookItem__priceWrapper">
                  <span className="bookItem__priceWrapper--price">
                    {convertCurrency(bookUniqueItem?.price)}
                  </span>
                  {bookUniqueItem?.discount_rate !== 0 && (
                    <span className="bookItem__priceWrapper--discountRate">
                      {`-${bookUniqueItem?.discount_rate}%`}
                    </span>
                  )}
                </div>

                <div className="bookItem__listPrice">
                  {convertCurrency(bookUniqueItem?.list_price)}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default UniqueSaleBookRenderer;
