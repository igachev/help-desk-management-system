import { onNextPage } from "./pagination";

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
})