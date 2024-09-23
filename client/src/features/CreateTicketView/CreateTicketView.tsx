import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../app/store"
import { createTicket } from "../ticket/ticketSlice"



const CreateTicketView = () => {

    const [ticketTitle,setTicketTitle] = useState<string>("")
    const [ticketDescription,setTicketDescription] = useState<string>("")
    const navigation = useNavigate()
    const user = useSelector((state:RootState) => state.user)
    const userId = user.data.userId
    const dispatch = useDispatch()

    function onCreateTicket(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        dispatch(createTicket({userId,ticketTitle,ticketDescription,navigation}))
    }

  return (
    <section>
        <h2>Create Ticket</h2>
        <form onSubmit={onCreateTicket} method="post">

            <div>
                <label htmlFor="ticketTitle">Ticket Title:</label>
                <input 
                type="text" 
                name="ticketTitle"
                value={ticketTitle}
                onChange={(e) => setTicketTitle(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="ticketDescription">Ticket Description:</label>
                <input 
                type="text" 
                name="ticketDescription"
                value={ticketDescription}
                onChange={(e) => setTicketDescription(e.target.value)}
                />
            </div>

            <div>
                <input type="submit" value="Create" />
            </div>

        </form>
    </section>
  )
}

export default CreateTicketView