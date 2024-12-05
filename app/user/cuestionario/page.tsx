"use client"
import CuestionarioCard from '@/components/cuestionario/CuestionarioCard';
import { CuestionarioService } from '@/services/CuestionarioService'
import { Button } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react'

const CuestionarioList = () => {
  const {
    data: cuestionarios = []
  } = useQuery({
    queryKey: ['cuestionarios'],
    queryFn: CuestionarioService.getCuestionariosByUser
  });

  return (
    <>
      <div className='flex flex-col justify-between'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-semibold text-primary'>Mis Cuestionarios</h1>
          <Link
            href='/user/cuestionario/form'
          >
            <Button
              color='success'
            >
              Crear Cuestionario
            </Button>
          </Link>
        </div>
        <p className='mb-4'>
          Aquí puedes ver los cuestionarios que has creado. Puedes editarlos o eliminarlos.
        </p>
      </div>
      <div className='flex flex-col gap-4 sm:flex-row'>
        {cuestionarios.map(cuestionario => (
          <CuestionarioCard
            key={cuestionario.id}
            cuestionario={cuestionario}
            is_editable
          />
        ))}
      </div>
    </>
  )
}

export default CuestionarioList