import cn from "classnames";

import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { register } from "../../services/actions/user";
import { ROUTES } from "../../utils/constants";

import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Container } from "components/ui/Grid/Grid";
import FancyLink from "components/ui/Link/Link";

import styles from "./styles.module.css";

export const RegistrationPage = () => {
  const dispatch = useDispatch();

  const { user, registerSuccess, registerRequest, registerFailed } = useSelector(store => store.user);

  const location = useLocation();
  //console.log(location);

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const inputRef = useRef(null)

  const onChangeFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ ...formData }));
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

  if (registerSuccess){
    return (
      <Redirect to={{ pathname: ROUTES.login.path }} />
    );
  }

  return (
    <Container>
      <div className={styles.formBlock}>
        <div className={cn(styles.title, "mb-6")}>
          <h3 className="text text_type_main-default">Регистрация</h3>
        </div>
        <form 
          className={cn(styles.form, "mb-10")}
          onSubmit={handleSubmit}
        >
          <div className={cn(styles.inputField)}>
            <Input
              type={"text"}
              placeholder={"Имя"}
              value={formData.name}
              name={"name"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              onChange={onChangeFormData}
            />
          </div>
          <div className={cn(styles.inputField)}>
            <Input
              type={"email"}
              placeholder={"E-mail"}
              value={formData.email}
              name={"email"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              onChange={onChangeFormData}
            />
          </div>
          <div className={cn(styles.inputField)}>
            <Input
              type={"password"}
              placeholder={"Пароль"}
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
          {registerRequest ? (
            <Button disabled={true} type="primary" size="medium" className="mb-20">Загрузка...</Button>
            ) : (
            <Button disabled={!formData.name && !formData.email && !formData.password} type="primary" size="medium" className="mb-20">Зарегистрироваться</Button>
          )}
        </form>
        { registerFailed && (
          <div className={styles.text}>
            <span className="text text_type_main-default">Произошла ошибка, попробуйте еще раз.</span>
          </div>
        )}
        <div className={cn(styles.text, "mt-10")}>
          <span className="text text_type_main-default text_color_inactive">Уже зарегистированы?</span>
          <FancyLink href="/login" className={cn(styles.link, "text_type_main-default ml-2")}>Войти</FancyLink>
        </div>
      </div>
    </Container>
  );
};