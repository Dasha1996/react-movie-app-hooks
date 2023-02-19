const InputSearch = (props) => {
    return (
        <div className = "col col-sm-4">
        <input 
        value = {props.searchValue}
        onChange = { (event) => props.setSearch(event.target.value)
        }
        type = "text"
         placeholder = "Search for movie..."
         className = "form-control">

        </input>
        </div>
    )
}

export default InputSearch;