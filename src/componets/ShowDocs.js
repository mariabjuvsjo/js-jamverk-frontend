import React, { useEffect, useState } from 'react';
import docModel from '../models/docs';
import DocTable from './DocTable';
import useUser from '../hooks/useUser';
//import { useNavigate, Link, useParams, generatePath } from "react-router-dom";

export default
    function ShowDocs() {

    const { auth } = useUser()

    const [docs, setDocs] = useState([]);




    async function fetchDocs() {
        //const allDocs = await docModel.getAllDocs();


        const response = await fetch(`${docModel.baseUrl}/text`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
        });
        const docs = await response.json();


        setDocs(docs);
    }


    useEffect(() => {
        (async () => {
            await fetchDocs();


        })();
    }, []);

    let docTable = docs.map((doc, index) => {
        return <DocTable doc={doc} key={index} />
    })

    return (



        <div className='grid-doc'>
            {docTable}

        </div>


    );
}
