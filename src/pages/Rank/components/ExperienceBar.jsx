import { useSelector } from 'react-redux';

function ExperienceBar() {
  const experience = useSelector((state) => state.general.experience);
  const per = ((experience?.rank?.current ?? 0) / (experience?.rank?.target ?? 1)) * 100;
  // window.localStorage.setItem("current", experience?.rank?.current)
  // window.localStorage.setItem("target", experience?.rank?.target)
  // window.localStorage.setItem("target", experience?.rank?.target)
  return (
    <div className="experienceBar">
      {/* <div className="points">
                {starsRate.map((item, key) => <div className="starRat d-inline mx-md-5" key={key}>
                    <img src="/images/polypaint.png" alt="" className='star'/>  <span>{item}</span>
                    {item===4 && <img src="/images/rocket.png" alt="" className='rocket' />}
                </div>)}
            </div>  */}

      {/* <AnimateExperience /> */}

      <div className="infoBox  col-md-10 col-12 mx-auto text-center">
        <h5>
          {experience?.rank?.current}/{experience?.rank?.target}
        </h5>
      </div>
      <div className="progresscount  col-md-10 col-12 mx-auto p-0">
        <div className="progress-bar " style={{ width: `${per}%` }} />
      </div>
    </div>
  );
}

export default ExperienceBar;
