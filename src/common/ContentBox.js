
import './content-box.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {fas} from  '@fortawesome/free-solid-svg-icons'  ;


const ContentBox = ({header, iconNumber, content})=> { 
    
    return(
        <div className="box">
            <FontAwesomeIcon icon={fas['fa'+iconNumber]} className='number-icon' />
            <h2>{header}</h2>
            <p>{content}</p>
        </div>
    )
}

export default ContentBox