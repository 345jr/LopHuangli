import { FaArrowUp } from "react-icons/fa6";
const UpBall = () => {
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
  return (
    <div onClick={handleClick} className="right-10 bottom-10 fixed bg-[#FFFFFF] shadow-xl/30 w-10 h-10 rounded-full flex justify-center cursor-pointer">
        <FaArrowUp size={24} className="text-[#57534e]  mt-2" />
    </div>
  )
}

export default UpBall