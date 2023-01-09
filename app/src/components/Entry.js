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
        const name = document.querySelector('#name_' + index).value
        const grade = document.querySelector('#grade_' + index).value

        if (!grade || (grade <= 6 && grade >= 1)) {
            await fetch(`http://localhost:4000/grade?id=${index}&name=${name}&grade=${!isNaN(parseFloat(grade)) ? parseFloat(grade) : ''}`, {
                method: 'PUT'
            });
            await updateEntries()
        } else {
            setError(true)
        }
    }

    return (
        <div>
            <div className={'d-flex my-2'}>
                <div className={'row w-100'}>
                    <div className={'col-6'}>
                        <input id={'name_' + id} className={'form-control'} type="text" defaultValue={name} onChange={(event) => handleChange(id, event)} />
                        { (error ? (<p className={'invalid-feedback'}>La valeur entrée n'est pas valide</p>) : null) }
                    </div>
                    <div className={'col-6'}>
                        <input id={'grade_' + id} className={'form-control' + (error ? ' is-invalid' : '')} type="text" defaultValue={grade} onChange={(event) => handleChange(id, event)} />
                    </div>
                </div>
                <button className={'btn btn-danger ms-2'} type="button" onClick={() => handleRemoveEntry(id)}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    )

}

export default Entry
