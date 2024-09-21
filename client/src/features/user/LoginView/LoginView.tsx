import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { useState } from "react"
import { loginUser } from "../userSlice"
import { useNavigate } from "react-router-dom"


const LoginView = () => {
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email,setEmail] = useState<string>()
    const [password,setPassword] = useState<string>()

    function onLogin(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(loginUser({email,password,navigation:navigate}))
    }

  return (
    <section>
        <h2>Login Page</h2>
        <div>
            <form method="post" onSubmit={onLogin}>

            <div>
                <label htmlFor="email">Email:</label>
                <input 
                type="text"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                 />
            </div>

            <div>
                <label htmlFor="password">Password:</label>
                <input 
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                 />
            </div>

            <div>
                <input type="submit" value="Login" />
            </div>

            </form>
        </div>
    </section>
  )
}



export default LoginView