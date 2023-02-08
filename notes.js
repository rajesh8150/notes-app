const fs = require('fs')
const chalk = require('chalk')

const addNote =(title,body) => {
    const notes = loadNotes();

    //const duplicateNotes = notes.filter((note)=>note.title===title)
    const duplicateNote = notes.find((note)=>note.title===title) //Stops when one matches
    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New Note Added');
    }
    else{
        console.log('Note Title is already Added');
    }
}

const removeNote = (title,body)=>{
    const notes = loadNotes();

    const newNotes = notes.filter((note)=>note.title!==title)
    if(newNotes.length == notes.length){
        console.log('Notes not present with current title');
    }
    else{
        saveNotes(newNotes)
        console.log('Notes removed');
    }
}

const listNote = ()=>{
    const notes = loadNotes();
    console.log(chalk.inverse('Your Notes'));
    notes.forEach(note => console.log(note.title))
}

const readNote =(title) => {
    const notes = loadNotes();

    const note = notes.find((note)=>note.title===title) //Stops when one matches
    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body);
    }
    else{
        console.log(chalk.inverse.red('Note not found'));
    }
}

const saveNotes = (notes)=>{
    const dataJSON  = JSON.stringify(notes)
    fs.writeFileSync('storage.json',dataJSON)
}

const loadNotes = ()=>{
    try{
        const dataBuffer = fs.readFileSync('storage.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e){
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote,
    readNote: readNote
}