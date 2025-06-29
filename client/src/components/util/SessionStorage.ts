import type {huangLiData} from '../../types/huangli'

export function saveHuangLiStorage(key: string, data: huangLiData) {
  try {
    const huangLiString = JSON.stringify(data)
    sessionStorage.setItem(key, huangLiString)
  } catch (e) {
    console.log('存储数据失败 :', e)
  }
}
export function getHuangLiStorage(key: string): huangLiData | null {
  try {
    const huangLiString = sessionStorage.getItem(key)
    if (!huangLiString) return null
    const data = JSON.parse(huangLiString)
    if (!data.info || !data.time || !data.data) {
      console.warn('存储的数据格式不正确')
      return null
    }
    return data
  } catch (e) {
    console.log('读取数据失败 :', e)
    return null
  }
}
