import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import userModel from "../models/users";

const REG_URL = '/users/reg'


export default function RegisterForm() {
    const navigate = useNavigate()
    const [informa, setInforma] = useState({
        firstname: '',
        lastname: '',
        username: '',
        password: ''
    })

    const { firstname, lastname, username, password } = informa

    const handleForm = (e) => {
        setInforma((stateInfo) => ({
            ...stateInfo,
            [e.target.name]: e.target.value

        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await userModel.regUser(informa)
            console.log(informa)
            navigate(`/create`)


        } catch (err) {
            alert("Server down or Username most likely taken. Try adding another username")
        }

        setInforma({
            firstname: '',
            lastname: '',
            username: '',
            password: ''

        })

    }

    return (
        <form onSubmit={handleSubmit}>

            <h3> Sign Up</h3>
            <label htmlFor="firstname">First Name</label>
            <input type="text" placeholder="First Name" id="firstname" name="firstname" value={firstname} onChange={handleForm} />

            <label htmlFor="lastname">Last Name</label>
            <input type="text" placeholder="Last Name" id="lastname" name="lastname" value={lastname} onChange={handleForm} />

            <label htmlFor="username">Username</label>
            <input type="email" placeholder="Email" id="username" name="username" value={username} onChange={handleForm} required />

            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" id="password" name="password" value={password} onChange={handleForm} required />


            <button className="button-5">Register</button>

        </form>
    )
}