import { useState, useEffect } from "react";

function EntryList() {
    const [entries, setEntries] = useState([])

    const updateEntries = () => {
        fetch(`http://localhost:4000/grades`)
            .then(response => response.json())
            .then(data => {
                setEntries(data)
            })
    }

    useEffect(() => {
        updateEntries();
    }, []);

    const handleAddEntry = async () => {
        await fetch('http://localhost:4000/grade', {
            method: 'POST'
        });
        await updateEntries()
    }

    const handleRemoveEntry = async (index) => {
        await fetch(`http://localhost:4000/grade?id=${index}`, {
            method: 'DELETE'
        });
        await updateEntries()
    }

    const handleChange = async (index, event) => {
        const name = event.target.parentElement.querySelector('.name')
        const grade = event.target.parentElement.querySelector('.grade')
        await fetch(`http://localhost:4000/grade?id=${index}&name=${name.value}&grade=${grade.value}`, {
            method: 'PUT'
        });
        await updateEntries()
    }

    return (
        <div>
            <button type="button" onClick={handleAddEntry}>Ajouter</button>
            {
                entries.map(entry => (
                <div key={entry.id}>
                    <input className={'name'} type="text" defaultValue={entry.name} onChange={(event) => handleChange(entry.id, event)} />
                    <input className={'grade'} type="text" defaultValue={entry.grade} onChange={(event) => handleChange(entry.id, event)} />
                    <button type="button" onClick={() => handleRemoveEntry(entry.id)}>Supprimer</button>
                </div>
            ))
            }
        </div>
    )

}

export default EntryList
