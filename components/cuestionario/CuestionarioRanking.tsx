"use client"
import { Cuestionario } from "@/models/Cuestionario"
import { CuestionarioService } from "@/services/CuestionarioService"
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"

type Props = {
    cuestionario: Cuestionario
}

const CuestionarioRanking = (
    { cuestionario } : Props
) => {
    const {
        data: ranking,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["cuestionario", cuestionario.id, "ranking"],
        queryFn: () => CuestionarioService.getRanking(cuestionario.id),
        placeholderData: []
    })

    const columns = [
        {
            key: "usuario",
            label: "Usuario"
        },
        {
            key: "puntaje",
            label: "Puntaje"
        }
    ]
    return (
        <Table
            isStriped removeWrapper
        >
            <TableHeader>
                {columns.map((column) =>
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
            </TableHeader>
            <TableBody>
                {ranking?.map((row) =>
                    <TableRow key={row.usuario}>
                        {(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
                    </TableRow>
                ) ?? <></>}
            </TableBody>
        </Table>
    )
}

export default CuestionarioRanking