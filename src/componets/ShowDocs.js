import React, { useEffect, useState } from 'react';
import docModel from '../models/docs';
import DocTable from './DocTable';
import useUser from '../hooks/useUser';
//import { useNavigate, Link, useParams, generatePath } from "react-router-dom";

export default
    function ShowDocs() {

    const { auth } = useUser()

    const [docs, setDocs] = useState([]);

    console.log(auth._id)

    const GET_DOC = `
   {
        docsbyUserId(user: "${auth._id}") {
          name,
          id
        }
      }
    `




    async function fetchDocs() {
        //const allDocs = await docModel.getAllDocs();
        let accessDocs = []

        try {
            const response = await fetch(`${docModel.baseUrl}/text`);
            const docs = await response.json();

            console.log(docs)

            docs.forEach(doc => {
                if (doc.user.includes(auth._id) || doc.allowed_users.includes(auth.username)) {
                    accessDocs.push(doc)
                }
            });

            console.log(accessDocs)


            setDocs(accessDocs);

        } catch (err) {
            console.log("no docs")
        }




    }

    useEffect(() => {
        (async () => {
            await fetchDocs();


        })();
    }, []);

    console.log(docs)

    let docTable = docs.map((doc, index) => {
        return <DocTable doc={doc} key={index} />
    })


    if (docTable.length > 0) {
        return <div className='grid-doc'>
            {docTable}

        </div>;
    } else {
        return <p>No documents created</p>;
    }







}
