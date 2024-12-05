import CuestionarioCard from "@/components/cuestionario/CuestionarioCard";
import { TopicoService } from "@/services/topicos/TopicoService";

export const getStaticPaths = async () => {
    const topicos = await TopicoService.getTopicos();

    const paths = topicos.map((topico) => ({
        params: { id: topico.id.toString() },
    }))

    return { paths, fallback: true }
}

const TopicoDetalle = async (
    { params }: any
) => {
    const topico = await TopicoService.getTopicoById(params.id);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                <h1 className='text-2xl font-bold text-primary'>
                    {topico.nombre}
                </h1>
                <p>
                    {topico.descripcion}
                </p>
            </div>
            <div className="flex flex-col gap-4">
                <h2 className='text-xl font-semibold text-primary'>
                    Cuestionarios
                </h2>
                <div className='flex flex-col gap-4 sm:flex-row'>
                    {topico.cuestionarios.map(cuestionario => (
                        <CuestionarioCard
                            key={cuestionario.id}   
                            cuestionario={cuestionario}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TopicoDetalle