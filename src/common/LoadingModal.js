import ReactDOM  from 'react-dom'
import Loading from './Loading'
import './loadingModal.css'

const Overlay = ({children})=> { 
    return (
            <div className="overlay">
                <Loading/>
            </div>
    )
}


const LoadingModal = (props) => { 
    return ReactDOM.createPortal(<Overlay {...props}/>, document.body)
}
export default LoadingModal