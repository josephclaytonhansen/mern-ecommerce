import React from 'react'

const Rating = ({ value, text }) => {
    return(
        <>
        <div className='rating' style = {{display:'flex', justifyContent: "space-around"}}>
            <div>
            { [1, 2, 3, 4, 5].map(index => (<i className={ (value >= index) ? 'fas fa-star' : ((value >= (index - 0.5)) ? 'fas fa-star-half-alt' : 'far fa-star')}></i>)) }
            </div>
            <span>{ text && text}</span>
        </div>
        </>
    )
}



export default Rating
