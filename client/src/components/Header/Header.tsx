import { Link, NavigateFunction, useNavigate } from "react-router-dom"
import { getCookie, removeCookie } from "../../cookie"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { logoutUser } from "../../features/user/userSlice"
import { useEffect } from "react"


const Header = () => {
    const navigation = useNavigate()
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    let accessToken = getCookie("accessToken")  

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
    </header>
  )
}


export default Header