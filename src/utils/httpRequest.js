

const makeHTTP = ( endpoint,  options )=>{
    const url = 'http://localhost:5000' + endpoint; 
    return fetch(url,options)  // returns a promise 
}


export default makeHTTP