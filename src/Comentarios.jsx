import React from 'react';
import arrow from '../assets/arrow-cmentarios.svg';
import './Comentarios.css';
import { Select, Space, Collapse } from 'antd';


const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const options = [
    {
      label: 'SKU 1513-1531:',
      value: 'SKU 1513-1531:',
      desc: 'SKU 1513-1531:',
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

function Comentarios({
    mesajeValue,
    setMesajeValue,
} ) {

    const [showInput, setShowInput] = React.useState(false);

    function changeClass() {
        setShowInput(showInput => !showInput);
    }

    let toggleClass = showInput ? ' wrapp-input-text-area': '';
    let toggleClassArrow = showInput ? ' imgArrow--active': '';

    const [insertMesaje, setInsertMesaje] = React.useState(null);

    //Guarde el valor del text area en un nuevo estado y lo pinta
    function addvaluetoState (dataValues) {
        //setMesajeValue(dataValues)
        setInsertMesaje(dataValues);
    }

    //Oculta el textarea despues de guardar el dato del estado
    
    let changeclass = insertMesaje != null ? ' wrapp-inpitMesaje--hide' : '';

    let hiddeBtn = insertMesaje == null ? ' editBtn--hidde' : '';
    
   

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
                <h3 className='TextComment'>{insertMesaje}</h3>
                <div className={`wrapp-inpitMesaje${changeclass}`} >
                    {/*Inicia componente para elejir SKU para comentarios*/}
                    <div className='wrapp-select-sku'>
                        <p className='title-card_component'>Elije un Sku</p>
                        <Select
                            mode="multiple"
                            style={{
                              width: '100%',
                            }}
                            placeholder="select one country"
                            defaultValue={['china']}
                            onChange={addvaluetoState}
                            /*onChange={handleChange}*/
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
                onChange={ (evetn) => {
                    setMesajeValue(evetn.target.value)
                } }
                />
                <button className='guardarComents'
                onClick={ 
                    () => {
                        addvaluetoState (mesajeValue),
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
                    }
                }
                >Editar comentarios</p>

            </div>
                
            </div>
            
        </div>
        
    );
}

export { Comentarios };







