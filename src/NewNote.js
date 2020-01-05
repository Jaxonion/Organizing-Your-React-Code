import React from 'react';
import { Link } from 'react-router-dom';
import notefulContext from './notefulContext';

class NewNote extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            note: {
                name: '',
                touched: false
                
            }
        }
    }
    static contextType = notefulContext;

    updateNote = () => {
        console.log(document.getElementById('folderId').value)
        this.context.setNote(document.getElementById('noteName').value, document.getElementById('folderId').value, document.getElementById('noteContent').value, this.createNote())
    }

    createNote = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    validateNote = () => {
        const {name, touched} = this.state.note;
        if(!touched) {
            return 'no name'
        }
        if(name && name.length < 1) {
            return 'no name'
        }
        if(name === '') {
            return 'no name'
        }
    }

    updateState = (name, touched) => {
        //console.log(name, touched)
        this.setState({
            note: {
                name: name,
                touched: touched
            }
        })
    }

    render() {
        //let noteContent = document.getElementById('noteContent').value;
        //let noteName = document.getElementById('noteName').value;

        let value = this.context;
        console.log('value:', value)
        const options = value.folders.map((folder, id) => {
            return(
                <option value={folder.id}>{folder.name}</option>
            )
        })
        return(
                <div className='NewNote'>

                    <label>Create A Note</label>

                    <div className='newNote'>

                        <label htmlFor='noteName'>Name</label>

                        <input
                            aria-required='true'
                            aria-describedby='nameOfNewNote'
                            aria-label='Name of new note'
                            id='noteName'
                            name='noteName'
                            onChange={(name, touched) => this.updateState(document.getElementById('noteName').value, true)} type='text' id='noteName' placeholder='Note Name' />

                        <label htmlFor='noteContent'>Content</label>

                        <input
                            aria-required='true'
                            aria-describedby='contentOfNote'
                            aria-label='Content of new note'
                            type='text'
                            id='noteContent'
                            placeholder='Content' />
                        
                        <label htmlFor='folderName'>Folder</label>

                        <select
                            name='folderName'
                            id='folderId'
                            aria-required='true'
                            aria-describedby='folderOfNote'
                            aria-label='folder that new note will be in'>
                            {options}
                        </select>

                        <Link to='/'>
                            <button
                                disabled={
                                    this.validateNote()
                                }
                                onClick={this.updateNote}
                                >
                                Add Note
                            </button>
                        </Link>

                    </div>
                </div>
        )
    }
}

export default NewNote;