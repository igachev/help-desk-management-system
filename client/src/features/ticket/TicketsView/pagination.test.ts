import { onNextPage, onPreviousPage } from "./pagination";

describe("pagination.ts", () => {
    let setPageNo!: any;

    beforeEach(() => {
        setPageNo = jest.fn()
    })

    afterEach(() => {
        jest.clearAllMocks()
    });

    describe("onNextPage()",() => {

        test("if 'isLast' is equal to false 'onNextPage()' function should invoke function 'setPageNo()'",async() => {
           const isLast = false;
           const result = onNextPage(isLast,setPageNo)
           expect(setPageNo).toHaveBeenCalledTimes(1)
        })

        test("if 'isLast' is equal to true 'onNextPage()' function should not invoke function 'setPageNo()'",async() => {
            const isLast = true;
            const result = onNextPage(isLast,setPageNo)
            expect(setPageNo).toHaveBeenCalledTimes(0)
         })
    })

    describe("onPreviousPage()",() => {

        test("if 'pageNumber' is less than 1 function 'setPageNo()' should not be invoked",() => {
            const pageNumber = 0;
            const result = onPreviousPage(pageNumber,setPageNo)
            expect(setPageNo).toHaveBeenCalledTimes(0)
        })

        test("if 'pageNumber' is more than 1 function 'setPageNo()' should be invoked",() => {
            const pageNumber = 1;
            const result = onPreviousPage(pageNumber,setPageNo)
            expect(setPageNo).toHaveBeenCalledTimes(1)
        })
    })
})