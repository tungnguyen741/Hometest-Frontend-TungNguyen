import { typeName } from "../redux.config";

const initialState = {
  env: "production",
  lang: "en",
  loading: false,

  configColor: {
    bgColorOrange: "#FC820A", // main color
    bgColorBlue: "#C7E9F9", // main color
  },

  bannerStore: [],
  bookListStore: [],
  bookListFlashSaleStore: [],
  cartStore: [],
};

export default function storeApp(state = initialState, action) {
  switch (action.type) {
    /* System */
    case typeName.SWITCH_ENVIRONMENT:
      return { ...state, env: action.payload };

    case typeName.SHOW_LOADING:
      return { ...state, loading: true };
    case typeName.HIDE_LOADING:
      return { ...state, loading: false };

    /* Client */

    case `${typeName.GET_BANNERS_HOME}_SUCCESS`:
      return {
        ...state,
        bannerStore: [...state.bannerStore, ...action.payload?.row1],
      };
    case `${typeName.GET_BOOK_LIST}_SUCCESS`:
      return {
        ...state,
        bookListStore: [...state.bookListStore, ...action.payload?.data],
      };
    case `${typeName.GET_BOOK_LIST_FLASH_SALE}_SUCCESS`:
      return {
        ...state,
        bookListFlashSaleStore: [
          ...state.bookListFlashSaleStore,
          ...action.payload?.data,
        ],
      };
    /*CART */
    case typeName.ADD_BOOK_TO_CART:
      let newItemAdd = action.payload?.bookItem;
      let newCartStoreAdd = [...state.cartStore];

      const existBookFind = state.cartStore.find(
        (bookStore) => bookStore.id === newItemAdd?.id
      );
      const existBookIndexAdd = state.cartStore.indexOf(existBookFind);

      if (existBookIndexAdd !== -1) {
        ++newCartStoreAdd[existBookIndexAdd].count;
      } else {
        newCartStoreAdd.push(newItemAdd);
      }
      return {
        ...state,
        cartStore: newCartStoreAdd,
      };
    case typeName.DECREASE_BOOK_TO_CART:
      let newItemDecrease = action.payload?.bookItem;
      let newCartStoreDecrease = [...state.cartStore];

      const existBookFindDecrease = state.cartStore.find(
        (bookStore) => bookStore.id === newItemDecrease?.id
      );
      const existBookIndexDecrease = state.cartStore.indexOf(
        existBookFindDecrease
      );

      if (existBookIndexDecrease !== -1) {
        --newCartStoreDecrease[existBookIndexDecrease].count;
      } else {
        newCartStoreDecrease.push(newItemDecrease);
      }
      return {
        ...state,
        cartStore: newCartStoreDecrease,
      };
    case typeName.REMOVE_BOOK_TO_CART:
      let newItemRemove = action.payload?.bookItem;
      let newCartStore = [...state.cartStore];

      const existBookFindRemove = state.cartStore.find(
        (bookStore) => bookStore.id === newItemRemove?.id
      );
      const existBookIndex = state.cartStore.indexOf(existBookFindRemove);

      if (existBookIndex !== -1) {
        newCartStore.splice(existBookIndex, 1);
      }
      return {
        ...state,
        cartStore: newCartStore,
      };
    case typeName.EDIT_QUANTITY_BOOK_TO_CART:
      let newItemEdit = action.payload?.bookItem;
      let newCartStoreEdit = [...state.cartStore];

      const existBookFindEdit = state.cartStore.find(
        (bookStore) => bookStore.id === newItemEdit?.id
      );
      const existBookEdit = state.cartStore.indexOf(existBookFindEdit);

      if (existBookEdit !== -1) {
        newCartStoreEdit[existBookEdit] = newItemEdit;
      }
      return {
        ...state,
        cartStore: newCartStoreEdit,
      };

    default:
      return state;
  }
}
