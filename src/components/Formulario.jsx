import React from 'react'
import {useState, useEffect} from 'react'
import Error from './Error';
const Formulario = ({pacientes,setPacientes,paciente,setPaciente}) => {
    const [nombre,setNombre] = useState('');
    const [dueño,setDueño] = useState('');
    const [email,setEmail] = useState('');
    const [alta,setAlta] = useState('');
    const [sintomas,setSintomas] = useState('');
    const [error,setError] = useState(false)
    useEffect(() => {
        if(Object.keys(paciente).length > 0){
            setNombre(paciente.nombre)
            setDueño(paciente.dueño)
            setEmail(paciente.email)
            setAlta(paciente.alta)
            setSintomas(paciente.sintomas)
        }
    }, [paciente])
    const generarID = ()=> {
        const random = Math.random().toString(36)
        const fecha = Date.now().toString(36)
        return random+fecha
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        //validacion de formulario
        if([nombre,dueño,email,alta,sintomas].includes('')){
            setError(true)
            return
        }
        setError(false)
        //construccion del paciente
        const objetoPaciente = {
            nombre,
            dueño,
            email,
            alta,
            sintomas,
        }

        if(paciente.id){
            //editando el registro
            objetoPaciente.id = paciente.id
            const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? 
                objetoPaciente : pacienteState)
            setPacientes(pacientesActualizados)
            setPaciente({})
        }else{
            //nuevo registro
            objetoPaciente.id=generarID()
            setPacientes([...pacientes,objetoPaciente])
        }



        //Reiniciar el form
        setNombre('')
        setDueño('')
        setEmail('')
        setAlta('')
        setSintomas('')
    }
    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">Segumiento Pacientes</h2>
            <p className='mt-5 text-center mb-10 text-xl'>
                Añade Pacientes y {''}
                <spam className="text-indigo-600 font-bold ">
                    Administralos
                </spam>
            </p>
            <form 
            onSubmit={handleSubmit}
            className='bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5'>
                {error && <Error mensaje='Todos los campos son obligatorios'/>}
                <div className='mb-5'>
                    <label htmlFor="mascota" className='block text-gray-700 uppercase font-bold'>Nombre Mascota</label>
                    <input 
                        id="mascota"
                        type="Text" 
                        placeholder="Nombre de la mascota" 
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        value={nombre}
                        onChange={(e)=>setNombre(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <label htmlFor="prop" className='block text-gray-700 uppercase font-bold'>Nombre del Dueño</label>
                    <input 
                        id="prop"
                        type="Text" 
                        placeholder="Nombre del dueño" 
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        value={dueño}
                        onChange={(e)=>setDueño(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <label htmlFor="email" className='block text-gray-700 uppercase font-bold'>Email Contacto del Dueño</label>
                    <input 
                        id="email"
                        type="email" 
                        placeholder="Email de contacto del dueño" 
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <label htmlFor="alta" className='block text-gray-700 uppercase font-bold'>
                        Alta
                    </label>
                    <input 
                        id="alta"
                        type="date" 
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        value={alta}
                        onChange={(e)=>setAlta(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <label htmlFor="sintomas" className='block text-gray-700 uppercase font-bold'>
                        Sintomas
                    </label>
                    <textarea 
                        id="sintomas"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        placeholder='Describe los sintomas de la mascota'
                        value={sintomas}
                        onChange={(e)=>setSintomas(e.target.value)}
                    />
                </div>
                <input
                    type="submit"
                    className='bg-indigo-600 w-full p-3 text-white uppercase font-bold 
                    hover:bg-indigo-700 cursor-pointer transition-all rounded-md'
                    value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
                />
                
            </form>
        </div>
        
    )
}

export default Formulario
