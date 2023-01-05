import EntryList from "./EntryList"

function Branch(props) {
    return (
        <>
            <h3>Matière : {props.branchData.matiere}</h3>
            <h4>Professeur : {props.branchData.professeur}</h4>
            <EntryList data={props.branchData} index={props.index} />
        </>
    )
}

export default Branch