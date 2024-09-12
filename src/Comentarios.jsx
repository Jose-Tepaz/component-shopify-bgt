import React, { useEffect } from 'react';
import arrow from '../assets/arrow-cmentarios.svg';
import './Comentarios.css';
import { Select, Space, Collapse } from 'antd';




function Comentarios({
    mesajeValue,
    setMesajeValue,
} ) {
      useEffect(() => {
        console.log(mesajeValue)
        //console.log(insertMesaje)
      }, [mesajeValue])
    /*Estado para mostrar el textarea*/
    const [showInput, setShowInput] = React.useState(false);

    /*Funcion para mostrar el textarea*/
    function changeClass() {
        setShowInput(showInput => !showInput);
        
    }

    let toggleClass = showInput ? ' wrapp-input-text-area': '';
    let toggleClassArrow = showInput ? ' imgArrow--active': '';

    /*Estado para mostrar el valor del select en el text area*/
    const [insertMesaje, setInsertMesaje] = React.useState("");

    const [despliegaTextArea, setDespliegaTextArea] = React.useState(false);

    /*Funcion para mostrar el valor del select en el text area*/
    const handleChange = (value, option) => {
      console.log(value); 
      
      // Preserve the existing value of insertMesaje when the function runs again
      
      setInsertMesaje(value + " : ");
    
    };

    /*Opciones para el select de SKUs*/
    const options = [
      {
        label: 'SKU 1513-1531',
        value: 'SKU 1513-1531',
        desc: 'SKU 1513-1531',
      },
      {
        label: 'SKU A513-1531',
        value: 'SKU A513-1531',
        desc: 'SKU A513-1531',
      },
      {
        label: 'SKU E513-1531',
        value: 'SKU E513-1531',
        desc: 'SKU E513-1531',
      },
      {
        label: 'SKU G513-1531',
        value: 'SKU G513-1531',
        desc: 'SKU G513-1531',
      },
    ];


    //Guarde el valor del text area en un nuevo estado y lo pinta
    function addvaluetoState (dataValues) {
        //setMesajeValue(dataValues)
        setInsertMesaje(dataValues );
    }

  function visibilityTextare () {
    setDespliegaTextArea(true)
  }

    /*Oculta el textarea despues de guardar el dato del estado*/
    let changeclass = despliegaTextArea == true ? ' wrapp-inpitMesaje--hide' : '';
    
    /*let changeclass = insertMesaje != null ? ' wrapp-inpitMesaje--hide' : '';*/

    let hiddeBtn = insertMesaje == null ? ' editBtn--hidde' : '';

    function guarndoDatoenMensajeValue(dataValues){
      //setMesajeValue(dataValues) 
    // Preserve the existing value of mesajeValue when the function runs again

    setMesajeValue((prevItems) => [...prevItems, dataValues]);


    /*setMesajeValue(prevValue => {
      // If there's an existing value, append the new value
      
      if (prevValue && prevValue !== "No hay comentarios") {
        return prevValue + "\n" + dataValues + "\n";
      }
      // If there's no existing value or it's the default, just set the new value
      return dataValues;
    });*/
    }
      

    return (
        <div>
            <div 
            className='wrapp-tile-narrow'
            onClick={changeClass}>
            <h3 className='title-card_component'>Agregar comentarios <span>(Opcional)</span></h3>
            <img 
            className={`imgArrow${toggleClassArrow}`}
            src={arrow}/>
            </div>
            <div className={`wrapp-input-text-area--hidde${toggleClass}`}>
                <h3 className='TextComment'>{mesajeValue}</h3>
                <div className={`wrapp-inpitMesaje${changeclass}`} >
                    {/*Inicia componente para elejir SKU para comentarios*/}
                    <div className='wrapp-select-sku'>
                        <p className='title-card_component'>Elije un Sku</p>
                        <Select
                           
                            style={{
                              width: '100%',
                            }}
                            mode='tag'
                            placeholder="select one country"
                            defaultValue={[]}
                            /*onChange={addvaluetoState}*/
                            onChange={handleChange}
                            
                            options={options}
                            optionRender={(option) => (
                            <Space>
                              <span role="img" aria-label={option.data.label}>
                                {option.data.emoji}
                              </span>
                              {option.data.desc}
                            </Space>
                            )}
                        />
                    </div>
                {/*Inicia componente para agregar comentarios */}
                
                <textarea 
                
                className='text-area-input'
                type='text-area' 
                placeholder='Introduce tus comentarios' 
                value={insertMesaje}
                rows='4' 
                onChange={ (event) => {
                   //setMesajeValue(event.target.value)
                    
                    setInsertMesaje(event.target.value);

                } }
                />
                
                <button className='guardarComents'
                onClick={ 
                    () => {
                      guarndoDatoenMensajeValue(insertMesaje);    
                                     
                        addvaluetoState (insertMesaje),
                        visibilityTextare();
                        console.log("se activo")    
                       
                                  
                    }                  
                }
                >
                 
                Guardar
                </button>

                </div>
                
                <div>
                
                <p className={`editBtn${hiddeBtn}`}
                onClick={
                    () => {
                        setInsertMesaje(null);
                        setDespliegaTextArea(false);
                        
                    }
                }
                >Agregar comentarios</p>

            </div>
                
            </div>
            
        </div>
        
    );
}

export { Comentarios };







