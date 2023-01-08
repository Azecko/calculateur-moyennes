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
                    updateEntries={updateEntries}
                />
            ))
            }
            <p>Moyenne : { entries.reduce((sum, entry) => sum + entry.grade, 0) / entries.filter((entry) => entry.grade).length }</p>
        </div>
    )

}

export default EntryList
