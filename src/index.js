import ReactDOM from 'react-dom';
import { IdInput} from './IdInput';
import { Sedes} from './Sedes';
import { SedesList} from './SedesList';
import { TotalSend } from './TotalSend';
import { Comentarios } from './Comentarios';
import { listDespostos } from './apicallasesores';
import { listDirecciones } from './apicalldepositos'
import React,{useEffect, useState} from 'react';
import iconDone from '../assets/icon-done.svg';
import './index.css';
import axios from 'axios';
import { AutoComplete, Button } from 'antd';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';



const App =() => {
    //Sete la lista de clientes de un depostio
    const [depositos, setDepositos] = React.useState(null)

    const [direcciones, setDirecciones] = React.useState(null)
 

    //Mesaje value
    const [mesajeValue, setMesajeValue] = React.useState("No hay comentarios");
    //console.log(mesajeValue);

    const [searchValue, setSearchValue] = React.useState(null);
    //console.log('Este es el valor ' + searchValue);

    const [adressSelect, setAdressSelect] = React.useState(null);

    const [clientSelect, setClientSelect] = React.useState(null);

    const [dataClient, setDataClient] = React.useState([]);

    //Estado que activa el botón
    const [activeBtn, setActiveBtn] = React.useState(true);

    const direccionesDataApi = dataClient != null ? dataClient.DireccionesDepositos: [];
    const idDataApi = dataClient != null ? dataClient.IDcliente: [];
    const emailClientDataApi = dataClient != null ? dataClient.Email: [];
    const rfcDataApi = dataClient != null ? dataClient.RFC: [];
    const telemarkDataApi = dataClient != null ? dataClient.Telemarketing: [];
    
    //console.log(dataClient);

    useEffect(() => {
        setDirecciones(direccionesDataApi);
    }), [clientSelect]


   
    //SE OCULTA AL ENVIAR A PRODUCCION
    //const finalsend = "Lista de productos";
    //const asesorIdshopify = "987654321";
    //const emailAsesor = "jose@acueducto.studio";

// !!--- Send POST data to Airtable ---!!
async function enviandoDatos() {
    try {
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
                    "NameProduct": `${nombreDeProductoAPI}`,
                    "SkuProduct": `${skuDeProductoAPI}`,
                    "CantidadProduct": `${cantidadDeProductoAPI}`,
                    "SolicitudPor": "Asesor",
                    "Deposito": `${idDataApi}`,


                }
            }],
            "typecast": true
        })
    });
    console.log(response);
    

    if (response.status === 200) {
        alertaSucces();
        
    } else {
        alertaError();
        
    }
        
    } catch (error) {
        console.log(error)      
    }  
}

// !!--- End this script ---!! //

   //verifica si tenemos conección
   useEffect(() => {
    if(navigator.onLine) {
        console.log("estamos en linea")
    } else {
        alertaError();
    }

});

    //setea la direccion del deposito a buscar

    useEffect(() => {
        listDirecciones(setDataClient, clientSelect);
        //console.log(clientSelect);
    }, [clientSelect]);

    useEffect(() => {
        listDespostos(setDepositos);
    }, [depositos]);
    

    //direcciones.map 

   const options = depositos != null ? depositos.map( (deposito) => {

    const uniendoArray = `${deposito.nuevo[0]} , ${deposito.nuevo[1]}`
    
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
         orderCreate();
         enviandoDatos();
         
         //location.reload();
         return newLoadings;         
       });
     }, 2000);
   };

   //modal de confirmación
   const alertaSucces=()=>{
    Swal.fire({
    title: "Solicitaste tu cotización",
    html: "Te enviaremos una copia de tu cotización a tu correo electrónico y nos comunicaremos contigo en un plazo de 3 días hábiles para confirmar todos los detalles.",
    imageUrl: "https://cdn.shopify.com/s/files/1/0633/1459/1884/files/icon-done.svg?v=1706909092",
  imageWidth: 60,
  imageHeight: 60,
  showCloseButton: true,
  showConfirmButton: false,
    
    customClass: {
        popup: 'popAlert',
        title: 'titlePopup',
        htmlContainer: 'textpopup',
        closeButton: 'clodeBtnBtn'

    }
}).then((result) => {
    window.location = '/cart/clear';
    setTimeout(function(){
        window.location = '/';
    }, 1000);
    
});
}

//modal de error
const alertaError=()=>{
    Swal.fire({
    title: "No pudimos solicitar tu cotización",
    html: "Lo sentimos, pero algo ha salido mal al procesar tu solicitud. Por favor, verifica tu conexión a internet e inténtalo de nuevo.",
    imageUrl: "https://cdn.shopify.com/s/files/1/0633/1459/1884/files/icon-error.svg?v=1706911874",
  imageWidth: 60,
  imageHeight: 60,
  showCloseButton: true,
  confirmButtonText: `Volver a intentarlo`,
    customClass: {
        popup: 'popAlert',
        confirmButton: 'btn-siguiente',
        title: 'titlePopup',
        htmlContainer: 'textpopup',
        closeButton: 'clodeBtnBtn'

    }
}).then((result) => {
    location.reload();
});
}



    return (
        <>
            <div className='Wrapp-component'>
            

                <div className='cardComponent'>
                <Comentarios
                mesajeValue={mesajeValue}
                setMesajeValue={setMesajeValue}               
                />                   
                </div>
                <div className='cardComponent'>
                            
                <div className='Component-input' >
                <h3 className='title-card_component'>ID de cliente</h3>
                <AutoComplete  
                
                className='inputSearch'
                options={options}
                placeholder="Introduce ID"
                filterOption={true}
                onChange={
                    (event) => {
                        
                        const newValue = event.split(",");
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
                        <Sedes key={direccion} 
                        isActive={activeBtn}
                        setIsActive={setActiveBtn}
                        name={direccion} adressSelect={adressSelect}  setAdressSelect={setAdressSelect} />
                        )
                    ) : (<p className='nonInfo'> Introduce un ID de cliente para ver las direcciones disponibles </p>) }                              
                </SedesList>
                </div>
                <div className='cardComponent'>
                <TotalSend />
                <Button               
                type="primary"
                disabled = {activeBtn} 
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