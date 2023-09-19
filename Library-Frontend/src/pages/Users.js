import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import './css/users.css';
import Button from 'react-bootstrap/Button';
import { createUser } from './services/userServices';


const Users=()=>{


    const [Username,setUsername]=useState(null);
    const [Password,setPassword]=useState(null);
    const [email,setEmail]=useState(null);
    const [successMessage,setSuccessMessage]=useState("");



    const handleSubmit=async(event)=>{
        event.preventDefault();
        const data = {
        
            "username": Username,
            "password": Password,
            "email": email
        }
        const res=await createUser(data);
        console.log(res);
        if(res){
            setPassword("");
            setUsername("");
            setEmail("");
            setSuccessMessage("User Successfully Saved")
        }
    }

    return( 
       <Form onSubmit={handleSubmit}>
           <Form.Group className="mb-3" controlId="formGroupUserName">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={Username} placeholder="Username" onChange={(event)=>{
                    setUsername(event.target.value)
                }} onClick={()=>{
                    setSuccessMessage("")
                }}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" value={email} placeholder="Enter email" onChange={(event)=>{
                    setEmail(event.target.value)
                }} onClick={()=>{
                    setSuccessMessage("")
                }}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={Password} placeholder="Password" onChange={(event)=>{
                    setPassword(event.target.value)
                }}onClick={()=>{
                    setSuccessMessage("")
                }} />
            </Form.Group> 
            <Button className='CreateUserButton' type='submit'  variant="primary" >Create User</Button>{' '}
            <p>{successMessage}</p>
            
        </Form>
      );


    
}
export default Users;