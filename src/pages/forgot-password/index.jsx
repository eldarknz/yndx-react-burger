import cn from "classnames";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import { forgotPassword } from "../../services/actions/user";

import { Container } from "../../components/ui/Grid/Grid";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import FancyLink from "../../components/ui/Link/Link";

import styles from "./styles.module.css";

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();

  //const { isAuth } = useSelector(store => store.user);
  const history = useHistory();
  const location = useLocation();
  //console.log(history, location);

  const [formData, setFormData] = useState({ email: "" });

  const onChangeFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ ...formData }, history, location));
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
          <Button type="primary" size="medium" className="mb-20">Восстановить</Button>
        </form>
        <div className={styles.text}>
          <span className="text text_type_main-default text_color_inactive">Вспомнили пароль?</span>
          <FancyLink href="/login" className={cn(styles.link, "text_type_main-default ml-2")}>Войти</FancyLink>
        </div>
      </div>
    </Container>
  );
};