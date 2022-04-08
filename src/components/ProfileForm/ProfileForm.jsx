import cn from "classnames";

import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from "../../services/actions/user";

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ProfileForm.module.css';

const ProfileForm = () => {

  const dispatch = useDispatch();

  const { isAuth } = useSelector(store => store.user);

  const [formData, setFormData] = useState({
    name: "",//user.name,
    email: "",//user.email,
    password: ""
  });

  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const inputRef = useRef(null)

  const onChangeFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      dispatch(getUser(formData, setFormData));
    }
    return () => mounted = false;
  }, []);

  const toggleDisableInput = () => {
    setIsInputDisabled(!isInputDisabled);
  }

  const toggleShowPassword = () => {
    inputRef.current.type = isPasswordShow ? "password" : "text";
    setIsPasswordShow(!isPasswordShow);
  }

  const handleCancel = (e) => {
    inputRef.current.type = "password";
    setIsPasswordShow(false);
    setIsInputDisabled(true);

    setFormData({ ...formData, password: "" });

    e.preventDefault();
    //setUserForm(initialState);
  }

  const handleSave = (e) => {
    inputRef.current.type = "password";
    setIsPasswordShow(false);
    setIsInputDisabled(true);

    setFormData({ ...formData, password: "" });

    e.preventDefault();
    //dispatch(setUser(userForm));
  }

  return (
    <div className={styles.formBlock}>
      <form 
        className={cn(styles.form, 'mb-20')}
      >
        <div className={cn(styles.inputField)}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            value={formData.name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            disabled={isInputDisabled}
            size={'default'}
            onChange={onChangeFormData}
            icon={isInputDisabled ? 'EditIcon' : undefined}
            onIconClick={toggleDisableInput}
          />
        </div>
        <div className={cn(styles.inputField)}>
          <Input
            type={'email'}
            placeholder={'Логин'}
            value={formData.email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            disabled={isInputDisabled}
            size={'default'}
            onChange={onChangeFormData}
            icon={isInputDisabled ? 'EditIcon' : undefined}
            onIconClick={toggleDisableInput}
          />
        </div>
        <div className={cn(styles.inputField)}>
          <Input
            type={'password'}
            placeholder={'Пароль'}
            value={formData.password}
            name={'password'}
            error={false}
            errorText={'Ошибка'}
            disabled={isInputDisabled}
            size={'default'}
            onChange={onChangeFormData}
            icon={isInputDisabled ? 'EditIcon' : isPasswordShow ? "HideIcon" : "ShowIcon"}
            onIconClick={isInputDisabled ? toggleDisableInput : toggleShowPassword}
            ref={inputRef}
          />
        </div>
        {!isInputDisabled && <div className={styles.buttonGroup}>
            <div className='mr-10'><Button type="primary" size="medium" onClick={handleSave}>Сохранить</Button></div>
            <div><Button type="secondary" size="medium" onClick={handleCancel}>Отмена</Button></div>
        </div>}
      </form>
    </div>  
  );
};

export default ProfileForm;