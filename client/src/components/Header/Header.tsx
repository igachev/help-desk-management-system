import { Link, useNavigate } from "react-router-dom"
import { getCookie } from "../../cookie"
import { useDispatch } from "react-redux"
import { logoutUser } from "../../features/user/userSlice"


const Header = () => {
    const navigation = useNavigate()
    const dispatch = useDispatch()
    let accessToken = getCookie("accessToken")  
    let userEmail = getCookie('userEmail')

  return (
    <header>
        <nav>
            <ul>
                <li><Link to="/">Tickets</Link></li>
                
                {!accessToken && (
                    <>
                    <li><Link to="/login">Login</Link></li>
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
            <div>
                <h4>Welcome, {decodeURIComponent(userEmail)}</h4>
            </div>
        )}

    </header>
  )
}


export default Header