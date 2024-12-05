import CuestionarioInfo from '@/components/cuestionario/CuestionarioInfo';
import { Cuestionario } from '@/models/Cuestionario'
import { CuestionarioService } from '@/services/CuestionarioService';

export const getStaticPaths = async () => {
    const cuestionarios = await CuestionarioService.getAll();

    const paths = cuestionarios.map((cuestionario) => ({
        params: { id: cuestionario.id.toString() },
    }))
    return { paths, fallback: true }
}


const page = async (
    { params }: any
) => {
    const cuestionario = await CuestionarioService.getCuestionario(params.id);

    return (
        <>
            <CuestionarioInfo cuestionario={cuestionario} />
        </>
    )
}

export default page