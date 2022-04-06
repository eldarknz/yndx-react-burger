import cn from "classnames";

import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { resetPassword } from "../../services/actions/user";
import { ROUTES } from "../../utils/constants";

import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Container } from "../../components/ui/Grid/Grid";
import FancyLink from "../../components/ui/Link/Link";

import styles from "./styles.module.css";

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();

  const { user, resetPasswordSuccess, resetPasswordRequest, resetPasswordFailed } = useSelector(store => store.user);

  const location = useLocation();
  //console.log(location);

  const [formData, setFormData] = useState({ password: "", token: "" });
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const inputRef = useRef(null)

  const onChangeFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ ...formData }));
  }

  const toggleShowPassword = () => {
    inputRef.current.type = isPasswordShow ? "password" : "text";
    setIsPasswordShow(!isPasswordShow);
  }

  if (user) {
    const locationFrom = (location.state)?.from;
    const redirectPath = locationFrom ? locationFrom.pathname : ROUTES.home.path;
    return (
      <Redirect to={{ pathname: redirectPath }} />
    );
  }

  if (resetPasswordSuccess){
    return (
      <Redirect to={{ pathname: ROUTES.login.path }} />
    );
  }

  return (
    <Container>
      <div className={styles.formBlock}>
        <div className={cn(styles.title, "mb-6")}>
          <h3 className="text text_type_main-default">Восстановление пароля</h3>
        </div>
        <form 
          className={cn(styles.form, "mb-20")}
          onSubmit={handleSubmit}
        >
          <div className={styles.inputField}>
            <Input
              type={"password"}
              placeholder={"Введите новый пароль"}
              value={formData.password}
              name={"password"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              onChange={onChangeFormData}
              icon={isPasswordShow ? "HideIcon" : "ShowIcon"}
              onIconClick={toggleShowPassword}
              ref={inputRef}
            />
          </div>
          <div className={styles.inputField}>
            <Input
              type={"text"}
              placeholder={"Введите код из письма"}
              value={formData.token}
              name={"token"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              onChange={onChangeFormData}
            />
          </div>
          {resetPasswordRequest ? (
            <Button disabled={true} type="primary" size="medium" className="mb-20">Загрузка...</Button>
            ) : (
            <Button disabled={!formData.password && !formData.token} type="primary" size="medium" className="mb-20">Сохранить</Button>
          )}
        </form>
        { resetPasswordFailed && (
          <div className={styles.text}>
            <span className="text text_type_main-default">Произошла ошибка, попробуйте еще раз.</span>
          </div>
        )}
        <div className={cn(styles.text, "mt-10")}>
          <span className="text text_type_main-default text_color_inactive">Вспомнили пароль?</span>
          <FancyLink href="/login" className={cn(styles.link, "text_type_main-default ml-2")}>Войти</FancyLink>
        </div>
      </div>
    </Container>
  );
};