import { useEffect, useState } from 'react';
import Note from './components/Note'
import Footer from './components/Footer';
import Notification from './components/Notification';
import noteService from './services/notes'
import './index.css'

const App = () => {

    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const hook = () => {
        noteService
            .getAll()
            .then(res => {
                setNotes(res);
            })
    }

    useEffect(hook, []);

    const notesToShow = showAll ? notes : notes.filter(note => note.important);

    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
        }
        noteService
            .create(noteObject)
            .then(res => {
                setNotes(notes.concat(res));
                setNewNote('');
            });
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
    }

    const toggleImportance = (id) => {
        const note = notes.find(n => n.id === id);
        const changedNote = { ...note, important: !note.important };

        noteService
            .update(id, changedNote)
            .then(res => {
                setNotes(notes.map(n => n.id !== id ? n : res))
            })
            .catch(err => {
                setErrorMessage(`Note '${note.content}' was already removed from the server.`);
                setTimeout(()=>{
                    setErrorMessage(null);
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <div>
                <button onClick={() => setShowAll(!showAll)}>Show {showAll ? 'Important' : 'All'}</button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)} />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input type="text" placeholder='Add Another Note' value={newNote} onChange={handleNoteChange} />
                <button type='submit'>Submit</button>
            </form>
            <Footer />
        </div>
    )
}

export default App;