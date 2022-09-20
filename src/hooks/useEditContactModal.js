import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
//Local import
import { showError, showSuccess } from 'utils/notification';
import { useEditContactMutation, useGetContactsQuery } from 'redux/api';
import { normalizedName } from 'services/normalizedName';
import { validationPhone } from 'services/validationPhone';

export const useEditContactModal = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();

  const { data: contacts } = useGetContactsQuery();

  const prevContact = contacts
    .filter(({ id }) => id === contactId)
    .reduce((_, contact) => contact, {});

  const [editContact, { isError, isSuccess }] = useEditContactMutation();

  const [name, setName] = useState(prevContact.name);
  const [phone, setPhone] = useState(prevContact.number);
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const handleChangeName = e => setName(e.currentTarget.value);
  const handleChangePhone = e => setPhone(e.currentTarget.value);

  const handleEditContact = event => {
    event.preventDefault();

    if (prevContact.name === name && prevContact.number === phone) {
      navigate('/contacts');
      return;
    }

    const contactsName = contacts.map(contact => contact.name);

    const isMatchName = contactsName.some(
      contactName => contactName.toLowerCase() === name.toLowerCase()
    );

    if (isMatchName && prevContact.name !== name) {
      setNameError(true);
      return showError(`${name} is already in contacts`);
    } else {
      setNameError(false);
    }

    const isValidationPhoneError = validationPhone(phone);

    if (isValidationPhoneError) {
      return setPhoneError(true);
    }

    const newEditContact = {
      name: normalizedName(name),
      number: phone,
    };

    editContact({ id: prevContact.id, payload: { ...newEditContact } });
  };

  useEffect(() => {
    if (isSuccess) {
      showSuccess('Contact update');
      navigate('/contacts');
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      showError(`Ups! Something was wrong`);
    }
  }, [isError]);

  return {
    name,
    phone,
    nameError,
    phoneError,
    handleChangeName,
    handleChangePhone,
    handleEditContact,
  };
};
