 
function ProfilePicture({ gender, photo }) {
    const male = '/images/avatar/gamer.png';
    const female = '/images/avatar/female.png';
    const blank = '/images/avatar/blank.png';
    if (gender === 'Male' && !photo) {
        return male;
    }
    else if (gender === 'Female' && !photo) {
        return female;
    }
    else if (photo) {
        return `${photo}`
    }
    else {
        return blank;
    }
}

export default ProfilePicture