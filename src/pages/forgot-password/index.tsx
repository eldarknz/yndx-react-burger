import cn from "classnames";

import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "../../services/types/hooks";
import { Redirect, useLocation } from "react-router-dom";
import { forgotPassword } from "../../services/actions/user";
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
  email: string;
}

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();

  const {
    isLoggedIn,
    forgotPasswordSuccess,
    forgotPasswordRequest,
    forgotPasswordFailed
  } = useSelector(store => store.user);

  const location = useLocation<ILocationStateFrom>();

  const [formData, setFormData] = useState<IFormParams>({ email: "" });

  const onChangeFormData = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(forgotPassword({ ...formData }));
  }

  if (isLoggedIn) {
    return (
      <Redirect to={location.state?.from || ROUTES.home.path}/>
    );
  }

  if (forgotPasswordSuccess) {
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
            <Button disabled={true} type="primary" size="medium">Загрузка...</Button>
            ) : (
            <Button disabled={!formData.email} type="primary" size="medium">Восстановить</Button>
          )}
        </form>
        { forgotPasswordFailed && <ActionMessage text="Произошла ошибка, попробуйте еще раз." /> }
        <div className={cn(styles.text, "mt-10")}>
          <span className="text text_type_main-default text_color_inactive">Вспомнили пароль?</span>
          <FancyLink href={ROUTES.login.path} className={cn(styles.link, "text_type_main-default ml-2")}>Войти</FancyLink>
        </div>
      </div>
    </Container>
  );
};