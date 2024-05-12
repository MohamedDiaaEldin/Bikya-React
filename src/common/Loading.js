



import { useState } from 'react'
import './loading.css'
const  Loading = ()=>{

        return ( 
            
            <ul className='overlay'>
                <li>
                    <div className="loader">
                    <div className="child"></div>
                    </div>
                </li>
            </ul>
        )
    
}

export default Loading