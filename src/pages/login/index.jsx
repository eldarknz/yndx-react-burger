import cn from "classnames";

import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { Link  } from 'react-router-dom';
import { Container } from 'components/ui/Grid/Grid';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './styles.module.css';

export function LoginPage() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const inputRef = useRef(null)

  const onChangeFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const toggleShowPassword = () => {
    inputRef.current.type = isPasswordShow ? 'password' : 'text';
    setIsPasswordShow(!isPasswordShow);
  }

  return (
    <Container>
      <div className={styles.formBlock}>
        <div className={cn(styles.title, 'mb-6')}>
          <h3 className="text text_type_main-default">Вход</h3>
        </div>
        <form 
          className={cn(styles.form, 'mb-20')}
        >
          <div className={cn(styles.inputField)}>
            <Input
              type={'email'}
              placeholder={'E-mail'}
              value={formData.email}
              name={'email'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
              onChange={onChangeFormData}
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
              size={'default'}
              onChange={onChangeFormData}
              icon={isPasswordShow ? 'HideIcon' : 'ShowIcon'}
              onIconClick={toggleShowPassword}
              ref={inputRef}
            />
          </div>
          <Button type="primary" size="medium" className='mb-20'>Войти</Button>
        </form>
        <div className={cn(styles.text, 'mb-4')}>
          <span className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</span>
          <Link to="/register" className={cn(styles.link, 'text_type_main-default ml-2')}>Зарегистироваться</Link>
        </div>
        <div className={styles.text}>
          <span className="text text_type_main-default text_color_inactive">Забыли пароль?</span>
          <Link to="/forgot-password" className={cn(styles.link, 'text_type_main-default ml-2')}>Восстановить пароль</Link>
        </div>
      </div>
    </Container>
  );
};