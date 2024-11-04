import { useCallback, useEffect, useMemo, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment';
import { calculateBonusPoints } from '../../../utils/functions/functions';

function BonusPopup({ user, vendoPackage, onClose }) {
  const [show, setShow] = useState(false);
  const today = moment();
  const dayOfMonth = today.date();
  const vendoDashboard = process.env.REACT_APP_VENDO_USER_DASHBOARD;


  const sound = useMemo(() => new Audio('/audio/success.mp3'), []);

  useEffect(() => {
    // Show popup if it's between the 1st and 4th day of the month
    if ([1, 2, 3, 4].includes(dayOfMonth)) {
      setShow(true);
    }
  }, [dayOfMonth]);

  // Function to handle closing the modal and playing sound after user interaction
  const handleClose = () => {
    sound.play().catch((error) => {
    //   console.error("Audio play failed:", error);
    });
    setShow(false);
    onClose()
  };

  // Determine the message based on the user's upgrade status
  const getMessage = () => {
    if (vendoPackage?.data?.prev_package !== 'proplus' && vendoPackage?.data?.prev_package !== null && vendoPackage?.data?.package_level === 'proplus') {
        return `Congratulations on upgrading! Your new bonus points are ${user?.rank?.bonus_points}.`;
    }

    if (vendoPackage?.data?.package_level !== 'proplus') {
      return `Upgrade to ProPlus to earn an additional ${calculateBonusPoints('proplus') * user.completedTasksThisMonth} points!`;
    }

    return `Congrats, you are a ProPlus Member do more task to earn more VQ Bonus.`;
  };

  const goToVendoUpgrade = useCallback(() => {
    window.open(`${vendoDashboard}/upgrade`, '__blank');
  }, [vendoDashboard]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>🎉 Special Upgrade Bonus Alert! 🎉</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{getMessage()}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button className='btn btn-primary' onClick={goToVendoUpgrade}>
          Learn More About Upgrading
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BonusPopup;
