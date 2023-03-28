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
import { useDispatch } from 'react-redux';
import { fetchUserData } from '../../actions/userAuthAction';
import { updateUser } from '../../utils/AuthUtils';

export default function FormDialog(props) {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const fieldName = props.fieldName;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {};

        // Filter out form data entries with empty values
        for (const [key, value] of formData.entries()) {
            if (value.trim() !== "") {
                data[key] = value;
            }
        }
        try {
            const dataResult = await updateUser(data);
            console.log(dataResult);
            if (dataResult.message === "User updated") {
                setOpen(false);
                dispatch(fetchUserData(sessionStorage.getItem("user")));
            } else {
                setError(dataResult.message[0].message);
            }
        } catch (err) {
            console.log(err);
        }
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
                            error={Boolean(error)} // check for an error
                            helperText={error} // show error message
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