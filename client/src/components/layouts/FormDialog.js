import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { useState } from "react";

export default function FormDialog(props) {
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({});

    const fieldName = props.fieldName;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Change {fieldName}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogTitle>Add new {fieldName}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter a valid {fieldName}, then press change.<br />
                            Please note that this website is for testing purposes only.<br />
                            <b>It is essential not to share any personal information under any circumstances.</b>
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            required
                            fullWidth
                            id={fieldName}
                            label={fieldName}
                            name={fieldName}
                            autoComplete={fieldName}
                            type={fieldName}
                            error={Boolean(errors[fieldName])} // check for an error
                            helperText={errors[fieldName]} // show error message
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Change</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}