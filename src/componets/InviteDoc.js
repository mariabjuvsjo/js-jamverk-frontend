import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import docModel from "../models/docs";
import useUser from '../hooks/useUser';

export default function InviteDoc() {
    const [inputs, setInputs] = useState({
        email: '',
    })
    const { state } = useLocation();
    const docId = (state._id);
    const { auth } = useUser();
    const [invite, setInvite] = useState('');

    const handleForm = (e) => {
        setInvite
            (e.target.value
            )
        setInputs(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }))

        console.log(inputs)

    }

    async function addUser(e) {
        e.preventDefault()

        const res = await fetch(`${docModel.baseUrl}/text/email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(inputs)
        })
        const text = await res.json()

        return text

        console.log(text)

        let allowed_users = invite

        try {
            console.log(typeof allowed_users)
            await docModel.updateOneDoc({ allowed_users }, docId)
        } catch (err) {
            alert("user already added")

        }
    }


    return (
        <div className="users-wrapp"> <h3>Invite a user for this document:  </h3>
            <form onSubmit={addUser}> <input type="text" placeholder="Email" id="email" name="allowed_users" onChange={handleForm} />
                <button lassName="button-5">Send</button>
            </form></div>

    )





}



