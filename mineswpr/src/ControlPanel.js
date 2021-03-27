
const zeroPad = (num, places) => String(num).padStart(places, '0');

const controlPanel = (props) => {
  const min = Math.floor(props.seconds / 60);
  const secs = props.seconds % 60;

  return (
    <div className='Control'
    style={{color: '#adadad'}}
    >
    Flag count:{zeroPad(props.flagCnt)}  Time:{zeroPad(min, 2)}:{zeroPad(secs, 2)}
    </div>
  );
}

export default controlPanel;
