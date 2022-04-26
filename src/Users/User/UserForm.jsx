import React, {useCallback, useEffect, useState} from "react";
import {TextField} from "@mui/material";

const UserForm = ({user={}, handleChangeUser}) => {

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '.5em'}}>
            <TextField onChange={handleChangeUser}
                       value={user.first_name || ""}
                       id="first_name"
                       name="first_name"
                       label="Имя"
                       variant="standard"/>

            <TextField onChange={handleChangeUser}
                       value={user.last_name || ""}
                       id="last_name"
                       name="last_name"
                       label="Фамилия"
                       variant="standard"/>

            <TextField onChange={handleChangeUser}
                       value={user.email || ""}
                       id="email"
                       name="email"
                       label="Почта"
                       variant="standard"/>
        </div>
    )
}

export default UserForm;