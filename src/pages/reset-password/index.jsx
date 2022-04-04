import cn from "classnames";

import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { resetPassword } from "../../services/actions/user";

import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Container } from "../../components/ui/Grid/Grid";
import FancyLink from "../../components/ui/Link/Link";

import styles from "./styles.module.css";

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();

  //const { isAuth } = useSelector(store => store.user);
  const history = useHistory();
  console.log(history);

  const [formData, setFormData] = useState({ password: "", token: "" });
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const inputRef = useRef(null)

  const onChangeFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ ...formData }, history));
  }

  const toggleShowPassword = () => {
    inputRef.current.type = isPasswordShow ? "password" : "text";
    setIsPasswordShow(!isPasswordShow);
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
          <Button type="primary" size="medium" className="mb-20">Войти</Button>
        </form>
        <div className={styles.text}>
          <span className="text text_type_main-default text_color_inactive">Вспомнили пароль?</span>
          <FancyLink href="/login" className={cn(styles.link, "text_type_main-default ml-2")}>Войти</FancyLink>
        </div>
      </div>
    </Container>
  );
};