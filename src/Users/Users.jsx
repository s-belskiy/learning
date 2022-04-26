import React, {useCallback, useMemo, useState} from "react";
import {useMutation, useQuery} from "react-query";
import * as api from "./api/users.api";
import {Backdrop, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import User from "./User/User";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

const COLUMNS = ['Имя', 'Фамилия', 'Почта', 'Действие'];

const Users = () => {

    const [selectedUserId, setSelectedUserId] = useState(null);
    const [deletingUserId, setDeletingUserId] = useState(null);
    const [search, setSearch] = useState('');

    const {data, isLoading, isError} = useQuery('users', () => api.getUsers('per_page=100'));
    const {mutate} = useMutation((userId) => api.deleteUser(userId))
    const list = data?.data?.data || [];

    const handleDelete = useCallback(async () => {
        await mutate(deletingUserId);
        setDeletingUserId(null);
    }, [deletingUserId])

    const header = useMemo(() => {
        return COLUMNS.map(column => <TableCell key={column}>{column}</TableCell>);
    }, []);

    const filteredList = useMemo(() => {
        if (search)
            return list?.filter(listItem => listItem.first_name.toUpperCase().includes(search.toUpperCase())
                || listItem.last_name.toUpperCase().includes(search.toUpperCase())
                || listItem.email.toUpperCase().includes(search.toUpperCase())
            );
        else return list;
    }, [list, search]);

    const searchInput = useMemo(() => {
        return <TableCell colSpan={list.length}>
            <div style={{width: '100%', display: 'flex'}}>
                <TextField style={{marginLeft: 'auto'}} name="search" placeholder="search..."
                           type="search" value={search}
                           onChange={(event) => setSearch(event.target.value)} variant="standard"/>
            </div>
        </TableCell>
    }, [search, list]);

    const body = useMemo(() => {
        return filteredList?.map(row => <TableRow key={row.id}>
            <TableCell>{row.first_name}</TableCell>
            <TableCell>{row.last_name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>
                <EditIcon onClick={() => setSelectedUserId(row.id)} style={{cursor: 'pointer'}}/>
                <DeleteIcon onClick={() => setDeletingUserId(row.id)} style={{cursor: 'pointer'}}/>
            </TableCell>
        </TableRow>);

    }, [filteredList, setSelectedUserId, setDeletingUserId]);

    if (isError)
        return <div>Упс... Что-то пошло не так!</div>

    return (
        <div style={{position: "relative", padding: '1em'}}>
            {isLoading && <Backdrop open>
                <CircularProgress color="inherit"/>
            </Backdrop>}
            <Table>
                <TableHead>
                    <TableRow>
                        {searchInput}
                    </TableRow>
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
                                               handleSubmit={handleDelete}
                                               title={"Удаление пользователя"}
                                               message={"Пользователь будет удален без возможности восстановления. Продолжить?"}/>}
        </div>
    )
}

export default Users;