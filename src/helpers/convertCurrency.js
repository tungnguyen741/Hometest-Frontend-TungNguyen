export function convertCurrency(amount, optional = " ₫") {
  if (
    amount === "" ||
    amount === undefined ||
    amount === null ||
    amount === false
  ) {
    return 0;
  }

  return amount.toLocaleString("vi") + optional;
}
export function convertDiscount(amount, optional = " ₫") {
  if (
    amount === "" ||
    amount === undefined ||
    amount === null ||
    amount === false
  ) {
    return 0;
  }
  return amount.toLocaleString("vi") + optional;
}
