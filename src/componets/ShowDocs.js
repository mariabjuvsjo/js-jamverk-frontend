import React, { useEffect, useState } from 'react';
import docModel from '../models/docs';
import { useNavigate, Link, useParams, generatePath } from "react-router-dom";

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



    return (
        <>

            <table className="doctable">
                <thead>
                    <tr>
                        <th>Doc Name</th>

                        <th>Action</th>

                    </tr>

                </thead>
                <tbody>

                    {docs && docs.map((doc, index) => (
                        <tr>
                            <td key={index + "hello"}>{doc.name}</td>





                            <td>

                                <Link to={"/update/" + doc._id} className="button-5 small" >
                                    Edit
                                </Link></td>


                        </tr>

                    ))}
                </tbody>
            </table>
        </>
    );
}
