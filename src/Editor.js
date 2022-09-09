import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Editor() {
    const [text, setText] = useState("");

    const handleText = e => {
        console.log(text);
    }
    return (
        <>
            <div className='toolbar'>
                <header className="App-header">
                    <h2>Text Editor</h2>
                </header>
                <button className="button-5" type="button" onClick={handleText}>
                    Save
                </button>
            </div>

            <ReactQuill
                placeholder="Write something"
                value={text}
                onChange={setText}
            />

        </>
    )
}