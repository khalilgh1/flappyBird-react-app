import { Link } from 'react-router-dom';
import './navbar.scss';
import '../../node_modules/animate.css';

function Navbar() {
    return (
        <ul className='navbar animate__animated animate__bounceInDown'>
            <li>
                <Link to="/">
                    <i className="icon fa-solid fa-house"></i>
                    Home
                </Link>
            </li>
            <li>
                <Link to="/game">  {/* Change from './game' to '/game' */}
                    <i className="icon fa-solid fa-gamepad"></i>
                    Game
                </Link>
            </li>
        </ul>
    );
}

export default Navbar;
