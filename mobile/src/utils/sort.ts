export const sortByDate = <
  T extends Date | {[key in K]: Date},
  K extends keyof T
>(
  array: T[],
  key?: K
) => {
  const getValue = (item: T) =>
    (!key || item instanceof Date ? item : item[key]) as Date

  const compare = (v1: T, v2: T) =>
    getValue(v1).getTime() - getValue(v2).getTime()

  return array.sort(compare)
}
