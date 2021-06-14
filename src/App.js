import './App.css';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import MenuAppBar from './components/header';
import SwitchListSecondary from './components/notes';
import { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [note, setNote] = useState("");
  useEffect(() => {
    fetch("http://localhost:3001/notes").then(res => res.json()).then(data => {
      setItems(data)
    })
  }, [])
  const handleDelete = (id) => {
    fetch(`http://localhost:3001/notes/${id}`, {
      method: "DELETE"
    }).then(d => setItems(items.filter(ele=>ele.id!=id)))


  }
  const addNewNote = () => {
    fetch("http://localhost:3001/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: items.length + 1,
        title: note
      })
    })
    setItems([...items, {
      id: items.length + 1,
      title: note
    }])
    setNote("")
  }
  return (
    <>
      <div className="App" >
        <MenuAppBar />
        <br />
        <Typography variant="h4" component="h5">Take your Note</Typography>
        <div style={{ borderLeft: "1 solid black" }}>
          <TextField
            id="outlined-full-width"
            label="Note"
            style={{ margin: 8, width: 520 }}
            placeholder="Enter Note Title"
            margin="normal"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <br />
          <Button variant="contained" color="primary" onClick={addNewNote}>Add</Button>
          <Box display="flex" alignItems="center"
            justifyContent="center">
            <SwitchListSecondary items={items} handleDelete={handleDelete} />
          </Box>
        </div>
      </div>
    </>
  );
}

export default App;
