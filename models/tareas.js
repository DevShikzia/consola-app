
/* 

   _listado: 
             { 'uuid-122134324324-32432432-432423: { id:12, desc:asasds,compleadoEN:99929 }   }                         }

*/

import observe from "inquirer/lib/utils/events.js";
import { Tarea } from "./tarea.js";

class Tareas {
  _listado = {}

  get listadoArr(){
         const listado = [];
         Object.keys(this._listado).forEach(key =>{
             const tarea = this._listado[key];
             listado.push(tarea);
         })
                      
         return listado;



  }
     

     constructor(){
        this._listado = {}
     }

     borrarTarea( id = ''){
            if(this._listado[id]){
               delete this._listado[id]
            }
     }

      cargarTareasFromArray(tareas = []){
             
         tareas.forEach(tarea =>{
           this._listado[tarea.id] = tarea
         })
    

     }


     crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
     }

     listadoCompleto(){
         console.log()
         this.listadoArr.forEach((tarea,i) =>{
            const idx = `${i + 1}.`.yellow
            const {desc,completadoEn} = tarea;
            const estado = (completadoEn)
                                       ? 'Completado'.green
                                       : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`)

         })
     }

     listadoTrue(completadas = true){
         const tareas = (completadas)
                                    ? 
       this.listadoArr.filter(tarea => tarea.completadoEn !== null)
                                    :
       this.listadoArr.filter(tarea => tarea.completadoEn === null)
 
       tareas.forEach((tarea,i) => {
         const idx = `${i + 1}.`.yellow
         const {desc,completadoEn} = tarea;
         const estado = (completadoEn)
                                    ? `Completado: ${completadoEn}`.green
                                    : 'Pendiente'.red;

         console.log(`${idx} ${desc} :: ${estado}`)

      })

   }
   toggleCompletadas(ids = []){
                 
         ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn) {
               tarea.completadoEn = new Date().toISOString();
            }

         });
      
         this.listadoArr.forEach(tarea => {
             if(!ids.includes(tarea.id) ) {
               this._listado[tarea.id].completadoEn = null
             }
         });
   }
     
}

export {Tareas};