import React from 'react';
import arrow from '../assets/arrow-cmentarios.svg';
import './Comentarios.css';



function Comentarios( ) {

    const [showInput, setShowInput] = React.useState(false);

    function changeClass() {
        setShowInput(showInput => !showInput);
    }

    let toggleClass = showInput ? ' wrapp-input-text-area': '';
    let toggleClassArrow = showInput ? ' imgArrow--active': '';


    return (
        <div>
            <div 
            className='wrapp-tile-narrow'
            onClick={changeClass}>
            <h3>Agregar comentarios <span>(Opcional)</span></h3>
            <img 
            className={`imgArrow${toggleClassArrow}`}
            src={arrow}/>
            </div>
            <div 
            className={`wrapp-input-text-area--hidde${toggleClass}`}>
                <textarea 
                className='text-area-input'
                type='text-area' 
                placeholder='Introduce tus comentarios' 
                rows='4' />
                <div>
                <button className='guardarComents'>Guardar</button>
                </div>
                
            </div>
            
        </div>
        
    );
}

export { Comentarios };







