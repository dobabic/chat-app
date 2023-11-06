import { useEffect, useState } from 'react';
import { getContacts } from '../../../firebase-utils';
import './style.scss'

const defaultImage = "https://placehold.co/200x200";

function Contact({contact, onClick}) {
    function handleClick() {
        onClick(contact)
    };
    return (
        <div className='contact' onClick={handleClick}>
            <img
                src={contact.image || defaultImage}
                alt='Contact Image' />
            <span className='contact-name'>{contact}</span>
        </div>
    );
};

export default function ContactList({onContactClick}) {
    const [contacts, setContacts] = useState([])

    useEffect( () => {
        getContacts()
            .then(setContacts)
            .catch((err)=> console.log(err));
    }, []);

    return (
            <div className="contactList">
                {contacts.map((contact) => (
                    <Contact key={contact.id} contact={contact.name} onClick={onContactClick} />
                ))}
            </div>
    );
};
