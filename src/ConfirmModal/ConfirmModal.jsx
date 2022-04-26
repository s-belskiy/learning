import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const ConfirmModal = ({handleClose, title, message, handleSubmit}) => {
    return <Dialog
        open
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            {title}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {message}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button color={"success"} onClick={handleSubmit}>Продолжить</Button>
            <Button color={"error"} onClick={handleClose}>Отменить</Button>
        </DialogActions>
    </Dialog>
}

export default ConfirmModal;