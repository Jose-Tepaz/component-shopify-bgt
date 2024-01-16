import ReactDOM from 'react-dom';
import { IdInput} from './IdInput';
import { Sedes} from './Sedes';
import { SedesList} from './SedesList';
import { TotalSend } from './TotalSend';
import { Comentarios } from './Comentarios';
import { listDespostos } from './apicallasesores';
import { listDirecciones } from './apicalldepositos'
import React,{useEffect, useState} from 'react';
import './index.css';
import { AutoComplete, DatePicker } from 'antd';

//const listSedes = [
//    { name: 'Viridiana Palma'},
//    { name: 'Oficina central Dental'},
//    { name: 'Denta Polanco'},
//]

const App =() => {
    //Sete la lista de clientes de un depostio
    const [depositos, setDepositos] = React.useState(null)

    const [direcciones, setDirecciones] = React.useState(null)
    //console.log(direcciones);

    const [searchValue, setSearchValue] = React.useState(null);
    //console.log('Este es el valor ' + searchValue);

    const [adressSelect, setAdressSelect] = React.useState(null);

    const [clientSelect, setClientSelect] = React.useState(null);
    //console.log(clientSelect);

    
    //setea la direccion del deposito a buscar

    useEffect(() => {
        listDirecciones(setDirecciones, clientSelect);
    }, [clientSelect]);

    //setea la lista de depositps del asesor

    useEffect(() => {
        listDespostos(setDepositos);
    }, [depositos]);
    

    useEffect(() => {
        const objectSend = {      
            idCliente: searchValue,
            adressClient: adressSelect,
            items: 'item1',
     
    };
    //console.log(objectSend);

    },[adressSelect])

    //direcciones.map 

   const options = depositos != null ? depositos.map( (deposito) => {
    
    return {
        label: deposito,
        value: deposito
    }
   } ) : [] ;


    return (
        <>
            <div className='Wrapp-component'>
            

                <div className='card'>
                    <Comentarios />
                    

                </div>
                <div className='card'>
                
                
               

                
                <div className='Component-input' >
                <h3>ID de cliente</h3>
                <AutoComplete  
                
                className='inputSearch'
                options={options}
                placeholder="Introduce ID"
                filterOption={true}
                onChange={
                    (event) => {
                        setClientSelect(event);
                      
                    }
                }
                />
                <div className='divider'></div>

                </div>
                

                <SedesList>
                    {direcciones != null ? (
                       direcciones.map(direccion => 
                        <Sedes key={direccion} name={direccion} adressSelect={adressSelect}  setAdressSelect={setAdressSelect} />
                        )
                    ) : (<p className='nonInfo'> Introduce un ID de cliente para ver las direcciones disponibles </p>) }
                               
                </SedesList>
                </div>
                <div className='card'>
                <TotalSend />
                </div>
            </div>
        </>        
    )
}

ReactDOM.render(<App />, document.getElementById('root'));