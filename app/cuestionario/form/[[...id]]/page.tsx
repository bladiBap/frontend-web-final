import CuestionarioForm from '@/components/cuestionario/CuestionarioForm'
import React from 'react'

const CuestionarioFormPage = (
    { params } : any
) => {
    const id = params.id

    return (
        <CuestionarioForm 
            id={id}
        />
    )
}

export default CuestionarioFormPage