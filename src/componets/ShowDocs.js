import React, { useEffect, useState } from 'react';
import docModel from '../models/docs';
import DocTable from './DocTable';
import CodeTable from './CodeTable';
import useUser from '../hooks/useUser';
//import { useNavigate, Link, useParams, generatePath } from "react-router-dom";

export default
    function ShowDocs() {

    const { auth } = useUser()

    const [docs, setDocs] = useState([]);

    const [codeDocs, setCodeDocs] = useState([]);

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

            let codeMode = [];

            let textMode = [];

            accessDocs.forEach(d => {
                if (d.docType.includes("code")) {
                    codeMode.push(d)
                }

            })

            accessDocs.forEach(d => {
                if (d.docType.includes("text")) {
                    textMode.push(d)
                }
            })


            setDocs(textMode);

            setCodeDocs(codeMode)

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

    let codeTable = codeDocs.map((doc, index) => {
        return <CodeTable doc={doc} key={index} />
    })



    return (
        <>
            <div className='flex' >
                <div className='column'>
                    <div className='grid-doc'>
                        {docTable}
                    </div>
                </div>
                <div className='column'>
                    <div className='grid-doc'>
                        {codeTable}
                    </div>
                </div>
            </div ></>

    );






}
