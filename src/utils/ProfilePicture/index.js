function ProfilePicture({ gender, photo }) {
  const male = '/images/avatar/gamer.png';
  const female = '/images/avatar/female.png';
  const blank = '/images/avatar/blank.png';
  if (gender === 'Male' && !photo) {
    return male;
  }
  if (gender === 'Female' && !photo) {
    return female;
  }
  if (photo) {
    return `${photo}`;
  }

  return blank;
}

export default ProfilePicture;
