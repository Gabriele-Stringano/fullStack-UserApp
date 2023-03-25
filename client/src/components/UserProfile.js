import React from 'react'
import UserProfileCSS from './modules/UserProfile.module.css';
import Button from '@mui/material/Button';


export function UserProfile() {
    return (
        <div className={UserProfileCSS.container}>
            <div className={UserProfileCSS.infoBlock}>
                <div className={UserProfileCSS.field}>
                    <p> My nickname: {} </p>
                    <Button variant="contained">Change nickname</Button>
                </div>
                <div className={UserProfileCSS.field}>
                    <p>My email: {} </p>
                    <Button variant="contained">Change email</Button>
                </div>
                <div className={UserProfileCSS.field}>
                    <p>Other:</p>
                    <Button variant="contained">Change password</Button>
                </div>
            </div>
        </div>
    )
}
