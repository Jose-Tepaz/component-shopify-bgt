import React, { useEffect, useState, useRef } from 'react';
import { Almacenacomentarios } from './Almacenacomentarios';
import arrow from '../assets/arrow-cmentarios.svg';
import './Comentarios.css';
import { Select, Space, Form, Collapse, Button, } from 'antd';




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

    //objeto para almacenar el SKU
    const [comentarioCompleto, setComentarioCompleto] = useState([]);
    const [skuSeleccionado, setSkuSeleccionado] = React.useState('');
    const [comentarioTextAria, setComentarioTextArea] = useState('')
    
    //texto por defecto en el select
    const [textDefault, setTextDefault] = useState('Elija una opción')
    
    const [selectedValue, setSelectedValue] = useState("");
    /*Funcion para mostrar el valor del select en el text area*/

    const selectSku = (value) => {
   
      
      setSkuSeleccionado(value)

    };

    

    /*Opciones para el select de SKUs*/
    const options = [
      {
        label: 'Todo el pedido',
        value: 'Todo el pedido',
        desc: 'Todo el pedido',
      },
      {
        label: 'SKU 1513-1531',
        value: 'SKU 1513-1531',
        desc: 'SKU 1513-1531',
      },
      {
        label: 'SKU A513-1532',
        value: 'SKU A513-1532',
        desc: 'SKU A513-1532',
      },
      {
        label: 'SKU E513-1533',
        value: 'SKU E513-1533',
        desc: 'SKU E513-1533',
      },
      {
        label: 'SKU G513-1534',
        value: 'SKU G513-1534',
        desc: 'SKU G513-1534',
      },
    ];


    //Guarde el valor del text area en un nuevo estado y lo pinta
    function addvaluetoState (dataValues) {
        //setMesajeValue(dataValues)
        setInsertMesaje(dataValues );
        setComentarioTextArea(dataValues)
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

    //setMesajeValue((prevItems) => [...prevItems, dataValues]);
    setComentarioTextArea(dataValues)
    console.log(comentarioTextAria)

    /*setMesajeValue(prevValue => {
      // If there's an existing value, append the new value
      
      if (prevValue && prevValue !== "No hay comentarios") {
        return prevValue + "\n" + dataValues + "\n";
      }
      // If there's no existing value or it's the default, just set the new value
      return dataValues;
    });*/
    }
      
    const agregarComentario = () => {
      //valida si esta seteado el SKU y tiene un comentario
      if (skuSeleccionado && comentarioTextAria) {
        setComentarioCompleto((estadoAnterior) => [
          ...estadoAnterior,
          { skuSeleccionado, comentarioTextAria }  // Crear un objeto con las dos propiedades
        ]);
        // Limpiar los estados temporales después de agregar el producto
        setSkuSeleccionado('');
        setComentarioTextArea('');

        console.log(comentarioCompleto + "aqui esta")
      } else {
        alert('Debe ingresar ambos valores para agregar el producto');
      }
    };
  
//Esta funcion elimina el sku y comentario del array de comentario completo 
const eliminarProducto = (index) => {
  setComentarioCompleto((estadoAnterior) => 
    estadoAnterior.filter((_, i) => i !== index) // Excluir el item con el índice dado
  );
};

function agregarOtroComentario() {
  setInsertMesaje("");
  setDespliegaTextArea(false);

  setTextDefault("Elija una opción")
  console.log(insertMesaje)
  setSelectedValue(""); // Limpia el valor del select

  setSelectedOption(null);
 
  
}


const handleChange = (event) => {
  setSelectedValue(event.target.value); 
  setSkuSeleccionado(event.target.value)// Actualiza el estado con el valor seleccionado
};


const [isOpen, setIsOpen] = useState(false);
const [selectedOption, setSelectedOption] = useState(null);
//const optionses = Array.from({ length: 10 }, (_, index) => `Opción ${index + 1}`);
const optionses = [
  'Todo el pedido',
  'SKU 1513-1531',
  'SKU 1513-1532',
  'SKU 1513-1533',
  'SKU 1513-1534',
  'SKU 1513-1535'
];

const handleOptionClick = (option) => {
  setSelectedOption(option);
  setIsOpen(false);
  setSkuSeleccionado(option)
};



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
            <ul
            className='list-coments'
            >
            {comentarioCompleto.map((producto, index) => (
              <li key={index}>
                <div 
                className='element-coment'
                >
                {producto.skuSeleccionado}: {producto.comentarioTextAria}
                {/* Botón para eliminar producto */}
                <button onClick={() => eliminarProducto(index)}>
                  Eliminar
                </button>
                </div>
                
              </li>
            ))}
        </ul>
                
                
                <div className={`wrapp-inpitMesaje${changeclass}`} >
                    {/*Inicia componente para elejir SKU para comentarios*/}
                    <div className='wrapp-select-sku'>
                        <p className='title-card_component'>El comentario refiere a</p>
                        <p className='title-card_component'>Selecciona un SKU para vincularlo.</p>
                      
                        {/*
                        <Select
                            style={{
                              width: '100%',
                            }}
                            mode='tag'
                            placeholder="Selecciona un sku"
                            autoFocus="true"
                            defaultValue={[textDefault]}
                            
                            onChange={selectSku}
                            
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
                        */}
                    </div>



                    <div className='wrapp-all-component-select' >
                      <div
                        onClick={() => setIsOpen(!isOpen)}
                        className='wrapp-select'
                       
                      >
                        {selectedOption || 'Selecciona una opción'}
                        
                        <div
                          style={{
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease',
                            marginLeft: '10px',
                            marginBottom: '0px',
                          }}
                        >
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1L7 7L13 1" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                        </div>

                      </div>

                      {isOpen && (
                        <ul
                        className='options-select'
                         
                        >
                          {optionses.map((option, index) => (
                            <li
                              key={index}
                              onClick={() => handleOptionClick(option)}
                              style={{
                                backgroundColor: selectedOption === option ? '#F5F5F5' : 'transparent',
                              }}
                              
                            >
                              {option}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/*Inicia componente para agregar comentarios */}
                
                    <textarea 
                    className='text-area-input'
                    type='text-area' 
                    placeholder='Introduce tus comentarios' 
                    value={insertMesaje}
                    rows='4' 
                    onChange={ (event) => {
                        setInsertMesaje(event.target.value);
                        setComentarioTextArea(event.target.value);

                    } }
                    />
                
                    <button className='guardarComents'
                    onClick={ 
                        () => {
                          
                          addvaluetoState (insertMesaje),
                          visibilityTextare();
                          console.log("se activo")    
                          agregarComentario()
                        }                  
                    }
                    >
                    Guardar
                    </button>
                </div>
                
            <div>
         
                <p 
                className={`editBtn${hiddeBtn}`}
                onClick={() => {
                  agregarOtroComentario()
                  
                }
                }
                >Agregar comentarios</p>

            </div>
                
            </div>
            
        </div>
        
    );
}

export { Comentarios };







