import { useState } from "react";

function EntryList(props) {
    const [entries, setEntries] = useState([])

    const handleAddEntry = () => {
        fetch('http://localhost:4000/new/grade');
    }

    const handleRemoveEntry = (index) => {
        fetch(`http://localhost:4000/delete/grade?id=${index}`);
    }

    const handleChange = (index, event) => {
        const name = event.target.parentElement.querySelector('.name')
        const grade = event.target.parentElement.querySelector('.grade')
        fetch(`http://localhost:4000/update/grade?id=${index}&name=${name.value}&grade=${grade.value}`);
    }

    const updateEntries = () => {
        return fetch(`http://localhost:4000/get/grades`)
            .then(response => response.json())
            .then(data => {
                let newEntries = []
                for (const entry in data) {
                    newEntries.push(entry)
                }
                setEntries(newEntries)
            })
    }

    updateEntries()
    console.log(entries)

    return (
        <div>
            <button type="button" onClick={handleAddEntry}>Add Entry</button>
            {
                entries.map(entry => (
                <div key={entry.id}>
                    <input className={'name'} type="text" value={entry.name} onChange={(event) => handleChange(entry.id, event)} />
                    <input className={'grade'} type="text" value={entry.grade} onChange={(event) => handleChange(entry.id, event)} />
                    <button type="button" onClick={() => handleRemoveEntry(entry.id)}>Remove Entry</button>
                </div>
            ))
            }
        </div>
    )

}

export default EntryList
