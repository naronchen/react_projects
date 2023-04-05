import React from 'react';
import { supabase } from '../client'
import { useState } from 'react';

import './CreatePost.css'

const CreatePost = () =>  {
    const [post, setPost] = useState({ title: '', author: '', description: '' });

    const handleSubmit = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .insert(post)
            .select();

        window.location = '/';
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPost((prevPost) => ({ ...prevPost, [name]: value }));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label> <br />
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    value={post.title} 
                    onChange={handleInputChange} /><br />
                <br/>

                <label htmlFor="author">Author</label><br />
                <input 
                    type="text" 
                    id="author" 
                    name="author" 
                    value={post.author} 
                    onChange={handleInputChange} /><br />
                <br/>

                <label htmlFor="description">Description</label><br />
                <textarea   rows="5" 
                            cols="50" 
                            id="description" 
                            name="description" 
                            value={post.description} 
                            onChange={handleInputChange}>
                </textarea>
                <br/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default CreatePost;
