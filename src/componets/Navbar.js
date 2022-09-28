import { Link } from 'react-router-dom'

const Navbar = () => {


    return (
        <header>
            <nav className='nav'>
                <Link to="/">
                    <h1>Home</h1>
                </Link>

                <Link to="/show">
                    <h1>Documents</h1>
                </Link>

            </nav>
        </header>
    )
}


export default Navbar;