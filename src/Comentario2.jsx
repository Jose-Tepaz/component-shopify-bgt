import React, { useState } from 'react';
import './Comentarios.css';
import arrow from '../assets/arrow-cmentarios.svg';

const Comentario2 = () => {
  const [selectedSKU, setSelectedSKU] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Para controlar qué comentario está siendo editado
  const [disabledSKUs, setDisabledSKUs] = useState([]); // Para rastrear los SKU deshabilitados

  //despliega todo el componente de select
  const [isOpenComponentComent, setIsOpenComponentComent] = useState(false);

  //Despliega el componente select + textArea
  const [isOpenSelectTextArea, setIsOpenSelectTextArea] = useState(true);

 

  //Descpliega el select
  const [isOpen, setIsOpen] = useState(false);

  //Descpliega el select
  const [nuevoComentario, setNuevoComentario] = useState(false);

  // Opciones de SKU
  const options = [
    'SKU 1513-1531',
    'SKU 1513-1532',
    'SKU 1513-1533',
    'SKU 1513-1534',
    'SKU 1513-1535',
  ];

  // Función para manejar el select de SKU
  const handleSKUSelect = (e) => {
    setSelectedSKU(e.target.value);
  };

  const handleSKUSelect2 = (option) => {
    setSelectedSKU(option);
    setIsOpen(!isOpen)

  };


  // Función para manejar el textarea de comentarios
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // Función para guardar el SKU y el comentario
  const handleSave = () => {
    if (selectedSKU && comment) {
      if (editIndex !== null) {
        // Si estamos en modo edición, actualizamos el comentario en esa posición
        const updatedComments = [...comments];
        updatedComments[editIndex] = { sku: selectedSKU, comment };
        setComments(updatedComments);
        setEditIndex(null); // Salimos del modo de edición
        setIsOpenSelectTextArea(!isOpenSelectTextArea) //Oculta / muestra select + textatea
        setNuevoComentario(!nuevoComentario) //Muestra botón agregar nuevo comentario
        
      } else {
        // Si no estamos en modo edición, agregamos un nuevo comentario
        setComments([...comments, { sku: selectedSKU, comment }]);
        setDisabledSKUs([...disabledSKUs, selectedSKU]); // Deshabilitamos el SKU seleccionado
        setIsOpenSelectTextArea(!isOpenSelectTextArea) //Oculta / muestra select + textatea
        setNuevoComentario(!nuevoComentario) //Muestra botón agregar nuevo comentario
      }
      setSelectedSKU(''); // Limpiar selección de SKU
      setComment(''); // Limpiar textarea de comentario
    } else {
      alert('Por favor selecciona un SKU y agrega un comentario.');
    }
  };

  // Función para manejar la edición de un comentario
  const handleEdit = (index) => {
    const commentToEdit = comments[index];
    setSelectedSKU(commentToEdit.sku);
    setComment(commentToEdit.comment);
    setEditIndex(index); // Almacenamos el índice del comentario que estamos editando
    setIsOpenSelectTextArea(true) //Oculta / muestra select + textatea
    setNuevoComentario(false);
  };

  // Función para eliminar un comentario
  const handleDelete = () => {

    const commentToDelete = comments[editIndex];
    
    const updatedComments = comments.filter((_, i) => i !== editIndex);
    setComments(updatedComments);

     // Rehabilitamos el SKU eliminado
     setDisabledSKUs(disabledSKUs.filter((sku) => sku !== commentToDelete.sku));

    setSelectedSKU('');
    setComment('');
    setEditIndex(null);

    setIsOpenSelectTextArea(false) //Oculta / muestra select + textatea
    setNuevoComentario(true);
    
  };

  const isNuevoComentario = () => {
    setIsOpenSelectTextArea(!isOpenSelectTextArea)
    setNuevoComentario(!nuevoComentario)

  }

  return (
    
    
    <div style={{  padding: '0', width: '100%' }}>

      <div className='wrapp-tile-narrow' onClick={() => setIsOpenComponentComent(!isOpenComponentComent)}>
        <h3 className='title-card_component'>Agregar comentarios <span>(Opcional) </span></h3>
        
      </div>



      {/* Mostrar la lista de SKU y comentarios */}
      {isOpenComponentComent && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            
            {comments.length > 0 ? (
              comments.map((entry, index) => (
            <div 
            key={index} 
            className='cardComentAdded'
            >
              <p style={{ flex: 1 }}>
                <span>{entry.sku}</span>: {entry.comment}
              </p>
              <div>
                <button
                  onClick={() => handleEdit(index)}
                  style={{
                    padding: '0',
                    marginLeft: '10px',
                    cursor: 'pointer',
                    border: 'none',
                    background: 'transparent',
                    marginRight: '5px',
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                    <path d="M11.5 6H5.66667C5.22464 6 4.80072 6.17559 4.48816 6.48816C4.17559 6.80072 4 7.22464 4 7.66667V19.3333C4 19.7754 4.17559 20.1993 4.48816 20.5118C4.80072 20.8244 5.22464 21 5.66667 21H17.3333C17.7754 21 18.1993 20.8244 18.5118 20.5118C18.8244 20.1993 19 19.7754 19 19.3333V13.5" stroke="#C8C8C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17.9227 4.52798C18.2607 4.18992 18.7193 4 19.1973 4C19.6754 4 20.134 4.18992 20.472 4.52798C20.8101 4.86605 21 5.32456 21 5.80265C21 6.28075 20.8101 6.73926 20.472 7.07732L12.3991 15.1502L9 16L9.84978 12.6009L17.9227 4.52798Z" stroke="#C8C8C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          ))
          ) : (
          <p></p>
          )}
          </div>

          {isOpenSelectTextArea && (
            <div className='wrapp-select-textArea'>
              <div className='wrapp-select-sku'>
              <p className='title-card_component'>El comentario   refiere a</p>
              <p className='nonInfo'>Selecciona un SKU para vincularlo.</p>
              </div>
              <div className='wrapp-all-component-select' >
              <div
                onClick={() => setIsOpen(!isOpen)}
                className='wrapp-select'

              >
                {selectedSKU || 'Selecciona una opción'}
        
                <div
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    marginLeft: '10px',
                    marginBottom: '0px',
                  }}
                >
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://org/2000/svg">
                    <path d="M1 1L7 7L13 1" stroke="#9E9E9E" stroke-widstroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                </div>

              </div>
              {isOpen && (
                <ul className='options-select'>
                  {options.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => 
                        handleSKUSelect2(option)
                        }
                      style={{
                        backgroundColor: selectedSKU === option ? '#F5F5F5' : 'transparent',
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}

              </div>
               {/* Textarea para agregar comentario */}
              <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Escribe tu comentario aquí..."
               className='text-area-input'
               rows='4' 
              ></textarea>

              {/* Botón para guardar o actualizar */}
              <div className='wrapp-btns-comentas'>
              <button onClick={handleSave} className='guardarComentsBtn'>
                {editIndex !== null ? 'Guardar cambios' : 'Guardar'}
              </button>
              
                <button
                onClick={() => handleDelete()}
                
                style={{
                  display: editIndex !== null ? 'block' : 'none',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  color: '#1C83E3',
                  border: 'none',
                  borderRadius: '4px',
                  fontFamily: 'Neue Montreal',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
                >
                  Eliminar
                </button>

              
              
              </div>
            </div>
          )}
          {nuevoComentario && (
            <button
                onClick={() => isNuevoComentario()}
                style={{
                  
                  padding: '8px 16px',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  color: '#1C83E3',
                  border: 'none',
                  borderRadius: '4px',
                  fontFamily: 'Neue Montreal',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
                >
                  Agregar comentario
            </button>
          )}
        </div>
      )}
      

      {/* Select para elegir el SKU 
      <select
        value={selectedSKU}
        onChange={handleSKUSelect}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      >
        <option value="">Selecciona un SKU</option>
        {options.map((option, index) => (
          <option key={index} value={option} disabled={disabledSKUs.includes(option)}>
            {option}
          </option>
        ))}
      </select>

*/}

      
      




      
      
    </div>
  );
};

export { Comentario2 };
