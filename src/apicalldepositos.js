import axios from "axios";
import { all } from "micromatch";


const listDirecciones = async(state, id) => {

    try {
        const peticion = await axios.get(`https://api.airtable.com/v0/appVwlmLP1164Ceku/tblgGAZYgdKhaKu7f?filterByFormula=Find(%22${id}%22%2C+IDcliente)`, {
            headers: {
                'Authorization': 'Bearer patRKAOUDaKjoM6c1.6564c9ab0b43954c74d0c41430eceb4a7f18a009249a22924ad944024e2d7446',
            }

        });

        //const direcciones = peticion.data.records[2].fields.DireccionesDepositos;

        //console.log(id);
        //console.log(peticion.data.records);


        if (peticion.data.records[0].fields.IDcliente === id) {

            const direcciones = peticion.data.records[0].fields.DireccionesDepositos;
            state(direcciones);
            console.log(direcciones);


        } else if (peticion.data.records.length >= 2) {
            //console.log("ya esta registrado");
            state(null);
        } else {
            //console.log("se ejecuto");
            state(null);
        }

    } catch (error) {
        console.log(error);
    }

}

export {
    listDirecciones
}