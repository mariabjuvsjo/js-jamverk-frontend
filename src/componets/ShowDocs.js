import React, { useEffect, useState } from 'react';
import docModel from '../models/docs';
import DocTable from './DocTable';
//import { useNavigate, Link, useParams, generatePath } from "react-router-dom";

export default
    function ShowDocs() {




    const [docs, setDocs] = useState([]);


    async function fetchDocs() {
        const allDocs = await docModel.getAllDocs();
        setDocs(allDocs);
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
