import { Link, NavigateFunction, useNavigate } from "react-router-dom"
import { removeCookie } from "../../cookie"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { logoutUser } from "../../features/user/userSlice"


const Header = () => {
    const navigation = useNavigate()
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

  return (
    <header>
        <nav>
            <ul>
                <li><Link to="/">Tickets</Link></li>

                {!user.data.accessToken && (
                    <>
                    <li><Link to="/login">Login</Link></li>
                    </>
                )}

                {user.data.accessToken && (
                    <>
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
    </header>
  )
}

function onLogout() {
    
    
}

export default Header