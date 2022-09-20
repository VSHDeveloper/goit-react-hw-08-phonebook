import { showError } from '../utils/notification';

export const validationPhone = phone => {
  if (phone.length < 7 || phone === '') {
    showError('Phone must have 7 character min');
    return true;
  } else {
    return false;
  }
};
