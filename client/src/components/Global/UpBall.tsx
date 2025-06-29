import {FaArrowUp} from 'react-icons/fa6'
const UpBall = () => {
  const handleClick = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }
  return (
    <div
      onClick={handleClick}
      className="fixed right-10 bottom-10 flex h-10 w-10 cursor-pointer justify-center rounded-full bg-[#FFFFFF] shadow-xl/30"
    >
      <FaArrowUp size={24} className="mt-2 text-[#57534e]" />
    </div>
  )
}

export default UpBall
