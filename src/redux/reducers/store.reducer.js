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
      const existBookIdx = state.cartStore.findIndex(
        (bookStore) => bookStore.id === newItemAdd?.id
      );

      if (existBookIdx !== -1) {
        ++newCartStoreAdd[existBookIdx].count;
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
      const existBookFindDecrease = state.cartStore.findIndex(
        (bookStore) => bookStore.id === newItemDecrease?.id
      );

      if (existBookFindDecrease !== -1)
        --newCartStoreDecrease[existBookFindDecrease].count;

      return {
        ...state,
        cartStore: newCartStoreDecrease,
      };

    case typeName.REMOVE_BOOK_TO_CART:
      let newItemRemove = action.payload?.bookItem;
      const newCartStoreRemoved = state.cartStore.filter(
        (bookStore) => bookStore.id !== newItemRemove?.id
      );

      return {
        ...state,
        cartStore: newCartStoreRemoved,
      };

    case typeName.EDIT_QUANTITY_BOOK_TO_CART:
      let newItemEdit = action.payload?.bookItem;
      let newCartStoreEdit = [...state.cartStore];
      const existBookFindEdit = state.cartStore.findIndex(
        (bookStore) => bookStore.id === newItemEdit?.id
      );

      if (existBookFindEdit !== -1)
        newCartStoreEdit[existBookFindEdit] = newItemEdit;

      return {
        ...state,
        cartStore: newCartStoreEdit,
      };

    default:
      return state;
  }
}
