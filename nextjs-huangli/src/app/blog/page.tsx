import Link from 'next/link'
import React from 'react'

const page = () => {
  const allBlog = [
    {
      id: 1,
      name: '第一篇文章',
      summary: 'HelloWorld',
    },
    {
      id: 2,
      name: '第二篇文章',
      summary: 'HelloWorld',
    },
    {
      id: 3,
      name: '第三篇文章',
      summary: 'HelloWorld',
    },
  ]

  return (
    <div>
      <p>LopBlog</p>
      <div className='mb-5'>欢迎来到我的博客导航!</div>
      {allBlog.map((i) => (
        <div key={i.id}>
          <Link href={`blog/${i.id}`} className="text-[24px] text-red-500">{i.name}</Link >
          <p className="ml-5">{i.summary}</p>
        </div>
      ))}
      <div className='mt-5'>
        <Link href="/" >返回主页</Link>
      </div>
    </div>
  )
}

export default page
