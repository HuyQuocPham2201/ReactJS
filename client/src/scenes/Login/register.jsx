import React from 'react'
import { useState } from 'react';
function Register() {
    const {email, setEmail} = useState('');
    const {pass, setPass} = useState('');
    const {name, setName} = useState('');

    const handleSubmit = (e) => 
    {   
        e.preventDefault();
        console.log(email);
    }
  return (
    <>
   <form onSubmit={handleSubmit}>
    <label form = "name">Full Name</label>
    <input type ="name" value = {name}/>
    <label form = "email">email</label>
     <input value = {email} type = "email" placeholder='youremail@gmail.com' id = "email" name = "email" /> 
     <label form = "password">password</label>
     <input value = {pass} type = "password" placeholder='********' id = "password" name = "password" /> 
     <button type = "submit">Login</button>
   </form>
   <div>You have not created Account?</div>
   <button>Register</button>
   </>
  )
}

export default Register
