import { useState } from "react";
function EntryList() {
    const [entries, setEntries] = useState([]);

    const handleAddEntry = () => {
        setEntries([...entries, ''])
    }

    const handleRemoveEntry = (index) => {
        setEntries(entries.filter((_, i) => i !== index))
    }

    const handleChange = (index, event) => {
        const newEntries = [...entries]
        newEntries[index] = event.target.value
        setEntries(newEntries)
    }

    return (
        <div>
            <button type="button" onClick={handleAddEntry}>Add Entry</button>
            {entries.map((entry, index) => (
                <div key={index}>
                    <input type="text" value={entry} onChange={(event) => handleChange(index, event)} />
                    <button type="button" onClick={() => handleRemoveEntry(index)}>Remove Entry</button>
                </div>
            ))}
        </div>
    )

}

export default EntryList