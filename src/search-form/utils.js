const SIZES = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
const getSpan = (propSize) => {
  let span
  if (typeof propSize === 'number') {
    span = propSize
  } else if (typeof propSize === 'object' && propSize.span) {
    span = propSize.span
  }
  return span
}
export const getBtnColProps = (colProps, length) => {
  const buttonColProps = {}
  SIZES.forEach((size) => {
    const propSize = colProps[size]
    if (!propSize) return
    let span = getSpan(propSize)
    const col = Math.floor(24 / span) // 一行多少个
    const remain = length % col // 最后一行剩下最少个 item
    buttonColProps[size] = remain ? (col - remain) * span : 24
  })
  return buttonColProps
}
export const getCollapsedBtnProps = (colProps) => {
  const buttonColProps = {}
  SIZES.forEach((size) => {
    buttonColProps[size] = colProps[size]
  })
  return buttonColProps
}
export const getCollapsedColProps = (colProps, count, row) => {
  const hide = SIZES.map((size) => ({ [size]: 0 })).reduce(
    (acc, cur) => ({ ...acc, ...cur }),
    {}
  )
  const colPropsArr = []
  const total = count + 1 // 加上按钮
  //  fix 这里之前写 = hide，导致持有同一个引用地址
  for (let i = 0; i < count; i++) colPropsArr[i] = { ...hide }

  SIZES.forEach((size) => {
    let propSize = colProps[size]
    if (!propSize) return
    let span = getSpan(propSize)
    const col = Math.floor(24 / span) // 一行多少个
    const maxRow = Math.ceil(total / col)
    const realRow = row > maxRow ? maxRow : row
    const remain = realRow * col - 1 > total ? total : realRow * col - 1
    if (remain === 0) colPropsArr[0][size] = propSize
    for (let j = 0; j < remain; j++) {
      if (colPropsArr[j]) colPropsArr[j][size] = propSize
    }
  })
  return colPropsArr
}
export const getCurScreen = (screen) =>
  SIZES[
    Math.max(
      ...Object.entries(screen)
        .filter((s) => !!s[1])
        .map((s) => SIZES.indexOf(s[0]))
    )
  ]
export const DEFAULT_FORM_COL = {
  labelCol: {
    xs: 24,
    sm: 7,
    md: 6,
    lg: 6,
    xl: 5
  },
  wrapperCol: {
    xs: 24,
    sm: 17,
    md: 18,
    lg: 18,
    xl: 19
  }
}
export const DEFAULT_ITEM_COL = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 8,
  xl: 8,
  xxl: 6
}
