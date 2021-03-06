import cn from "classnames";

import { useState, useRef, SyntheticEvent, ChangeEvent } from "react";
import { useDispatch, useSelector } from "../../services/types/hooks";
import { Redirect, useLocation } from "react-router-dom";
import { register } from "../../services/actions/user";
import { ROUTES } from "../../utils/constants";

import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Container } from "../../components/ui/Grid/Grid";
import FancyLink from "../../components/ui/Link/Link";
import ActionMessage from "../../components/ActionMessage/ActionMessage";

import { ILocation } from "../../../declarations";

import styles from "./styles.module.css";

interface ILocationStateFrom {
  from?: ILocation;
}

interface IFormParams {
  name: string;
  email: string;
  password: string;
}

export const RegistrationPage = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, registerSuccess, registerRequest, registerFailed } = useSelector(store => store.user);

  const location = useLocation<ILocationStateFrom>();

  const [formData, setFormData] = useState<IFormParams>({ name: "", email: "", password: "" });
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null)

  const onChangeFormData = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(register({ ...formData }));
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

  if (registerSuccess) {
    return (
      <Redirect to={{ pathname: ROUTES.login.path }} />
    );
  }

  return (
    <Container>
      <div className={styles.formBlock}>
        <div className={cn(styles.title, "mb-6")}>
          <h3 className="text text_type_main-default">??????????????????????</h3>
        </div>
        <form 
          className={cn(styles.form, "mb-10")}
          onSubmit={handleSubmit}
        >
          <div className={cn(styles.inputField)}>
            <Input
              type={"text"}
              placeholder={"??????"}
              value={formData.name}
              name={"name"}
              error={false}
              errorText={"????????????"}
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
              errorText={"????????????"}
              size={"default"}
              onChange={onChangeFormData}
            />
          </div>
          <div className={cn(styles.inputField)}>
            <Input
              type={"password"}
              placeholder={"????????????"}
              value={formData.password || ""}
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
          { registerRequest ? (
            <Button disabled={true} type="primary" size="medium">????????????????...</Button>
            ) : (
            <Button disabled={!formData.name && !formData.email && !formData.password} type="primary" size="medium">????????????????????????????????????</Button>
          )}
        </form>
        { registerFailed && <ActionMessage text="?????????????????? ????????????, ???????????????????? ?????? ??????." />}
        <div className={cn(styles.text, "mt-10")}>
          <span className="text text_type_main-default text_color_inactive">?????? ???????????????????????????????</span>
          <FancyLink href={ROUTES.login.path} className={cn(styles.link, "text_type_main-default ml-2")}>??????????</FancyLink>
        </div>
      </div>
    </Container>
  );
};