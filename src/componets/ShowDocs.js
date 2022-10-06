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

        try {
            const response = await fetch(`${docModel.baseUrl}/text`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            const docs = await response.json();


            setDocs(docs);

        } catch (err) {
            console.log("no docs")
        }




    }


    /* async function fetchDocs2() {
         //const allDocs = await docModel.getAllDocs();
 
 
         const response = await fetch(`${docModel.baseUrl}/graphql`, {
             method: "POST",
             headers: {
                 "Content-Type": "application/json",
                 'Accept': 'application/json',
             },
             body: JSON.stringify({ query: GET_DOC })
         });
         const res = await response.json();
 
         const docs = res.data.docsbyUserId
 
 
         setDocs(docs);
 
 
     };*/





    useEffect(() => {
        (async () => {
            await fetchDocs();


        })();
    }, []);

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
