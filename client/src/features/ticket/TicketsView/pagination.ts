
export function onNextPage(isLast: boolean, setPageNo: React.Dispatch<React.SetStateAction<number>>): void {
    if (!isLast) {
        setPageNo((pageNo) => pageNo += 1)
    }
    return;
}

export function onPreviousPage(pageNo: number,setPageNo: React.Dispatch<React.SetStateAction<number>>): void {
    if (pageNo > 0) {
        setPageNo((pageNo) => pageNo -= 1)
    }
    return;
}