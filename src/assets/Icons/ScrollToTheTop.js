import { Button } from 'react-bootstrap';

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button
      onClick={scrollToTop}
      style={{
        backgroundColor: '#fc9828',
        borderColor: '#fc9828',
        borderRadius: '50%',
        padding: '10px',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      aria-label="Scroll to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="gray"
        viewBox="0 0 24 24"
      >
        <path d="M12 4l-7 7h14l-7-7z" />
      </svg>
    </Button>
  );
};

export default ScrollToTopButton;
