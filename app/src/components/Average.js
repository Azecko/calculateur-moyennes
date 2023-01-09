function Average({ entries }) {
    const average = Math.round(entries.reduce((sum, entry) => sum + entry.grade, 0) / entries.filter((entry) => entry.grade).length * 2) / 2
    return (
        <div className={'bg-success average-footer position-fixed vw-100 text-center justify-content-center align-items-center'}>
            <h4 className={'fw-bold mb-0 py-4'}>
                Moyenne : { isNaN(average) ?  '-' : average }
            </h4>
        </div>
    )

}

export default Average
