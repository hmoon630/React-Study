import React from 'react';
import './index.css';
import Header from '../Header';
import List from '../List';
import Note from '../Note';
import nextId from 'react-id-generator';

class App extends React.Component {
    
    state = {
        notes: [
            {
                id: '_firstnote',
                title: '제목1',
                contents: '내용1',
            },
            {
                id: '_secondnote',
                title: '제목2',
                contents: '내용2',
            },
            {
                id: '_thirdnote',
                title: '제목3',
                contents: '내용3',
            },
        ],
        activeId: '_secondnote',
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
        const id = nextId();
        
        this.setState({
            notes: [
                ...this.state.notes,
                {
                    id,
                    title: '제목',
                    contents : '내용',
                },
            ],
            activeId: id,
        });
    }

    handleDeleteNote = () => {
        const notes = 
            this.state.notes.filter((item) => item.id !== this.state.activeId);
        this.setState({
            notes,
            activeId: notes.length === 0 ? null : notes[0].id,
        });
    }

    render () {
        const { notes, activeId } = this.state;
        const activeNote = notes.filter((item) => item.id === activeId)[0];
        return (
            <div className="app">
                <Header
                    onAddNote={this.handleAddNote}
                    onDeleteNote={this.handleDeleteNote}
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