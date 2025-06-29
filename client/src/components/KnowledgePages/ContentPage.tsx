import { useEffect, useState,useRef } from 'react';
import axios from 'axios';

import Markdown from 'react-markdown'
import { Anchor, Col, Row } from 'antd';
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
interface ContentPageProps {
  selectedKey: string;
}
const ContentPage = ({selectedKey}:ContentPageProps) => {
  const anchorRef =useRef<HTMLDivElement>(null)

  const [mdContent , setMdContent] = useState<string>('')
  const [items ,setItems] = useState<{ key: string; href: string; title: string }[]>([])
  //获取指定文章  
  useEffect(()=>{
    let mdPath='';
    switch(selectedKey){
      case '11' :
        mdPath='/Content/11.md'
        break
      case '12' :
        mdPath='/Content/12.md'
        break  
      case '21' :
        mdPath='/Content/21.md'
        break           
      case '22' :
        mdPath='/Content/22.md'
        break        
      case '231':
        mdPath='/Content/231.md'
        break    
    }
    if (mdPath) {
      axios.get(mdPath)
        .then(res => setMdContent(res.data))
    } else {
      setMdContent('暂无内容');
    }
  },[selectedKey])
  //确定右侧的锚点
  useEffect(()=>{
    if (!mdContent || !anchorRef.current) return;
    const anchors: { key: string; href: string; title: string }[] = [];
    anchorRef.current
      .querySelectorAll('h1, h2, h3')
      .forEach(el => {
        if (!el.id) return; 
        anchors.push({
          key: el.id,
          href: `#${el.id}`,       
          title: el.textContent || '',
        });
      });
    setItems(anchors);
  }, [mdContent]);
  

  return (
    <Row wrap={false}>
      <Col  flex='auto'>
        <div ref={anchorRef} className="prose max-w-none pr-5">
          {/* 你当前选择的是{selectedKey} */}
          <Markdown remarkPlugins={[remarkGfm]}  rehypePlugins={[rehypeSlug]} >{mdContent}</Markdown>          
        </div>
      </Col>
      <div className='hidden lg:block'>
        <Col flex='200px'>
          <Anchor 
            items={items}
          />
        </Col>
      </div>
      
  </Row>
  )
}

export default ContentPage