import {useEffect, useState, useRef} from 'react'
import Markdown from 'react-markdown'
import {Anchor, Col, Row, Spin, Result} from 'antd'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import {useMarkdownContent} from '../../hooks/useMarkdownContent'

interface ContentPageProps {
  selectedKey: string
}

const ContentPage = ({selectedKey}: ContentPageProps) => {
  const anchorRef = useRef<HTMLDivElement>(null)
  const {mdContent, loading, error} = useMarkdownContent(selectedKey)
  const [items, setItems] = useState<
    {key: string; href: string; title: string}[]
  >([])

  // 确定右侧的锚点
  useEffect(() => {
    if (loading || error || !anchorRef.current) {
      setItems([]) // 内容加载中、加载失败或 ref 不可用时，清空锚点
      return
    }

    const anchors: {key: string; href: string; title: string}[] = []
    // 使用 setTimeout 确保在 Markdown 渲染完成后再查找标题元素
    const timer = setTimeout(() => {
      anchorRef.current?.querySelectorAll('h1, h2, h3').forEach((el) => {
        if (!el.id) return
        anchors.push({
          key: el.id,
          href: `#${el.id}`,
          title: el.textContent || '',
        })
      })
      setItems(anchors)
    }, 100) // 延迟 100 毫秒，等待 DOM 更新

    return () => clearTimeout(timer) // 清理 timeout
  }, [mdContent, loading, error])

  // 2. 根据加载和错误状态显示不同 UI
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spin size="large" tip="加载中..." />
      </div>
    )
  }

  if (error) {
    return <Result status="error" title="加载失败" subTitle={error} />
  }

  return (
    <Row wrap={false}>
      <Col flex="auto">
        <div ref={anchorRef} className="prose max-w-none pr-5">
          <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
            {mdContent}
          </Markdown>
        </div>
      </Col>
      {items.length > 0 && (
        <div className="hidden lg:block">
          <Col flex="200px">
            <Anchor items={items} />
          </Col>
        </div>
      )}
    </Row>
  )
}

export default ContentPage

