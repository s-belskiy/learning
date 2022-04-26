import React, {useMemo, useState} from "react";
import {useMutation, useQuery} from "react-query";
import * as api from "./api/users.api";
import {Backdrop, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import User from "./User/User";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

const COLUMNS = ['Имя', 'Фамилия', 'Почта', 'Действие'];

const Users = () => {

    const [selectedUserId, setSelectedUserId] = useState(null);
    const [deletingUserId, setDeletingUserId] = useState(null);

    const {data, isLoading, isError} = useQuery('users', api.getUsers);
    const {isLoading: isUpdating, mutate} = useMutation((userId) => api.deleteUser(userId))

    const list = data?.data?.data || [];

    const header = useMemo(() => {
        return COLUMNS.map(column => <TableCell key={column}>{column}</TableCell>);
    }, []);

    const body = useMemo(() => {
        return list?.map(row => <TableRow key={row.id}>
            <TableCell>{row.first_name}</TableCell>
            <TableCell>{row.last_name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>
                <EditIcon onClick={() => setSelectedUserId(row.id)} style={{cursor: 'pointer'}}/>
                <DeleteIcon onClick={() => setDeletingUserId(row.id)} style={{cursor: 'pointer'}}/>
            </TableCell>
        </TableRow>);

    }, [list, setSelectedUserId]);

    if (isError)
        return <div>Упс... Что-то пошло не так!</div>

    console.log(deletingUserId)

    return (
        <div style={{position: "relative"}}>
            {isLoading && <Backdrop open>
                <CircularProgress color="inherit"/>
            </Backdrop>}
            <Table sx={{minWidth: 650}}>
                <TableHead>
                    <TableRow>
                        {header}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {body}
                </TableBody>
            </Table>
            {!!selectedUserId &&
                <User key={selectedUserId} handleClose={() => setSelectedUserId(null)} userId={selectedUserId}/>}
            {!!deletingUserId && <ConfirmModal handleClose={() => setDeletingUserId(null)}
                                               handleSubmit={() => mutate(deletingUserId)}
                                               title={"Удаление пользователя"}
                                               message={"Пользователь будет удален без возможности восстановления. Продолжить?"}/>}
        </div>
    )
}

export default Users;