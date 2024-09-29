import { Link, useNavigate } from "react-router-dom"
import { getCookie } from "../../cookie"
import { useDispatch } from "react-redux"
import { logoutUser } from "../../features/user/userSlice"
import "./Header.css"

const Header = () => {
    const navigation = useNavigate()
    const dispatch = useDispatch()
    let accessToken = getCookie("accessToken")  
    let userEmail = getCookie('userEmail')

  return (
    <div>
    <header>
        <nav>
            <ul>
                <li><Link to="/">Tickets</Link></li>
                
                {!accessToken && (
                    <>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    </>
                )}

                {accessToken && (
                    <>
                    <li><Link to="/tickets/create">Create Ticket</Link></li>
                    <li>
                <button 
                onClick={() => dispatch(logoutUser({navigation}))}
                >
                    Logout
                </button>
                </li>
                    </>
                )}

            </ul>
        </nav>

        {userEmail && (
            <div className="welcome-msg">
                <h4>Welcome, {decodeURIComponent(userEmail)}</h4>
            </div>
        )}

        

    </header>

    <div className="mission">
            <h4>Our mission is to solve the problems you encounter</h4>
            <h5>Your feedback is important for us</h5>
    </div>

    </div>
  )
}


export default Header