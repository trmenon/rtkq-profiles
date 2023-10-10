import React, {useState, useEffect} from 'react';
import {useGetUsersQuery} from './services/users';
import {
  FaEnvelope,
  FaEnvelopeOpen,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock
} from 'react-icons/fa';
import './App.css';

function App() {
  const [person, setPerson] = useState(null);
  const [value, setValue] = useState("Random Person");
  const [title, setTitle] = useState("Random Title");

  const {data, isLoading, refetch} = useGetUsersQuery();

  useEffect(()=> {
    if(data) {
      const random_person = data.results[0];
      const {phone, email} = random_person;
      const {large: image} = random_person.picture;
      const {password} = random_person.login;
      const {first, last} = random_person.name;
      const {dob: {age}} = random_person;
      const {street: {number, name}} = random_person.location;

      const new_person = {
        image,
        phone,
        email,
        password,
        age,
        street: `${number} , ${name}`,
        name: `${first} ${last}`
      }

      setPerson(new_person);
      setTitle("Name");
      setValue(new_person.name);
    }
    
  }, [data]);


  return (
    <React.Fragment>
      {
        isLoading && (
          <h6>Loading...</h6>
        )
      }
      {
        !isLoading && person !== null &&(
          <>
            <h1>{`${title}: ${value}`}</h1>
            <hr/>
            <img src = {person.image} width= {'300px'} height={'320px'} alt = {''}/>
            <hr/>
            <h6>{`PHONE: ${person.phone}`}</h6>
            <h6>{`Email: ${person.email}`}</h6>
            <h6>{`Age: ${person.age}`}</h6>
            <h6>{`Password: ${person.password}`}</h6>
            <hr/>
            <h3>{`Address`}</h3>
            <h6>{`${person.street}`}</h6>
          </>
        )
      }
    </React.Fragment>
  );
}

export default App;
