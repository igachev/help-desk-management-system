import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { RootState } from "../../app/store"
import { editTicket, fetchTicket } from "../ticket/ticketSlice"
import { useEffect, useState } from "react"


const EditTicketView = () => {

const {ticketId} = useParams()
const navigation = useNavigate()
const ticket = useSelector((state: RootState) => state.ticket)
const user = useSelector((state: RootState) => state.user)
const dispatch = useDispatch()
const [ticketTitle,setTicketTitle] = useState<string>(ticket.data.ticket.ticketTitle)
const [ticketDescription,setTicketDescription] = useState<string>(ticket.data.ticket.ticketDescription)
const userId = user.data.userId

useEffect(() => {
    dispatch(fetchTicket({ticketId}))
},[])

function onEdit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch(editTicket({userId,ticketId,ticketTitle,ticketDescription,navigation}))
}

  return (
    <article>
        <h2>Edit Ticket</h2>
        <form onSubmit={onEdit} method="post">
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
                <textarea 
                name="ticketDescription"
                value={ticketDescription}
                onChange={(e) => setTicketDescription(e.target.value)}
                >
                </textarea> 
            </div>

            <div>
                <input type="submit" value="Edit" />
            </div>
        </form>
    </article>
  )
}

export default EditTicketView