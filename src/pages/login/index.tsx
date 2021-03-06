import cn from "classnames";

import { useState, useRef, useEffect, SyntheticEvent, ChangeEvent  } from "react";
import { useDispatch, useSelector } from "../../services/types/hooks";
import { Redirect, useLocation } from "react-router-dom";
import { login } from "../../services/actions/user";
import { ROUTES } from "../../utils/constants";
import { checkAccessToken } from "../../utils/utils";

import { loginSuccess } from "../../services/actions/user";

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
  password: string;
}

export const LoginPage = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, loginFailed, loginRequest } = useSelector(store => store.user);

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
          <h3 className="text text_type_main-default">????????</h3>
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
              errorText={"????????????"}
              size={"default"}
              onChange={onChangeFormData}
              //onFocus={true}
            />
          </div>
          <div className={cn(styles.inputField)}>
            <Input
              type={"password"}
              placeholder={"????????????"}
              value={formData.password}
              name={"password"}
              error={false}
              errorText={"????????????"}
              size={"default"}
              onChange={onChangeFormData}
              icon={isPasswordShow ? "HideIcon" : "ShowIcon"}
              onIconClick={toggleShowPassword}
              ref={inputRef}
            />
          </div>
          {loginRequest ? (
            <Button disabled={true} type="primary" size="medium">????????????????...</Button>
            ) : (
            <Button type="primary" size="medium">??????????</Button>
          )}
        </form>
        { loginFailed && <ActionMessage text="?????????????????? ????????????, ???????????????????? ?????? ??????." />}
        <div className={cn(styles.text, "mt-10 mb-4")}>
          <span className="text text_type_main-default text_color_inactive">???? ??? ?????????? ?????????????????????????</span>
          <FancyLink href={ROUTES.register.path} className={cn(styles.link, "text_type_main-default ml-2")}>??????????????????????????????????</FancyLink>
        </div>
        <div className={styles.text}>
          <span className="text text_type_main-default text_color_inactive">???????????? ?????????????</span>
          <FancyLink href={ROUTES.forgot_password.path} className={cn(styles.link, "text_type_main-default ml-2")}>???????????????????????? ????????????</FancyLink>
        </div>
      </div>
    </Container>
  );
};