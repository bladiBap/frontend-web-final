import { Spinner } from "@nextui-org/react"


const LoadingBg = (
    { isLoading }: { isLoading: boolean }
) => {
    return (
        isLoading ? (
            <div className="flex justify-center items-center absolute w-full h-full top-0 left-0 bg-black/50">
                <Spinner size="lg" label="Cargando...."/>
            </div>
        ) : null
    )
}

export default LoadingBg