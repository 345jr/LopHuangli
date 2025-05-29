import CircularSlider from "@fseehawer/react-circular-slider"
const TimeSlider = () => {
    
  return (
    <div className="flex justify-center w-full mt-5">
		<CircularSlider 
        onChange={value => console.log(value)}
        label="时辰 : 凶吉 :"
        min={0}
        max={1440}
        initialValue={500}
        hideLabelValue={false}
        />
	</div>
  )
}

export default TimeSlider