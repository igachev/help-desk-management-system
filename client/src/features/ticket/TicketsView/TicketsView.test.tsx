
import { Content, Ticket } from "../ticketSlice";
import TicketsView from "./TicketsView";
import * as ticketActions from "../ticketActions"
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux";
import axiosInstance from "../../../axiosInstance";
import store from "../../../app/store";
import { BrowserRouter } from "react-router-dom";
import { act } from "react";
import '@testing-library/jest-dom'
import * as pagination from "./pagination"

describe("TicketsView Component",() => {

    let mockTicketsData: Content = {
            content: [
                {
                    id: 3,
                    ticketTitle: "Problem with an order",
                    ticketDescription: "I didnt receive my shipment",
                    createdAt: new Date("2024-09-15T15:50:42.529+00:00"),
                    resolved: true
                },
                {
                    id: 4,
                    ticketTitle: "I cannot login",
                    ticketDescription: "bad news",
                    createdAt: new Date("2024-09-16T15:02:17.101+00:00"),
                    resolved: true
                },
                {
                    id: 5,
                    ticketTitle: "saw",
                    ticketDescription: "www",
                    createdAt: new Date("2024-09-23T10:36:44.580+00:00"),
                    resolved: true
                },
                {
                    id: 6,
                    ticketTitle: "something happened",
                    ticketDescription: "heh hehah hehwshw",
                    createdAt: new Date("2024-09-24T09:28:38.419+00:00"),
                    resolved: true
                }
            ],
            pageNo: 0,
            pageSize: 4,
            totalElements: 8,
            totalPages: 3,
            last: false,
            ticket: {} as Ticket  
    }

    beforeEach(() => {
        
    })

    afterEach(() => {
        jest.clearAllMocks()
    });

    test("should display the ticket titles correctly and redux ticket state must match with the user UI", async() => {
        let spyGetTickets = jest.spyOn(axiosInstance,"get").mockResolvedValue({data:mockTicketsData})
        
        render(
                <Provider store={store}>
                    <BrowserRouter>
                    <TicketsView />
                    </BrowserRouter>
                </Provider>  
        );

        await act(async () => {
            await store.dispatch(ticketActions.fetchTickets({ pageNo: 0, pageSize: 4 }));
        });
       
          for(let i = 0; i < mockTicketsData.content.length; i++) {
              const title = await screen.findByText(`Title:${mockTicketsData.content[i].ticketTitle}`)
              expect(title).toBeInTheDocument()
              expect(title.textContent).toContain(store.getState().ticket.data.content[i].ticketTitle)
          }
         // screen.debug()
        //  console.log(store.getState().ticket.data)
    })

    

    test("should display the error message if there is any problem with the tickets",async() => {
        const message = "Request failed with status code 400"
        let spyGetTickets = jest.spyOn(axiosInstance,"get").mockRejectedValue(new Error(message))
        
        render(
                <Provider store={store}>
                    <BrowserRouter>
                    <TicketsView />
                    </BrowserRouter>
                </Provider>  
        );

        await act(async () => {
            await store.dispatch(ticketActions.fetchTickets({ pageNo: 0, pageSize: 4 }));
        });

        const errorMessage = await screen.findByText("Error:Request failed with status code 400")
        expect(errorMessage).toBeInTheDocument()
        expect(errorMessage.textContent).toContain(store.getState().ticket.error)
        expect(store.getState().ticket.error).toBe(message)
    })

    test("should display loading message when loading is true",async() => {
         let spyGetTickets = jest.spyOn(axiosInstance,"get").mockResolvedValue({data:mockTicketsData})
         
        render(
                <Provider store={store}>
                    <BrowserRouter>
                    <TicketsView />
                    </BrowserRouter>
                </Provider>  
        );
        
      await act(() => {
        expect(store.getState().ticket.loading).toBe(true)
        const loadingMessage = screen.queryByText(new RegExp("Loading..."))
         expect(loadingMessage).toBeInTheDocument()
      })
        
    })

    test("should have button with name Next Page",async() => {
        let spyGetTickets = jest.spyOn(axiosInstance,"get").mockResolvedValue({data:mockTicketsData})
        
        render(
                <Provider store={store}>
                    <BrowserRouter>
                    <TicketsView />
                    </BrowserRouter>
                </Provider>  
        );
        
      await act(async() => {
       await store.dispatch(ticketActions.fetchTickets({ pageNo: 0, pageSize: 4 }));
      })

      const nextPageButton = await screen.findByRole("button",{name:"Next Page"})
      expect(nextPageButton).toBeInTheDocument()
    })

    test("clicking on button Next Page should call onNextPage() function",async() => {
        let spyGetTickets = jest.spyOn(axiosInstance,"get").mockResolvedValue({data:mockTicketsData})
        let spyOnNextPage = jest.spyOn(pagination,"onNextPage")
        
        render(
                <Provider store={store}>
                    <BrowserRouter>
                    <TicketsView />
                    </BrowserRouter>
                </Provider>  
        );
        
      await act(async() => {
       await store.dispatch(ticketActions.fetchTickets({ pageNo: 0, pageSize: 4 }));
      })

      const nextPageButton = await screen.findByRole("button",{name:"Next Page"})
      
      await act(async() => {
        fireEvent.click(nextPageButton)
      })

      expect(spyOnNextPage).toHaveBeenCalledTimes(1)
      console.log(store.getState().ticket.data)
    })

    test("should have a button with name 'Previous Page'", async() => {
        let spyGetTickets = jest.spyOn(axiosInstance,"get").mockResolvedValue({data:mockTicketsData})

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <TicketsView />
                </BrowserRouter>
            </Provider>
        )

        await act(async() => {
            await store.dispatch(ticketActions.fetchTickets({pageNo: 0, pageSize: 4}))
        })

        const previousPageButton = await screen.findByRole("button",{name: "Previous Page"})
        expect(previousPageButton).toBeInTheDocument()
    })

    test("clicking on button Previous Page should call onPreviousPage() function",async() => {
        let spyGetTickets = jest.spyOn(axiosInstance,"get").mockResolvedValue({data:mockTicketsData})
        let spyOnPreviousPage = jest.spyOn(pagination,"onPreviousPage")

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <TicketsView />
                </BrowserRouter>
            </Provider>
        )

        await act(async() => {
            await store.dispatch(ticketActions.fetchTickets({pageNo: 0, pageSize: 4}))
        })

        const previousPageButton = await screen.findByRole("button",{name: "Previous Page"})

        await act(async() => {
            fireEvent.click(previousPageButton)
        })

        expect(spyOnPreviousPage).toHaveBeenCalledTimes(1)
    })
})