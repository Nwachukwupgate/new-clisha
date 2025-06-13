// eslint-disable-next-line import/no-extraneous-dependencies
import Joyride, { STATUS } from 'react-joyride';
import { useTour } from '../context/TourContext';

function SidebarTour() {
  const { triggerTour, setTriggerTour } = useTour();

  const steps = [
    {
      target: '#sidebar-dashboard',
      content: 'Welcome to your dashboard! Click here to view your main summary.',
    },
    {
      target: '#sidebar-task',
      content: 'Manage your tasks here.',
    },
    {
      target: '#sidebar-token',
      content: 'Check your tokens here.',
    },
    {
      target: '#sidebar-wallet',
      content: 'Access your wallet. This is a new feature!',
    },
    {
      target: '#sidebar-team',
      content: 'View and manage your team.',
    },
    {
      target: '#sidebar-rank',
      content: 'Check your rank and progress here.',
    },
    {
      target: '#sidebar-profile',
      content: 'Manage your profile settings.',
    },
    {
      target: '#sidebar-setting',
      content: 'App settings live here.',
    },
    {
      target: '#sidebar-help',
      content: 'Need help? Visit the help center.',
    },
  ];

  const handleJoyrideCallback = (data) => {
  const { status } = data;
  const finished = [STATUS.FINISHED, STATUS.SKIPPED].includes(status);
  if (finished) {
    setTriggerTour(false);
    localStorage.setItem("hasSeenTour", "true"); // Mark tour as seen
  }
};

  return (
    <Joyride
      steps={steps}
      run={triggerTour}
      continuous
      showSkipButton
      showProgress
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#5cb85c',
          textColor: '#333',
          width: '300px',
          zIndex: 10000,
        },
        buttonNext: {
          backgroundColor: '#5cb85c',
        },
        buttonBack: {
          backgroundColor: '#ccc',
        },
      }}
      locale={{
        back: 'Back',
        next: 'Next',
        last: 'Done',
        skip: 'Skip',
      }}
      spotlightPadding={10}
      spotlightClicks
    />
  );
}

export default SidebarTour;
