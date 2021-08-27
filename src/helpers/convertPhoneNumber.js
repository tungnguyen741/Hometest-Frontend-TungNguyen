const prefixPhoneNation = '0'
const prefixPhoneGlobal = '84'

function convertPhoneNumberGlobal(number) {
  let suffix = ''
  if (number.toString().slice(0, 2) === '84') {
    suffix = number.replace(/^.{2}/g, '')
  } else { suffix = number.replace(/^./, '') }

  return prefixPhoneGlobal + suffix
}

function convertPhoneNumberNation(number) {
  if (!number) return ''
  let suffix = ''
  if (number.toString().slice(0, 2) === '84') {
    suffix = prefixPhoneNation + number.replace(/^.{2}/g, '')
  } else {
    suffix = number
  }

  return suffix
}

function hidePhoneNumber(number) {
  if (!number) return '--'
  const theLastFourDigits = number.substring(number.length - 4, number.length)

  return `SĐT ****${theLastFourDigits}`
}

export { convertPhoneNumberGlobal, convertPhoneNumberNation, hidePhoneNumber }
