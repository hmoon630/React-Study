import React from 'react';
import './index.css';
import Header from '../Header';
import List from '../List';
import Note from '../Note';
import axios from 'axios';

class App extends React.Component {
    
    state = {
        notes: [],
        activeId: null,
    }

    componentDidMount = async () => {
        try {
            const req = await axios.get("http://127.0.0.1:8000/api/");
            const notes = await req.data;
            this.setState({
                notes,
                activeId:notes[0].id
            });
        } catch (e) {
            console.log(e);
        }

        
    }

    handleListItemClick = (id) => {
        this.setState({ activeId : id });
    }

    handleEditNote = (type, e) => {

        const notes = [ ...this.state.notes ];

        const note = notes.find((item) => item.id === this.state.activeId)

        note[type] = e.target.value;

        this.setState({
            notes,
        });
    }

    handleAddNote = () => {       
        const id = '_' + Math.random().toString(36).substr(2, 9);
        let note = {
            id,
            title: 'Title',
            content: 'Text',
        }

        try {
            const req = axios.post(`http://127.0.0.1:8000/api/add/${id}`,
                note
            );
        } catch (e) {
            console.log(e);
        }

        this.setState({
            notes: [
                ...this.state.notes,
                note,
            ],
            activeId: id,
        });
    }

    handleDeleteNote = () => {
        const notes = 
            this.state.notes.filter((item) => item.id !== this.state.activeId);

        try {
            const req = axios.delete(`http://127.0.0.1:8000/api/delete/${this.state.activeId}`);
        } catch (e) {
            console.log(e);
        }

        this.setState({
            notes,
            activeId: notes.length === 0 ? null : notes[notes.length - 1].id,
        });
    }

    handleSaveNote = () => {
        const note =
            this.state.notes.filter((item) => item.id === this.state.activeId)[0];
        
        try {
            const req = axios.put(`http://127.0.0.1:8000/api/save/${note.id}`,
                note
            );
        } catch (e) {
            console.log(e);
        }

    }

    render () {
        const { notes, activeId } = this.state;
        const activeNote = notes.filter((item) => item.id === activeId)[0];
        return (
            <div className="app">
                <Header
                    onAddNote={this.handleAddNote}
                    onDeleteNote={this.handleDeleteNote}
                    onSaveNote={this.handleSaveNote}
                />
                <div className="container">
                    <List
                        notes={notes}
                        activeId={activeId}
                        onListItemClick={this.handleListItemClick}
                    />
                    {
                        notes.length !== 0 &&
                            <Note
                                note={activeNote} 
                                onEditNote={this.handleEditNote}
                            />
                    }
                </div>
            </div>
        );
    }
}

export default App;