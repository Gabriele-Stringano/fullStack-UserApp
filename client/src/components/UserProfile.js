import React, { useEffect } from 'react'
import {useDispatch, useSelector } from 'react-redux';
import UserProfileCSS from './modules/UserProfile.module.css';
import FormDialog from './layouts/FormDialog';
import { fetchUserData } from '../actions/userAuthAction';

export function UserProfile() {
    const userData = useSelector((state) => state.userAuth.userData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserData(sessionStorage.getItem('user')))
    }, [dispatch]);

    return (
        <>
            {userData.email
                ?
                <div className={UserProfileCSS.container}>
                    <div className={UserProfileCSS.infoBlock}>
                        <div className={UserProfileCSS.field}>
                            <p className={UserProfileCSS.text}>My nickname: {userData.username } </p>
                            <FormDialog fieldName={'username'} />
                        </div>
                        <div className={UserProfileCSS.field}>
                            <p className={UserProfileCSS.text}>My email: {userData.email } </p>
                            <FormDialog fieldName={'email'} />
                        </div>
                        <div className={UserProfileCSS.field}>
                            <p className={UserProfileCSS.text}>Other:</p>
                            <FormDialog fieldName={'password'} />
                        </div>
                    </div>
                </div>
                : null
            }
        </>
    )
}
