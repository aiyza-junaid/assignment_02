import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';

const containerStyle = {
  background: '#fff',
  padding: '2rem',
  borderRadius: '12px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
  width: '450px',
  margin: '2rem auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
};

const inputRowStyle = {
  display: 'flex',
  gap: '0.75rem',
  alignItems: 'center',
};

const inputStyle = {
  flex: 1,
  padding: '0.75rem',
  fontSize: '1rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  transition: 'border-color 0.3s ease',
};

const buttonStyle = {
  padding: '0.6rem 1.2rem',
  fontSize: '1rem',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#28a745',
  color: '#fff',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

const deleteButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#dc3545',
};

const editButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#ffc107',
};

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  maxHeight: '300px',
  overflowY: 'auto',
};

const listItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.75rem',
  borderRadius: '6px',
  borderBottom: '1px solid #f1f1f1',
  background: '#f9f9f9',
  marginBottom: '0.5rem',
};

function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editNoteId, setEditNoteId] = useState(null);
  const [editNoteContent, setEditNoteContent] = useState('');

  const fetchNotes = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/notes', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    if (res.ok) setNotes(data);
    else alert('Error fetching notes');
  };

  const addNote = async () => {
    if (!newNote.trim()) return;
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/notes', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: newNote }),
    });
    const data = await res.json();
    if (res.ok) {
      setNotes([...notes, data]);
      setNewNote('');
    } else {
      alert('Error adding note');
    }
  };

  const deleteNote = async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) setNotes(notes.filter(n => n._id !== id));
    else alert('Error deleting note');
  };

  const updateNote = async (id) => {
    if (!editNoteContent.trim()) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: editNoteContent }),
    });
    const data = await res.json();
    if (res.ok) {
      setNotes(notes.map(n => (n._id === id ? data : n)));
      setEditNoteId(null);
      setEditNoteContent('');
    } else {
      alert('Error updating note');
    }
  };

  const startEditing = (id, content) => {
    setEditNoteId(id);
    setEditNoteContent(content);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', color: '#28a745' }}>Your Notes</h2>
      <div style={inputRowStyle}>
        <input
          value={newNote}
          onChange={e => setNewNote(e.target.value)}
          placeholder="Write a note..."
          style={inputStyle}
          onFocus={e => (e.target.style.borderColor = '#28a745')}
          onBlur={e => (e.target.style.borderColor = '#ccc')}
        />
        <button
          onClick={addNote}
          style={buttonStyle}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#218838')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#28a745')}
        >
          <FaSave /> Add
        </button>
      </div>
      <ul style={listStyle}>
        {notes.map(note => (
          <li key={note._id} style={listItemStyle}>
            {editNoteId === note._id ? (
              <div style={{ flex: 1, display: 'flex', gap: '0.75rem' }}>
                <input
                  value={editNoteContent}
                  onChange={e => setEditNoteContent(e.target.value)}
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = '#28a745')}
                  onBlur={e => (e.target.style.borderColor = '#ccc')}
                />
                <button
                  onClick={() => updateNote(note._id)}
                  style={editButtonStyle}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#e0a800')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#ffc107')}
                >
                  <FaSave /> Save
                </button>
              </div>
            ) : (
              <>
                <span>{note.content}</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => startEditing(note._id, note.content)}
                    style={editButtonStyle}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#e0a800')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#ffc107')}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteNote(note._id)}
                    style={deleteButtonStyle}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#c82333')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#dc3545')}
                  >
                    <FaTrash />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
