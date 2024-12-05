import { useCallback } from "react";
import { MdEdit, MdDelete  } from "react-icons/md";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Tooltip} from "@nextui-org/react";

type User = typeof users[0];

interface TableProps {
    items: [];
    columns: [];
    onEdit: () => void;
    onDelete: () => void;
}

export default function TableComponent({items, columns, onEdit, onDelete}: TableProps) {
    const renderCell = useCallback((item, columnKey) => {
        const cellValue = item[columnKey as keyof User];
        switch (columnKey) {
            case "por_puntos":
                return cellValue ? "Sí" : "No";
            case "actions":
                return (
                <div className="relative flex items-center gap-2">
                    <Tooltip content="Editar">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => onEdit(item)}>
                            <MdEdit />
                        </span>
                    </Tooltip>
                    <Tooltip content="Eliminar" color="danger">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => onDelete(item)}>
                            <MdDelete />
                        </span>
                    </Tooltip>
                </div>
                );
            case "powerup":
                return cellValue.nombre;
            default:
                return cellValue;
        }
    }, []);

    return (
        <Table aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
                {(column) => (
                <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                    {column.name}
                </TableColumn>
                )}
            </TableHeader>
            <TableBody items={items}>
                {(item) => (
                <TableRow key={item.id}>
                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
                )}
            </TableBody>
        </Table>
    );
}