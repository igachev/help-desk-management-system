import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../userSlice"


const RegisterView = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email,setEmail] = useState<string>()
    const [password,setPassword] = useState<string>()

    function onRegister(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(registerUser({email,password,navigation:navigate}))
    }
  return (
    <section>
    <h2>Register Page</h2>
    <div>
        <form method="post" onSubmit={onRegister}>

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
            <input type="submit" value="Register" />
        </div>

        </form>
    </div>
</section>
  )
}

export default RegisterView