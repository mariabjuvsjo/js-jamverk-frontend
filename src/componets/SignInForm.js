import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import userModel from "../models/users";
import useUser from "../hooks/useUser";


export default function SignInForm() {
    const navigate = useNavigate()
    const { setAuth } = useUser()


    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [informa, setInforma] = useState({
        username: '',
        password: ''
    })

    const { username, password } = informa

    const handleForm = (e) => {
        setInforma((stateInfo) => ({
            ...stateInfo,
            [e.target.name]: e.target.value

        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const loginRes = await userModel.loginUser(informa)

            console.log(loginRes)
            if (loginRes.token) {
                setAuth(loginRes)

            }
            navigate(from, { replace: true });


        } catch (err) {
            alert("no username or password")
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>

                <h3> Log In</h3>

                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Email" id="username" name="username" value={username} onChange={handleForm} />

                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password" name="password" value={password} onChange={handleForm} />

                <button className="button-5">Log In</button>
                <p>Not a User?</p>
                <Link to="/register">
                    <h1>Sign up</h1>
                </Link>

            </form>

        </>
    )
}