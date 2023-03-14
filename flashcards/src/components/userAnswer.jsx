const UserAnswer = ({label, currentVal, handleChange, handleClick, inputClassName}) => {
    return (
        <div>
            <input
                type="text"
                name={label}
                value={currentVal}
                placeholder = "your answer.."
                onChange={handleChange}
                id="userinput"
                className ={inputClassName}
            />

            <button 
                onClick = {handleClick}
            >
                Submit
            </button>
        </div>
    )
}

export default UserAnswer