import './SedesList.css';


function SedesList (props) {


    return (
        <div className="list-sedes">
               
                <h3 className='title-card_component'>Dirección de depósito</h3>
                <ul>
                    {props.children}
                </ul>
         

             
        </div>
        
    );
}

export { SedesList};