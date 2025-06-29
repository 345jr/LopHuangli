import {Button, Result} from 'antd'
import {Link} from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="页面找不到."
        extra={
          <Button type="primary">
            <Link to={'/'}>返回</Link>
          </Button>
        }
      />
    </>
  )
}

export default NotFoundPage
