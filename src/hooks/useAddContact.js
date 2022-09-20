import { useState, useEffect } from 'react';
import { showError, showSuccess } from '../utils/notification';
import { useAddContactMutation, useGetContactsQuery } from '../redux/api';
import { normalizedName } from 'services/normalizedName';
import { validationPhone } from 'services/validationPhone';

export const useAddContact = () => {
  const { data: contacts } = useGetContactsQuery();
  const [addContact, { isError, isLoading, isSuccess }] =
    useAddContactMutation();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const handleChangeName = e => setName(e.currentTarget.value);
  const handleChangePhone = e => setPhone(e.currentTarget.value);

  const handleAddContact = event => {
    event.preventDefault();

    const contactsName = contacts.map(contact => contact.name);

    const isMatchName = contactsName.some(
      contactName => contactName.toLowerCase() === name.toLowerCase()
    );

    if (isMatchName) {
      setNameError(true);
      return showError(`${name} is already in contacts`);
    } else {
      setNameError(false);
    }

    const isValidationPhoneError = validationPhone(phone);

    if (isValidationPhoneError) {
      return setPhoneError(true);
    }

    const newContact = {
      name: normalizedName(name),
      number: phone,
    };

    addContact(newContact);
  };

  useEffect(() => {
    if (isSuccess) {
      showSuccess('Contact added');
      reset();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      showError(`Ups! Something was wrong`);
    }
  }, [isError]);

  const reset = () => {
    setName('');
    setPhone('');
    setNameError(false);
    setPhoneError(false);
  };

  return {
    name,
    phone,
    handleAddContact,
    handleChangeName,
    handleChangePhone,
    isLoading,
    nameError,
    phoneError,
  };
};
