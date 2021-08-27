import size from 'lodash/size'

const _ = { size }

/* String format */
function decodeToken(str) {
  try {
    if (str !== '') {
      const tmpStr = JSON.parse(decodeURIComponent(str))
      if (typeof tmpStr === 'object' && tmpStr !== null && tmpStr.connectToken && tmpStr.appToken) {
        return tmpStr
      }
      return false
    }
    return false
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log(error, 'Object connect không đúng để kết nối')
    }
    return false
  }
}

function colorFormat(configColor) {
  try {
    if (configColor) {
      if (typeof configColor === 'string') { // only one main color
        const color = hexToRgbA(configColor)
        return {
          bgColor: `linear-gradient(45deg, ${color}, ${color})`,
          mainColor: color,
          subColor: hexToRgbA(configColor, 0.2)
        }
      } if (configColor && Array.isArray(configColor) && _.size(configColor) > 0) {
        const color1 = hexToRgbA(configColor[0])
        let color2 = color1
        if (_.size(configColor) > 1) color2 = hexToRgbA(configColor[1])
        return {
          bgColor: `linear-gradient(45deg, ${color1}, ${color2})`,
          mainColor: color1,
          subColor: hexToRgbA(configColor[0], 0.2)
        }
      }
      return {}
    }
    return {}
  } catch (error) {
    return {}
  }
}

function hexToRgbA(hex, blur = 1) {
  let c
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('')
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c = `0x${c.join('')}`
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')},${blur})`
  }
  throw new Error('Bad Hex')
}

export {
  decodeToken,
  colorFormat
}
