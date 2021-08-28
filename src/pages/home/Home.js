import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Banners from "components/Banners";
import UniqueSaleBook from "components/UniqueSaleBook";
import SuperSale from "components/SuperSale";
import FlashSale from "components/FlashSale";

import UniqueSaleBookRenderer from "components/render/UniqueSaleBookRenderer";
import SuperSaleRenderer from "components/render/SuperSaleRenderer";

import {
  getBookList,
  getBookListFlash,
  addBookToCart,
} from "redux/actions/store.actions";

const Home = () => {
  const dispatch = useDispatch();
  const bookListStore = useSelector(
    (state) => state.storeReducer.bookListStore
  );
  const bookListFlashSaleStore = useSelector(
    (state) => state.storeReducer.bookListFlashSaleStore
  );

  const [bookList, setBookList] = useState(bookListStore);
  const [bookListFlashSale, setBookListFlashSale] = useState(
    bookListFlashSaleStore
  );
  useEffect(() => {
    if (bookListStore.length === 0) getBookListApi({ category: 8322 });
    if (bookListFlashSaleStore.length === 0)
      getBookListFlashSaleApi({ category: 316 });
  }, [bookListStore.length, bookListFlashSaleStore.length]);
  // call api
  const getBookListApi = ({ category }) => {
    const callback = (callSuccess, data) => {
      if (callSuccess) {
        setBookList(data?.data);
      }
    };
    dispatch(getBookList({ category }, callback));
  };

  const getBookListFlashSaleApi = ({ category }) => {
    const callback = (callSuccess, data) => {
      if (callSuccess) {
        setBookListFlashSale(data?.data);
      }
    };
    dispatch(getBookListFlash({ category }, callback));
  };
  // handle
  const handleOnclick = (e, bookClicked) => {
    const bookItem = {
      id: bookClicked?.id,
      name: bookClicked?.name,
      price: bookClicked?.price,
      discount_rate: bookClicked?.discount_rate,
      list_price: bookClicked?.list_price,
      thumbnail_url: bookClicked?.thumbnail_url,
      count: 1,
    };
    showToast("success", `Đã thêm "${bookClicked?.name}" vào giỏ hàng`);
    dispatch(addBookToCart({ bookItem }));
  };

  const showToast = (type = "error", message = "") =>
    toast[type](message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <div className="homepage">
      <Banners />
      <UniqueSaleBook>
        {() => (
          <UniqueSaleBookRenderer
            handleOnGetItem={handleOnclick}
            bookList={bookList}
          />
        )}
      </UniqueSaleBook>
      <SuperSale>
        {() => (
          <SuperSaleRenderer
            handleOnGetItem={handleOnclick}
            bookList={bookList}
          />
        )}
      </SuperSale>
      <FlashSale
        handleOnGetItem={handleOnclick}
        bookListFlashSale={bookListFlashSale}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
export default Home;
