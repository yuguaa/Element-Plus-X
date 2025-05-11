export function mergeAttrs(token: any, addAttrs: [string, string][]) {
  const tmpAttrs = token.attrs ? token.attrs!.slice() : []

  addAttrs.forEach((addAttr) => {
    const i = token.attrIndex(addAttr[0])
    if (i < 0) {
      tmpAttrs.push(addAttr)
    }
    else {
      tmpAttrs[i] = tmpAttrs[i].slice() as [string, string]
      tmpAttrs[i][1] += ` ${addAttr[1]}`
    }
  })

  return tmpAttrs
}
