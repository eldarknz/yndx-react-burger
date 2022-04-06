import cn from "classnames";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { forgotPassword } from "../../services/actions/user";
import { ROUTES } from "../../utils/constants";

import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Container } from "../../components/ui/Grid/Grid";
import FancyLink from "../../components/ui/Link/Link";

import styles from "./styles.module.css";

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();

  const { user, forgotPasswordSuccess, forgotPasswordRequest, forgotPasswordFailed } = useSelector(store => store.user);

  const location = useLocation();
  //console.log(location);

  const [formData, setFormData] = useState({ email: "" });

  const onChangeFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ ...formData }));
  }

  if (user) {
    const locationFrom = (location.state)?.from;
    const redirectPath = locationFrom ? locationFrom.pathname : ROUTES.home.path;
    return (
      <Redirect to={{ pathname: redirectPath }} />
    );
  }

  if (forgotPasswordSuccess){
    return (
      <Redirect to={{ pathname: ROUTES.reset_password.path }} />
    );
  }

  return (
    <Container>
      <div className={styles.formBlock}>
        <div className={cn(styles.title, "mb-6")}>
          <h3 className="text text_type_main-default">Восстановление пароля</h3>
        </div>
        <form 
          className={cn(styles.form, "mb-10")}
          onSubmit={handleSubmit}
        >
          <div className={cn(styles.inputField)}>
            <Input
              type={"email"}
              placeholder={"Укажите e-mail"}
              value={formData.email}
              name={"email"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              onChange={onChangeFormData}
            />
          </div>
          {forgotPasswordRequest ? (
            <Button disabled={true} type="primary" size="medium" className="mb-20">Загрузка...</Button>
            ) : (
            <Button disabled={!formData.email} type="primary" size="medium" className="mb-20">Восстановить</Button>
          )}
        </form>
        { forgotPasswordFailed && (
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