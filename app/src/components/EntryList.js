import { useState, useEffect } from "react";
import Entry from "./Entry";

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
                <Entry
                    key={entry.id}
                    id={entry.id}
                    name={entry.name}
                    grade={entry.grade}
                    handleChange={handleChange}
                    handleRemoveEntry={handleRemoveEntry}
                />
            ))
            }
        </div>
    )

}

export default EntryList
