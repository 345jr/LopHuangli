const PassData = ({count , randNum ,children}:any) => {
const randomNum = ()=>{
    const random = Math.floor(Math.random()*100)
    console.log(random)
    if(randNum) {
    randNum(random);
    }
}

  return (
    <div>
        <p>PassData计数器 {count}</p>
        <button onClick={randomNum}>PassData 设置一个随机数</button>
        <p>父组件传递过来的文字信息 :{children}</p>
    </div>

  )
}

export default PassData