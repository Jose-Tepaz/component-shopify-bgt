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
import axios from 'axios';
import { AutoComplete, Button } from 'antd';


const App =() => {
    //Sete la lista de clientes de un depostio
    const [depositos, setDepositos] = React.useState(null)

    const [direcciones, setDirecciones] = React.useState(null)
 

    //Mesaje value
    const [mesajeValue, setMesajeValue] = React.useState(null);
    //console.log(mesajeValue);

    const [searchValue, setSearchValue] = React.useState(null);
    //console.log('Este es el valor ' + searchValue);

    const [adressSelect, setAdressSelect] = React.useState(null);

    const [clientSelect, setClientSelect] = React.useState(null);

    const [dataClient, setDataClient] = React.useState([]);

    const direccionesDataApi = dataClient != null ? dataClient.DireccionesDepositos: [];
    const idDataApi = dataClient != null ? dataClient.IDcliente: [];
    const emailClientDataApi = dataClient != null ? dataClient.Email: [];
    const rfcDataApi = dataClient != null ? dataClient.RFC: [];
    const telemarkDataApi = dataClient != null ? dataClient.Telemarketing: [];
    
    console.log(dataClient);

    useEffect(() => {
        setDirecciones(direccionesDataApi);
    }), [clientSelect]


   

    //const finalsend = "Lista de productos";
    //const asesorIdshopify = "987654321";
    //const emailAsesor = "jose@acueducto.studio";

// !!--- Send POST data to Airtable ---!!
async function enviandoDatos() {
    const response = await fetch('https://api.airtable.com/v0/appVwlmLP1164Ceku/tbl7q7V4X0euPXyyC', {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            'Authorization': 'Bearer patRKAOUDaKjoM6c1.6564c9ab0b43954c74d0c41430eceb4a7f18a009249a22924ad944024e2d7446',
        },
        body: JSON.stringify({
            "records": [{
                "fields": {
                    "Idcliente": `${idDataApi}`,
                    "DireccionDeposito": `${adressSelect}`,
                    "Comentario": `${mesajeValue}`,
                    "productos": `${finalsend}`,
                    "Email": `${emailClientDataApi}`,
                    "RFC": `${rfcDataApi}`,
                    "emailTelemarketing": `${telemarkDataApi}`,
                    "Asesor": `${asesorIdshopify}`,
                    "emailAsesor": `${emailAsesor}`,

                }
            }],
            "typecast": true
        })
    });
    console.log(response);
}

// !!--- End this script ---!! //







    //setea la direccion del deposito a buscar

    useEffect(() => {
        listDirecciones(setDataClient, clientSelect);
        //console.log(clientSelect);
    }, [clientSelect]);


    //useEffect(() => {
    //    listDirecciones(setDirecciones, clientSelect);
    //    console.log(clientSelect);
    //}, [clientSelect]);

    //setea la lista de depositps del asesor

    useEffect(() => {
        listDespostos(setDepositos);
    }, [depositos]);
    



    //direcciones.map 

   const options = depositos != null ? depositos.map( (deposito) => {

    const uniendoArray = `${deposito.nuevo[0]} - ${deposito.nuevo[1]}`
    
    return {
        label: uniendoArray,
        value: uniendoArray

        //value: deposito.nuevo[0]
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
         enviandoDatos();
         //location.reload();
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
                        
                        const newValue = event.split("-");
                        const finalValue = newValue[0];
                        console.log(finalValue);
 
                        setClientSelect(finalValue.trim());                      
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