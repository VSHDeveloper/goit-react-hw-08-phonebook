import { useEffect } from 'react';
import { useSelector } from 'react-redux';
//Material UI
import Box from '@mui/material/Box';
//Local import
import ContactItem from '../ContactItem/ContactItem';
import style from './ContactList.module.scss';
import { useGetContactsQuery } from 'redux/api';
import { getFilter } from 'redux/contacts/contactsSelectors';

const ContactList = () => {
  const { data: contacts, isError, refetch } = useGetContactsQuery();

  const filter = useSelector(getFilter);

  const getFilteredContacts = () => {
    const normalizeFilter = filter.toLowerCase().trim();

    return contacts?.filter(({ name }) =>
      name.toLowerCase().includes(normalizeFilter)
    );
  };

  const visibleContacts = getFilteredContacts();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Box
      component="ul"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: 1,
        width: '100%',
        marginTop: 2,
      }}
    >
      {contacts && (
        <>
          {visibleContacts.length !== 0 ? (
            visibleContacts.map(contact => {
              return <ContactItem key={contact.id} contact={contact} />;
            })
          ) : (
            <li className={style.error}>Not found name</li>
          )}
        </>
      )}

      {isError && <li>Ups, something was wrong! Reload page, please</li>}
    </Box>
  );
};

export default ContactList;
