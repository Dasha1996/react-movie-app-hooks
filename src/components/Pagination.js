const Pagintation = ( { totalPages, handleClick}) => {
    const pages = [...Array(totalPages).keys()].map(num=> num+1);
    return (
        <div>{pages.map(num=>(
            <button className = "mb-4 btn btn-outline-light"
            key = {num}
            onClick = {() => handleClick(num)}>
            {num}
            </button>
        ))}</div>
    )

}

export default Pagintation;