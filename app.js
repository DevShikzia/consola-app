import colors from 'colors';
import { guardarDB,
         leerDb } from './helpers/guardarArchivo.js';
import { inquirerMenu,
          pause,
          leerInput, 
          listadoTareasBorrar,
          confirmar,
          mostrarListadoCheckList} from './helpers/inquirer.js';
import { Tareas } from './models/tareas.js';

const main = async() => {
    

      let opt = '';  
      const tareas = new Tareas();

      const tareasDB = leerDb();

      if( tareasDB){
     // TODO: CARGAR TAREA 
      tareas.cargarTareasFromArray(tareasDB)
      }



      do {

           opt = await inquirerMenu();
           switch (opt) {
            case '1':
                    const desc = await leerInput('Descripcion: ');
                     tareas.crearTarea(desc);

                break;
            case '2':
              tareas.listadoCompleto()
               //  console.log(tareas.listadoArr);
                break;
            case '3':
              tareas.listadoTrue(true)
                break;
            case '4':
              tareas.listadoTrue(false)
                break;
            case '5':
            const ids = await mostrarListadoCheckList(tareas.listadoArr)
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                 const id = await listadoTareasBorrar(tareas.listadoArr);
                 if(id !== '0'){ 
                 const ok = await confirmar('Esta seguro?');
                 if(ok){
                  tareas.borrarTarea(id);
                  console.log('Tarea eliminada con exito :B');
                 }
                }
                break;
           
           }

           guardarDB(tareas.listadoArr);
        
        // console.log({opt})


         await pause()
        
      } while (opt !== '0');
}

main();