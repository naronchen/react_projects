import React, { useState } from "react";
import { supabase } from '../client'


function NewTasks() {
    const [formData, setFormData] = useState({
        color: "",
        content: "",
        deadline: ""
      });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // You can access the values of formData.color, formData.content, and formData.deadline and perform further actions, such as sending to an API, etc.
        // console.log("Color:", formData.color);
        // console.log("Content:", formData.content);
        // console.log("Deadline:", formData.deadline);

        await supabase
        .from('tasks')
        .insert({color: formData.color, content: formData.content, deadline: formData.deadline})
        .select()
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label>
            Color:
                <select
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                >
                    <option value="">-- Choose a color --</option>
                    <option value="red">red - urgent! 🚑 </option>
                    <option value="yellow">yellow - better not procastinate 🌇 </option>
                    <option value="blue">Blue  - take your time 🏖 </option>
                </select>
            </label>
            <br />
                <label>
                Content:
                <input
                    type="text"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                />
                </label>
            <br />
            <label>
            Deadline:
            <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
            />
            </label>
            <br />
            <input type="submit" value="Submit" />
        </form>
        </div>
    )
}
export default NewTasks 