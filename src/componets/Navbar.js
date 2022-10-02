import { Link } from 'react-router-dom'
import useUser from '../hooks/useUser';

const Navbar = () => {
    const { auth } = useUser()

    return (

        < header >
            <nav className='nav'>

                {/*open routes */}
                <Link to="/">
                    <h1>Home</h1>
                </Link>


                {/*protected routes */}
                {auth.username ?
                    <>
                        <Link to="/create">
                            <h1>Create</h1>
                        </Link>

                        <Link to="/documents">
                            <h1>Documents</h1>
                        </Link>
                        <Link to="/logout">
                            <h1>Log Out</h1>
                        </Link>
                    </>

                    : <> <Link to="/register">
                        <h1>Sign up</h1>
                    </Link>

                        <Link to="/login">
                            <h1>Log In</h1>
                        </Link></>}




            </nav>
        </header >
    )
}


export default Navbar;