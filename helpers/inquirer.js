import inquirer from 'inquirer';

import colors from 'colors';

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${"1.".yellow} Crear tarea` 
            },
            {
                value: '2',
                name: `${"2.".yellow} Listar tarea(s)`
            },
            {
                value: '3',
                name: `${"3.".yellow} Listar tarea(s) completada(s)`
            },
            {
                value: '4',
                name: `${"4.".yellow} Listar tarea(s) pendiente(s)`
            },
            {
                value: '5',
                name: `${"5.".yellow} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${"6.".yellow} Borrar tarea(s)`
            },
            {
                value: '0',
                name: `${"0.".yellow} Salir`
            }
        ]
    }

]

const inquirerMenu = async() =>{
        
         console.clear();
        console.log('======================================='.magenta);
        console.log('======================================='.magenta);
        console.log(`${"=====".magenta}    ${"SELECCIONE UNA OPCION".yellow}    ${"=====".magenta}`);
        console.log('======================================='.magenta);
        console.log('=======================================\n'.magenta);
        
       const {opcion} = await inquirer.prompt(preguntas)
       return opcion;
 
    }

    const pause = async () => {
        
        const questions = [{
            type:'input',
            name: 'pause',
            message: `presion ${"ENTER".yellow} para continuar`
      
          }]
        console.log('\n')
        await inquirer.prompt(questions)


}

const leerInput = async(message) => {
    const question = [
        {
            type:'input',
            name: 'desc',
            message,
            validate(value){
                if( value.length === 0){
                    return 'Por favor ingrese un valor'.bgRed
                }
                return true

            }
        }
    ];
      
    const {desc} = await inquirer.prompt(question)
    return desc
}

const listadoTareasBorrar = async(tareas = []) => {
  const choices = tareas.map( (tarea,i) => {
    
     const idx =  `${i + 1}.`.yellow

       return{
             value: tarea.id,
             name: `${idx}  ${tarea.desc}`
       }
    
  });
   
  choices.unshift({
    value: '0',
    name: '0.'.yellow + ' CANCELAR'.red
  })

     const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
     ]

       const {id} = await inquirer.prompt(preguntas)
       return id;


}

const confirmar = async(message) =>{
    const question = [
        {
            type:'confirm',
            name: 'ok',
            message,
        }
    ];

      const {ok} = await inquirer.prompt(question);
      return ok;
}

const mostrarListadoCheckList = async(tareas = []) => {
    const choices = tareas.map( (tarea,i) => {
      
       const idx =  `${i + 1}.`.yellow
  
         return{
               value: tarea.id,
               name: `${idx}  ${tarea.desc}`,
               checked: (tarea.completadoEn) ? true : false
         }
      
    });
     
  
       const preguntas = [
          {
              type: 'checkbox',
              name: 'ids',
              message: 'Selecciones',
              choices
          }
       ]
  
         const {ids} = await inquirer.prompt(preguntas)
         return ids;
  
  
  }

    export { inquirerMenu, 
            pause, 
            leerInput,
            listadoTareasBorrar,
            confirmar,
            mostrarListadoCheckList
            };