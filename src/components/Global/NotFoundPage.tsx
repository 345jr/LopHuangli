import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <div>页面找不到</div>
      <Link to={"/"}>
        <button>返回</button>
      </Link>
    </>
  );
};

export default NotFoundPage;
