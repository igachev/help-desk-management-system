import { act, render, screen } from "@testing-library/react";
import axiosInstance from "../../../axiosInstance";
import { fetchTicket, Ticket } from "../ticketSlice"
import { Provider } from "react-redux";
import store from "../../../app/store";
import { BrowserRouter } from "react-router-dom";
import TicketView from "./TicketView";
import '@testing-library/jest-dom'

describe("TicketView Component",() => {

    let mockTicket: Ticket = {
        id: 3,
        ticketTitle: "Problem with an order",
        ticketDescription: "I didnt receive my shipment",
        createdAt: new Date("2024-09-15T15:50:42.529+00:00"),
        resolved: true
    }

    afterEach(() => {
        jest.clearAllMocks()
    });

    describe("Testing Guest user functionality",() => {


       test("should display correct ticket details data",async() => {
        let spyGetTicket = jest.spyOn(axiosInstance,"get").mockResolvedValue({data: mockTicket})

        render(
            <Provider store={store}>
               <BrowserRouter>
                    <TicketView />
               </BrowserRouter> 
            </Provider>
        )

        await act(() => {
            store.dispatch(fetchTicket(mockTicket.id))
        })

        // screen.debug()
        const ticketTitle = await screen.findByText(new RegExp(mockTicket.ticketTitle))
        const createdAt = await screen.findByText(new RegExp(mockTicket.createdAt.toDateString()))
        const ticketDescription = await screen.findByText(new RegExp(mockTicket.ticketDescription))
        const isTicketResolved = await screen.findByText(new RegExp(mockTicket.resolved.toString()))

        expect(ticketTitle).toBeInTheDocument()
        expect(createdAt).toBeInTheDocument()
        expect(ticketDescription).toBeInTheDocument()
        expect(isTicketResolved).toBeInTheDocument()

       });

       test("should display loading message if ticket details is still loading",async() => {
        let spyGetTicket = jest.spyOn(axiosInstance,"get").mockResolvedValue({data: mockTicket})

        render(
            <Provider store={store}>
               <BrowserRouter>
                    <TicketView />
               </BrowserRouter> 
            </Provider>
        )

        
        await act(async() => {
            const loadingMessage = await screen.findByText(new RegExp("Loading..."))
            expect(loadingMessage).toBeInTheDocument()
        })
        
       });


    })

})