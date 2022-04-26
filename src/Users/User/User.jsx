import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useQuery} from "react-query";
import {useMutation} from "react-query";
import * as api from "../api/users.api";
import UserForm from "./UserForm";

const User = ({userId, handleClose}) => {

    const [localUser, setLocalUser] = useState({});

    const {data, isLoading, isError} = useQuery(['user', userId], () => api.getUser(userId));
    const user = data?.data?.data || {};

    const {isLoading: isUpdating, mutate} = useMutation(() => api.updateUser(userId, localUser));

    const handleChangeUser = useCallback((event) => {
        const {name, value} = event.target;
        setLocalUser({...localUser, [name]: value})
    }, [localUser]);

    const handleSubmit = useCallback(() => {
        mutate(localUser);
    }, [localUser]);

    const title = useMemo(() => {
        return `Информация о пользователе: ${user?.first_name || ""} ${user?.last_name || ""}`;
    }, [data]);

    const actions = useMemo(() => {
        return <div>
            <Button color={"success"} onClick={handleSubmit}>Сохранить</Button>
            <Button color={"error"} style={{marginLeft: 'auto'}} onClick={handleClose}>Отменить</Button>
        </div>;
    }, [handleClose]);

    useEffect(() => {
        setLocalUser(user);
    }, [data])

    if (isError)
        return <div>Упс... Что-то пошло не так!</div>;

    return (
        <Dialog fullWidth open onClose={handleClose}>
            {(isLoading || isUpdating) && <Backdrop open>
                <CircularProgress color="inherit"/>
            </Backdrop>}
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <UserForm isLoading={isLoading} isUpdating={isUpdating} handleChangeUser={handleChangeUser}
                          user={localUser}/>
            </DialogContent>
            <DialogActions>
                {actions}
            </DialogActions>
        </Dialog>
    )
}

export default User;