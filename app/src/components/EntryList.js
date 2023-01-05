import { useState } from "react";
function EntryList(props) {

    const handleAddEntry = () => {
        fetch('http://localhost:4000/new/grade?name=&grade=')
            .then(response => response.json());
    }

    const handleRemoveEntry = (event) => {
        fetch(`http://localhost:4000/delete/grade?id=${event.target.parentElement.id}`)
            .then(response => response.json());
    }

    const handleChange = (index, event) => {
        const parent = event.target.parentElement
        const name = event.target.parentElement.querySelector('.name')
        const grade = event.target.parentElement.querySelector('.grade')
        fetch(`http://localhost:4000/update/grade?id=${parent.id}&name=${name.value}&grade=${grade.value}`)
            .then(response => response.json());
    }

    let entries = []

    const updateEntries = () => {
        let result

        fetch(`http://localhost:4000/get/grades`)
            .then(response => response.json())
            .then(data => result = data);

        entries = []
        for(let i in result)
            entries.push([i, result[i]]);

        console.log(result)
    }

    updateEntries()

    return (
        <div>
            <button type="button" onClick={handleAddEntry}>Add Entry</button>
            {
                entries.map((entry, index) => (
                <div key={index} id={entry.id}>
                    <input type="text" value={entry} onChange={(event) => handleChange(index, event)} />
                    <button type="button" onClick={() => handleRemoveEntry(index)}>Remove Entry</button>
                </div>
            ))
            }
        </div>
    )

}

export default EntryList
