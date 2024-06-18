import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getContacts, createContact, deleteContact, updateContact, getContactById } from '../services/api';
import {jwtDecode} from 'jwt-decode';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from './Dashboard.module.css';
import EmailIcon from '@mui/icons-material/Email';
import SearchIcon from '@mui/icons-material/Search';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({ name: '', email: '', number: '' });
  const [currentUser, setCurrentUser] = useState('');
  const [editId, setEditId] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchNumber, setSearchNumber] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setCurrentUser(decoded.user.username);
      fetchContacts();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchContacts = async () => {
    try {
      const data = await getContacts();
      const filteredContacts = data.filter(contact => {
        return (
          (searchName === '' || contact.name.toLowerCase().includes(searchName.toLowerCase())) &&
          (searchEmail === '' || contact.email.toLowerCase().includes(searchEmail.toLowerCase())) &&
          (searchNumber === '' || contact.number.includes(searchNumber))
        );
      });
      setContacts(filteredContacts);
    } catch (error) {
      console.error(error);
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [searchName, searchEmail, searchNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateContact(editId, contact);
      } else {
        await createContact(contact);
      }
      fetchContacts();
      setContact({ name: '', email: '', number: '' });
      setEditId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const contact = await getContactById(id);
      setContact(contact);
      setEditId(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      fetchContacts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={styles.main} style={{ marginTop: '0px' }}>
      <div className={styles.navbar}>
        <h2>CM</h2>
        <p style={{ fontSize: '1.5rem' }}>
          Manage Your Contacts, <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>{currentUser}</span>!
        </p>
        <p>
          <button className={styles.submit} onClick={handleLogout}><LogoutIcon /></button>
        </p>
      </div>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <input className={styles.inputField} type="text" placeholder="Name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} required />
        <input className={styles.inputField} type="email" placeholder="Email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} required />
        <input className={styles.inputField} type="text" placeholder="Number" value={contact.number} onChange={(e) => setContact({ ...contact, number: e.target.value })} required />
        <button className={styles.submitButton} type="submit">{editId ? 'Update' : 'Create'} Contact</button>
      </form>
      <div className={styles.filterContainer}>
        <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <SearchIcon/>
          <input
            className={styles.inputField}
            type="text"
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <EmailIcon/>
          <input
            className={styles.inputField}
            type="text"
            placeholder="Search by Email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
        </div>
        <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <LocalPhoneIcon/>
          <input
            className={styles.inputField}
            type="text"
            placeholder="Search by Phone Number"
            value={searchNumber}
            onChange={(e) => setSearchNumber(e.target.value)}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ul className={styles.contactList}>
          <li className={styles.contactHeader}>
            <span className={styles.contactInfo}>Name</span>
            <span className={styles.contactInfo}>Email</span>
            <span className={styles.contactInfo}>Phone Number</span>
            <span>Action</span>
          </li>
          {contacts.map(contact => (
            <li className={styles.contactItem} key={contact._id}>
              <span className={styles.contactInfo}>{contact.name}</span>
              <span className={styles.contactInfo}>{contact.email}</span>
              <span className={styles.contactInfo}>{contact.number}</span>
              <div>
                <button onClick={() => handleEdit(contact._id)}><EditIcon /></button>
                <button onClick={() => handleDelete(contact._id)}><DeleteIcon /></button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
