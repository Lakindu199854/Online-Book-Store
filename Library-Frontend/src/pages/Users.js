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
        try{ const res=await createUser(data);
            console.log("res is :"+res);
            setPassword("");
            setUsername("");
            setEmail("");

            if(res){
                console.log("123")
            }
            if(res.success){
                console.log("321")
            }

            if(res && res.success){
                setSuccessMessage("User Successfully Saved")
            }else{
                console.log(1)
                setSuccessMessage("User Not Added")
            }
        }catch(error){
            console.log(error);
            setSuccessMessage("User Not Added")

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
            <p className={successMessage==="User Not Added" ? "error_message" :""}>{successMessage}</p>
            
        </Form>
      );


    
}
export default Users;