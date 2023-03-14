const UserAnswer = ({currentVal, handleChange, handleSubmit}) => {
    return (
        <div>
            <input
                type="text"
                name="userinput"
                value={currentVal}
                placeholder = "your answer.."
                onChange={handleChange}
            />
            <button 
                onSubmit = {handleSubmit}
            >
                Submit
            </button>
        </div>
    )
}

export default UserAnswer