import { Link } from 'react-router-dom'

const Navbar = () => {


    return (
        <header>
            <nav className='nav'>
                <Link to="/">
                    <h1>Home</h1>
                </Link>
                <Link to="/create">
                    <h1>Create</h1>
                </Link>
                <Link to="/show">
                    <h1>Show</h1>
                </Link>

            </nav>
        </header>
    )
}


export default Navbar;