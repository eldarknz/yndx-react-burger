import cn from "classnames";

import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ProfileForm.module.css';

const ProfileForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: 'Марк',
    email: 'mail@stellar.burgers',
    password: '123456'
  });

  const [isInputDisabled, setIsInputDisabled] = useState(true);

  const inputRef = useRef(null)

  const onChangeFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const toggleDisableInput = () => {
    setIsInputDisabled(!isInputDisabled);
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
            icon={'EditIcon'}
            onIconClick={toggleDisableInput}
            ref={inputRef}
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
            icon={'EditIcon'}
            onIconClick={toggleDisableInput}
            ref={inputRef}
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
            icon={'EditIcon'}
            onIconClick={toggleDisableInput}
            ref={inputRef}
          />
        </div>
      </form>
    </div>  
  );
};

export default ProfileForm;