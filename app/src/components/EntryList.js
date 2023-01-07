import { useState } from "react";

function EntryList(props) {
    const [entries, setEntries] = useState([])

    const handleAddEntry = () => {
        fetch('http://localhost:4000/grade', {
            method: 'POST'
        });
        updateEntries()
    }

    const handleRemoveEntry = (index) => {
        fetch(`http://localhost:4000/grade?id=${index}`, {
            method: 'DELETE'
        });
        setEntries(entries.filter(function(e) { return e.id !== index }))
    }

    const handleChange = (index, event) => {
        const name = event.target.parentElement.querySelector('.name')
        const grade = event.target.parentElement.querySelector('.grade')
        fetch(`http://localhost:4000/grade?id=${index}&name=${name.value}&grade=${grade.value}`, {
            method: 'PUT'
        });
    }

    const updateEntries = () => {
        return fetch(`http://localhost:4000/grades`)
            .then(response => response.json())
            .then(data => {
                setEntries(data)
            })
    }

    window.onload = () => updateEntries() // Afficher les entrées au chargement de la page, mais c'est un peu sketchy, todo

    return (
        <div>
            <button type="button" onClick={handleAddEntry}>Add Entry</button>
            {
                entries.map(entry => (
                <div key={entry.id}>
                    <input className={'name'} type="text" defaultValue={entry.name} onChange={(event) => handleChange(entry.id, event)} />
                    <input className={'grade'} type="text" defaultValue={entry.grade} onChange={(event) => handleChange(entry.id, event)} />
                    <button type="button" onClick={() => handleRemoveEntry(entry.id)}>Remove Entry</button>
                </div>
            ))
            }
        </div>
    )

}

export default EntryList
