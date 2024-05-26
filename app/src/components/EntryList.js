import { useState, useEffect } from "react";
import Entry from "./Entry";
import Average from "./Average";

function EntryList() {
    const [entries, setEntries] = useState([])
    const [average, setAverage] = useState([])

    const updateEntries = () => {
        fetch(`http://localhost:4000/grades`)
            .then(response => response.json())
            .then(data => {
                setEntries(data.grades)
                setAverage(data.average)
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
        <div className={'py-3'}>
            <div className={'d-flex'}>
                <div className={'row w-100 align-items-end'}>
                    <h5 className={'col-6'}>Intitulé de l'examen</h5>
                    <h5 className={'col-6'}>Note de l'examen</h5>
                </div>
                <button className={'btn btn-primary'} type="button" onClick={handleAddEntry}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
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
            <Average average={average} />
        </div>
    )

}

export default EntryList
