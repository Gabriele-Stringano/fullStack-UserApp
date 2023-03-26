import React from 'react'
import UserProfileCSS from './modules/UserProfile.module.css';
import FormDialog from './layouts/FormDialog';


export function UserProfile() {
    return (
        <div className={UserProfileCSS.container}>
            <div className={UserProfileCSS.infoBlock}>
                <div className={UserProfileCSS.field}>
                    <p className={UserProfileCSS.text}>My nickname: { } </p>
                    <FormDialog fieldName={'nickname'} />
                </div>
                <div className={UserProfileCSS.field}>
                    <p className={UserProfileCSS.text}>My email: { } </p>
                    <FormDialog fieldName={'email'} />
                </div>
                <div className={UserProfileCSS.field}>
                    <p className={UserProfileCSS.text}>Other:</p>
                    <FormDialog fieldName={'password'} />
                </div>
            </div>
        </div>
    )
}
