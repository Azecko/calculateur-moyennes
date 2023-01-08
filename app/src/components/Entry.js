function Entry({ id, name, grade, handleChange, handleRemoveEntry }) {
    return (
        <div>
            <input className={'name'} type="text" defaultValue={name} onChange={(event) => handleChange(id, event)} />
            <input className={'grade'} type="text" defaultValue={grade} onChange={(event) => handleChange(id, event)} />
            <button type="button" onClick={() => handleRemoveEntry(id)}>Supprimer</button>
        </div>
    )

}

export default Entry
