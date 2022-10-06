import { useQuery } from "@apollo/client"
import { DOCS_BY_USER_ID } from "../graphql/document"
import useUser from '../hooks/useUser';
import DocTable from './DocTable';



export default function Docs() {
    const { auth } = useUser()
    const user = auth._id
    console.log(user)
    const { loading, error, data } = useQuery(DOCS_BY_USER_ID,
        { variables: { user: user } })
    console.log(data)

    if (loading) return <p>Loding..</p>
    if (error) return <p>Error</p>

    let docTable = data.docsbyUserId.map((doc, index) => {
        return <DocTable doc={doc} key={index} />
    })


    return (

        <>
            {!loading && !error && (

                <div className='grid-doc'>
                    {docTable}

                </div>
            )
            }
        </>

    )
};