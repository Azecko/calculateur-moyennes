import { useState } from "react";
function Entry({ id, name, grade, updateEntries }) {
    const [error, setError] = useState(false)
    const handleRemoveEntry = async (index) => {
        await fetch(`http://localhost:4000/grade?id=${index}`, {
            method: 'DELETE'
        });
        await updateEntries()
    }

    const handleChange = async (index, event) => {
        setError(false)
        const name = event.target.parentElement.querySelector('.name').value
        const grade = event.target.parentElement.querySelector('.grade').value

        if (!grade || (grade <= 6 && grade >= 1)) {
            await fetch(`http://localhost:4000/grade?id=${index}&name=${name}&grade=${parseFloat(grade)}`, {
                method: 'PUT'
            });
            await updateEntries()
        } else {
            setError(true)
        }
    }

    const htmlError = error ? (<p>La valeur entrée n'est pas valide</p>) : null

    return (
        <div>
            <input className={'name'} type="text" defaultValue={name} onChange={(event) => handleChange(id, event)} />
            <input className={'grade'} type="text" defaultValue={grade} onChange={(event) => handleChange(id, event)} />
            <button type="button" onClick={() => handleRemoveEntry(id)}>Supprimer</button>
            { htmlError }
        </div>
    )

}

export default Entry
