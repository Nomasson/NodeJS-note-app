
const fs = require('fs')
const chalk = require('chalk')

const getNotes = () =>{
    return "Your notes are..."
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesAfterDeletion = notes.filter((note) => note.title != title)

    if (notesAfterDeletion.length === notes.length){
        console.log(chalk.red.inverse("Note not found"))
    }
    else {
        console.log(chalk.green.inverse("Note successfully removed"))
        saveNotes(notesAfterDeletion)
    }

}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicatedNote = notes.find((note) => note.title === title)

    debugger

    if (!duplicatedNote){
        notes.push({
            title:title,
            body:body   
        })
        console.log(chalk.green.inverse("New note titled at " + title + " was added succesfully"))
    }
    else {
        console.log(chalk.red.inverse("Note titled at " + title + " was duplicated and therefore was not added"))

    }
   

    saveNotes(notes)
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () =>{
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } 
    catch (e) {
        return []
    }
    
}

const readNote = (title) => {
    const notes = loadNotes()
    const requestedNote = notes.find((note) => note.title === title)
    if (requestedNote){
        console.log(chalk.yellow(requestedNote.title))
        console.count(requestedNote.body)
    }
    else{
        console.log(chalk.red("Note not found"))
    }
}

const listNotes = () =>{
    const notes = loadNotes()
    notes.forEach((note) => console.log(note.title))    
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}