import {useState, useEffect} from 'react'
import axios from 'axios'

// 1. 数据驱动：映射对象
const contentMap: { [key: string]: string } = {
  '11': '/Content/11.md',
  '12': '/Content/12.md',
  '21': '/Content/21.md',
  '22': '/Content/22.md',
  '231': '/Content/231.md',
  '31': '/Content/31.md',
  '32': '/Content/32.md',
  '33': '/Content/33.md',
  '34': '/Content/34.md',
  '35': '/Content/35.md',
  '36': '/Content/36.md',
  '37': '/Content/37.md',
  '38': '/Content/38.md',
};

export function useMarkdownContent(selectedKey: string) {
  const [mdContent, setMdContent] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const mdPath = contentMap[selectedKey]

    if (mdPath) {
      setLoading(true)
      setError(null)
      axios
        .get(mdPath)
        .then((res) => {
          setMdContent(res.data)
        })
        .catch(() => {
          setError('内容加载失败，请稍后重试')
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setMdContent('暂无内容')
      setError(null)
    }
  }, [selectedKey])

  return {mdContent, loading, error}
}
