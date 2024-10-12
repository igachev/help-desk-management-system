import { useDispatch } from "react-redux"
import { useState } from "react"
import { loginUser } from "../userSlice"
import { useNavigate } from "react-router-dom"
import "./LoginView.css"

const LoginView = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email,setEmail] = useState<string>()
    const [password,setPassword] = useState<string>()

    function onLogin(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(loginUser({email,password,navigation:navigate}))
    }

  return (
    <section className="login-section">
        <h2>Login Page</h2>
        <div className="form-border">
            <form method="post" onSubmit={onLogin}>

            <div className="row">
                <div className="label-container">
                <label htmlFor="email">Email:</label>
                </div>
                <input 
                type="text"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                 />
            </div>

            <div className="row">
                <div className="label-container">
                <label htmlFor="password">Password:</label>
                </div>
                <input 
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                 />
            </div>

            <div className="row">
                <input type="submit" value="Login" />
            </div>

            </form>
        </div>
    </section>
  )
}



export default LoginView