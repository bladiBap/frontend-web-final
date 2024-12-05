"use client"

import TopicoCard from "@/components/topico/TopicoCard"
import { TopicoService } from "@/services/topicos/TopicoService"
import { useQuery } from "@tanstack/react-query"

const TopicosList = () => {
  const {
    data: topicos = [],
    isFetching
  } = useQuery({
    queryKey: ['topicos'],
    queryFn: TopicoService.getTopicos
  })

  return (
      <div className="flex flex-col gap-4">
        <h1 className='text-2xl font-bold text-primary'>
            Listado de tópicos
        </h1>
        <div className='flex flex-col gap-4 sm:flex-row'>
            {topicos.map(topico => (
                <TopicoCard
                    key={topico.id}
                    topico={topico}
                />
            ))}
        </div>
      </div>
  )
}

export default TopicosList