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
import { AutoComplete, Button } from 'antd';


const App =() => {
    //Sete la lista de clientes de un depostio
    const [depositos, setDepositos] = React.useState(null)

    const [direcciones, setDirecciones] = React.useState(null)
    //console.log(direcciones);

    //Mesaje value
    const [mesajeValue, setMesajeValue] = React.useState(null);
    //console.log(mesajeValue);

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



   //Load BTN
   const [loadings, setLoadings] = useState([]);
   const enterLoading = (index) => {
     setLoadings((prevLoadings) => {
       const newLoadings = [...prevLoadings];
       
       newLoadings[index] = true;
       return newLoadings;
     });

     setTimeout(() => {
       setLoadings((prevLoadings) => {
         const newLoadings = [...prevLoadings];
         newLoadings[index] = false;
         alert("Solicitud enviada con éxito...");
         location.reload()
         return newLoadings;         
       });
     }, 2000);
   };


    return (
        <>
            <div className='Wrapp-component'>
            

                <div className='card'>
                <Comentarios
                mesajeValue={mesajeValue}
                setMesajeValue={setMesajeValue}
                
                />                   
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
                <Button 
                
                type="primary" 
                loading={loadings[0]} 
                onClick={() => enterLoading(0)}>
                Pedir Cotización
                </Button>
                </div>
            </div>
        </>        
    )
}

ReactDOM.render(<App />, document.getElementById('root'));