import { SET_MODAL_MESSAGE, useFirebaseContext } from "../context/firebase.context"

const setEmpty = (dispatch) => {
    dispatch({type: SET_MODAL_MESSAGE, value: ''})
}

export default function Modal() {
    const { state, dispatch } = useFirebaseContext()
    console.log(state.modalMessage)

    const closeModal = () => {
        setEmpty(dispatch)
    }


    let className = "modal fase"
    let style = {}
    if(state.modalMessage){
        className += " show"
        style = {display: 'block'}
    }

    return (
        <div className={className} style={style} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-body">
                    <p>{state.modalMessage}</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                </div>
                </div>
            </div>
        </div>
    )
}