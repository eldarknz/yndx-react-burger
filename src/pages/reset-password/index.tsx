import cn from "classnames";

import { useState, useRef, ChangeEvent, SyntheticEvent } from "react";
import { useDispatch, useSelector } from "../../services/types/hooks";
import { Redirect, useLocation } from "react-router-dom";
import { resetPassword } from "../../services/actions/user";
import { ROUTES } from "../../utils/constants";

import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Container } from "../../components/ui/Grid/Grid";
import FancyLink from "../../components/ui/Link/Link";
import ActionMessage from "components/ActionMessage/ActionMessage";

import { ILocation } from "../../../declarations";

import styles from "./styles.module.css";

interface ILocationStateFrom {
  from?: ILocation;
}

interface IFormParams {
  password: string;
  token: string;
}

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();

  const {
    isLoggedIn,
    resetPasswordSuccess,
    resetPasswordRequest,
    resetPasswordFailed,
    forgotPasswordSuccess
  } = useSelector(store => store.user);

  const location = useLocation<ILocationStateFrom>();

  const [formData, setFormData] = useState<IFormParams>({ password: "", token: "" });
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null)

  const onChangeFormData = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetPassword({ ...formData }));
  }

  const toggleShowPassword = () => {
    if (inputRef.current != null) {
      inputRef.current.type = isPasswordShow ? "password" : "text";
      setIsPasswordShow(!isPasswordShow);
    }
  }

  if (isLoggedIn) {
    return (
      <Redirect to={location.state?.from || ROUTES.home.path}/>
    );
  }

  if (!forgotPasswordSuccess) {
    return (
      <Redirect to={{ pathname: ROUTES.forgot_password.path }} />
    );
  }

  if (resetPasswordSuccess) {
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
            <Button disabled={true} type="primary" size="medium">Загрузка...</Button>
            ) : (
            <Button disabled={!formData.password && !formData.token} type="primary" size="medium">Сохранить</Button>
          )}
        </form>
        { resetPasswordFailed && <ActionMessage text="Произошла ошибка, попробуйте еще раз." /> }
        <div className={cn(styles.text, "mt-10")}>
          <span className="text text_type_main-default text_color_inactive">Вспомнили пароль?</span>
          <FancyLink href="/login" className={cn(styles.link, "text_type_main-default ml-2")}>Войти</FancyLink>
        </div>
      </div>
    </Container>
  );
};