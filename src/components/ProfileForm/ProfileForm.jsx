import cn from "classnames";

import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from "../../services/actions/user";

import { UPDATE_USER_CLEAR } from "../../services/actions/user";

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ProfileForm.module.css';

const ProfileFormMessage = (props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => {
      setShow(false);
      dispatch({ type: UPDATE_USER_CLEAR });
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, []);

  return show ? (
    <div className={styles.text}>
      <span className="text text_type_main-default">{props.text}</span>
    </div>
  ) : ( null );
};

const ProfileForm = () => {

  const dispatch = useDispatch();

  const { updateUserRequest, updateUserFailed, updateUserSuccess } = useSelector(store => store.user);

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

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
    // eslint-disable-next-line
  }, []);

  const toggleDisableInput = () => {
    setIsInputDisabled(!isInputDisabled);
  }

  const toggleShowPassword = () => {
    inputRef.current.type = isPasswordShow ? "password" : "text";
    setIsPasswordShow(!isPasswordShow);
  }

  const handleCancel = (e) => {
    e.preventDefault();
    inputRef.current.type = "password";
    setIsPasswordShow(false);
    setIsInputDisabled(true);

    dispatch(getUser(formData, setFormData));
    setFormData({ ...formData, password: "" });
  }

  const handleSave = (e) => {
    e.preventDefault();
    inputRef.current.type = "password";
    setIsPasswordShow(false);
    setIsInputDisabled(true);

    dispatch(updateUser(formData));
    setFormData({ ...formData, password: "" });
  }

  return (
    <div className={styles.formBlock}>
      <form 
        className={cn(styles.form, 'mb-10')}
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
      { updateUserRequest && <ProfileFormMessage text={'Загрузка...'} />}
      { updateUserSuccess && <ProfileFormMessage text={'Информация сохранена успешно'} />}
      { updateUserFailed && <ProfileFormMessage text={'Произошла ошибка, попробуйте еще раз'} />}
    </div>  
  );
};

export default ProfileForm;