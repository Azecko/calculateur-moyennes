function Average({ average }) {
    return (
        <div className={'bg-success average-footer position-fixed vw-100 text-center justify-content-center align-items-center'}>
            <h4 className={'fw-bold mb-0 py-4'}>
                Moyenne : { isNaN(average) ?  '-' : average }
            </h4>
        </div>
    )

}

export default Average
