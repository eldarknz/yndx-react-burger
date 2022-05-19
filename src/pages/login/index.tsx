import cn from "classnames";

import { useState, useRef, useEffect, SyntheticEvent, ChangeEvent  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { login } from "../../services/actions/user";
import { ROUTES } from "../../utils/constants";
import { checkAccessToken } from "../../utils/utils";

import { loginSuccess } from "../../services/actions/user";

import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Container } from "../../components/ui/Grid/Grid";
import FancyLink from "../../components/ui/Link/Link";
import ActionMessage from "components/ActionMessage/ActionMessage";

import { IUserStore, ILocation } from "../../../declarations";

import styles from "./styles.module.css";

interface ILocationStateFrom {
  from?: ILocation;
}

interface IFormParams {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, loginFailed, loginRequest } = useSelector((store: IUserStore) => store.user);

  const location = useLocation<ILocationStateFrom>();

  const isAccessToken = checkAccessToken();

  const [formData, setFormData] = useState<IFormParams>({ email: "", password: "" });
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isLoggedIn && isAccessToken) {
      dispatch(loginSuccess());
    }
    // eslint-disable-next-line
  }, []);

  const onChangeFormData = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(login({ ...formData }));
    setFormData({ ...formData, password: "" });
  }

  const toggleShowPassword = () => {
    if (inputRef.current != null) {
      inputRef.current.type = isPasswordShow ? "password" : "text";
      setIsPasswordShow(!isPasswordShow);
    }
  }

  if (isLoggedIn && isAccessToken) {
    return (
      <Redirect to={location.state?.from || ROUTES.home.path}/>
      /**
       * location.state.from doesn't work when change url in browser's address bar.
       * It need fixing, but i don't know how yet.
       * 
       * location.state.from doesn't work when change url in browser's address bar.
       * <Redirect to={location.state?.from || ROUTES.home.path}/>
       */
    );
  }

  return (
    <Container>
      <div className={styles.formBlock}>
        <div className={cn(styles.title, "mb-6")}>
          <h3 className="text text_type_main-default">Вход</h3>
        </div>
        <form 
          className={cn(styles.form, "mb-10")}
          onSubmit={handleSubmit}
        >
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
              //onFocus={true}
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
          {loginRequest ? (
            <Button disabled={true} type="primary" size="medium">Загрузка...</Button>
            ) : (
            <Button type="primary" size="medium">Войти</Button>
          )}
        </form>
        { loginFailed && <ActionMessage text="Произошла ошибка, попробуйте еще раз." />}
        <div className={cn(styles.text, "mt-10 mb-4")}>
          <span className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</span>
          <FancyLink href="/register" className={cn(styles.link, "text_type_main-default ml-2")}>Зарегистироваться</FancyLink>
        </div>
        <div className={styles.text}>
          <span className="text text_type_main-default text_color_inactive">Забыли пароль?</span>
          <FancyLink href="/forgot-password" className={cn(styles.link, "text_type_main-default ml-2")}>Восстановить пароль</FancyLink>
        </div>
      </div>
    </Container>
  );
};