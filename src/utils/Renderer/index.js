// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  //   console.log(hours, minutes, seconds, completed);
  if (completed) {
    // Render a completed state
    return (
      <div className="text-center ">
        <span id="rewardId" />
      </div>
    );
  }
  // Render a countdown
  return (
    <div className="count-down" id="count_down">
      <div className="span_text">
        <span>
          {hours !== 0 && <span> {hours} :</span>}
          {minutes !== 0 && <span>{minutes} :</span>}
          {seconds !== 0 && <span>{seconds}</span>}
        </span>
        <small className="text-warning d-block pb-1">
          If this window is closed you will lose your bonus
        </small>
      </div>
    </div>
  );
};

export default renderer;
