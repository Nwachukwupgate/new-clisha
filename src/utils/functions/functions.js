export const shortenWalletID = (wallet) => {
  if (wallet) {
    const firstThree = wallet.slice(0, 3);
    const lastThree = wallet.slice(wallet.length - 3, wallet.length);

    return `${firstThree}...${lastThree}`;
  }
  return '';
};

export const pointsToDollar = (points) => {
  const ratePerPoint = 0.4; // change later to actual rate
  const pointValue = points ? parseFloat(points) : 0;

  return (ratePerPoint * parseFloat(pointValue)).toFixed(2);
};

export const formatDuration = (seconds) => {
  if (Number.isNaN(seconds) || seconds == null) return "30 secs";

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const result = [];
  if (hrs > 0) result.push(`${hrs} hr${hrs > 1 ? "s" : ""}`);
  if (mins > 0) result.push(`${mins} min${mins > 1 ? "s" : ""}`);
  if (secs > 0) result.push(`${secs} sec${secs > 1 ? "s" : ""}`);

  return result.length > 0 ? result.join(", ") : "0 secs";
};

export const openInNewTab = (url) => {
  window.open(url, "_blank", "noreferrer");
};

export const calculateBonusPoints = (packageLevel) => {
  const multipliers = {
    basic: 10,
    plus: 20,
    pro: 40,
    proplus: 100,
  };
  return multipliers[packageLevel] || 1;
}

export const validateSignupForm = (signupDetails, isDev) => {
  const errors = {};

  // First Name Validation
  if (!signupDetails.firstname.trim()) {
    errors.firstname = 'First name is required.';
  } else if (!isDev && /\d/.test(signupDetails.firstname)) {
    errors.firstname = 'First name cannot contain numbers.';
  }

  // Last Name Validation
  if (!signupDetails.lastname.trim()) {
    errors.lastname = 'Last name is required.';
  } else if (!isDev && /\d/.test(signupDetails.lastname)) {
    errors.lastname = 'Last name cannot contain numbers.';
  }

  // Email Validation
  if (!signupDetails.email.trim()) {
    errors.email = 'Email is required.';
  }

  // Password Validation
  if (signupDetails.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }

  // Confirm Password Validation
  if (signupDetails.password !== signupDetails.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
};