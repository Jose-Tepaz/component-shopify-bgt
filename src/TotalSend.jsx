import './TotalSend.css';
//Comentamos esta constante antes de mandar a producción ya que tomamos esta variable desde shopify
//const totalsend = "5"
function TotalSend () {
    return (
        <div>
            <div className='wrapp-head-total'>
            <h3 className='title-card_component'>Total a cotizar </h3>
            <h3 className='title-card_component'>{totalsend} productos</h3>
            </div>
            
        </div>
    )
}
export {TotalSend};

// <button className='BtnSend'>Pedir cotización</button> 