import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as IncreaseSvg } from "../../assets/images/increase.svg";
import { ReactComponent as DecreaseSvg } from "../../assets/images/decrease.svg";
import { convertCurrency } from "helpers";
import {
  addBookToCart,
  removeBookToCart,
  decreaseBookToCart,
  editBookToCart,
} from "redux/actions/store.actions";

function Cart() {
  const cartStore = useSelector((state) => state.storeReducer.cartStore || []);
  const dispatch = useDispatch();
  const [bookTotalPrice, setBookTotalPrice] = useState({});

  useEffect(() => {
    const totalCurrent = cartStore.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * currentValue.count,
      0
    );
    setBookTotalPrice(totalCurrent);
  }, [cartStore]);

  // handle
  const handleOnchange = (cartItem, index, e) => {
    const { value } = e.target;
    let onlyNumberVal = value.replace(/[^\d,]/g, "");
    onlyNumberVal = onlyNumberVal && Number(onlyNumberVal);
    cartItem.count = onlyNumberVal;
    dispatch(editBookToCart({ bookItem: cartItem }));
  };

  const handleIncreaseItem = (cartItem, index) => {
    dispatch(addBookToCart({ bookItem: cartItem }));
  };

  const handleDecreaseItem = (cartItem, index) => {
    if (cartItem?.count - 1 <= 0) return false;
    dispatch(decreaseBookToCart({ bookItem: cartItem }));
  };

  const handleRemoveItem = (cartItem, index) => {
    dispatch(removeBookToCart({ bookItem: cartItem }));
  };

  const renderListProduct = () => {
    return (
      cartStore.length > 0 &&
      cartStore.map((cartItem, index) => {
        return (
          <div className="Cart__orderDetail--productWrapper">
            <div className="Cart__orderDetail--productWrapper-img">
              <img
                src={
                  cartItem?.thumbnail_url ||
                  "/assets/img/book/thumb-wrapper.png"
                }
                alt="book selected"
              />
            </div>
            <div className="Cart__orderDetail--productWrapper-price">
              <div className="Cart__orderDetail--productWrapper-name">
                {cartItem?.name}
              </div>
              <div className="Cart__orderDetail--productWrapper-priceWrapper">
                <div className="Cart__orderDetail--productWrapper-amount">
                  {convertCurrency(cartItem?.price)}
                </div>
                <div className="Cart__orderDetail--productWrapper-discount">
                  {convertCurrency(cartItem?.list_price)}
                </div>
              </div>
              <div className="d-flex">
                <div
                  onClick={() => handleDecreaseItem(cartItem, index)}
                  className="Cart__orderDetail--productWrapper-controller Cart__orderDetail--productWrapper-decrease"
                >
                  <DecreaseSvg />
                </div>
                <div className="Cart__orderDetail--productWrapper-controller Cart__orderDetail--productWrapper-value">
                  <input
                    onChange={(e) => handleOnchange(cartItem, index, e)}
                    type="text"
                    value={cartItem?.count}
                  />
                </div>
                <div
                  onClick={() => handleIncreaseItem(cartItem, index)}
                  className="Cart__orderDetail--productWrapper-controller Cart__orderDetail--productWrapper-increase"
                >
                  <IncreaseSvg />
                </div>
              </div>
              <div
                onClick={() => handleRemoveItem(cartItem, index)}
                className="Cart__orderDetail--productWrapper-btnClose"
              >
                <img src="/assets/img/icon/times.svg" alt="" />
              </div>
            </div>
            <hr />
          </div>
        );
      })
    );
  };
  return (
    <div className="Cart">
      <div className="Cart__title">Chi tiết đơn hàng</div>
      <div className="Cart__orderDetail">
        {/* LIST PRODUCT */}
        {renderListProduct()}
        {/* LIST PRODUCT */}
        <div className="Cart__feeWrapper">
          <div className="Cart__feeWrapper--fee Cart__feeWrapper--provision">
            <div className="Cart__feeWrapper--feeLabel">Tạm tính</div>
            <div className="Cart__feeWrapper--feeValue">
              {convertCurrency(bookTotalPrice)}
            </div>
          </div>
          <div className="Cart__feeWrapper--fee Cart__feeWrapper--transportFee">
            <div className="Cart__feeWrapper--feeLabel">
              Phí vận chuyển
              <img src="/assets/img/icon/information.svg" alt="" />
            </div>
            <div className="Cart__feeWrapper--feeValue">15.000 đ</div>
          </div>
          <div className="Cart__feeWrapper--fee Cart__feeWrapper--total">
            <div className="Cart__feeWrapper--feeLabel">Tổng cộng</div>
            <div className="Cart__feeWrapper--feeValue">
              {" "}
              {cartStore.length
                ? convertCurrency(bookTotalPrice - 15000)
                : convertCurrency(0)}
            </div>
          </div>
        </div>
      </div>

      <div className="Cart__paymentTotal">
        <div className="Cart__feeWrapper--fee Cart__feeWrapper--total">
          <div className="Cart__feeWrapper--feeLabel">Tổng cộng</div>
          <div className="Cart__feeWrapper--feeValue">
            {cartStore.length
              ? convertCurrency(bookTotalPrice - 15000)
              : convertCurrency(0)}
          </div>
        </div>
        <hr />
        <button className="btn btn-payment">Thanh toán</button>
      </div>
    </div>
  );
}

export default Cart;
