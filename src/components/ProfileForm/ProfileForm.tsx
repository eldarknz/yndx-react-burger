import cn from "classnames";

import { FC, useState, useRef, useEffect, ChangeEvent, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from '../../services/types/hooks';

import { getUser, updateUser } from "../../services/actions/user";
import { updateUserClear } from "../../services/actions/user";

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { TUser } from "../../../declarations";

import styles from './ProfileForm.module.css';

interface IProfileFormMessageProps {
  text: string;
};

const ProfileFormMessage = ({ text }: IProfileFormMessageProps) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      dispatch(updateUserClear());
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, []);

  return show ? (
    <div className={styles.text}>
      <span className="text text_type_main-default">{text}</span>
    </div>
  ) : ( null );
};

const ProfileForm: FC = () => {

  const dispatch = useDispatch();

  const { updateUserRequest, updateUserFailed, updateUserSuccess } = useSelector(store => store.user);

  const [formData, setFormData] = useState<TUser>({ name: "", email: "", password: "" });

  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null)

  const onChangeFormData = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      dispatch(getUser(formData, setFormData));
    }
    return () => {
      mounted = false;
    }
    // eslint-disable-next-line
  }, []);

  const toggleDisableInput = () => {
    setIsInputDisabled(!isInputDisabled);
  }

  const toggleShowPassword = () => {
    if (inputRef.current != null) {
      inputRef.current.type = isPasswordShow ? "password" : "text";
      setIsPasswordShow(!isPasswordShow);
    }
  }

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (inputRef.current != null) {
      inputRef.current.type = "password";
    }
    setIsPasswordShow(false);
    setIsInputDisabled(true);

    dispatch(getUser(formData, setFormData));
    setFormData({ ...formData, password: "" });
  }

  const handleSave = (e: SyntheticEvent) => {
    e.preventDefault();
    if (inputRef.current != null) {
      inputRef.current.type = "password";
    }
    setIsPasswordShow(false);
    setIsInputDisabled(true);

    dispatch(updateUser(formData));
    setFormData({ ...formData, password: "" });
  }

  return (
    <div className={styles.formBlock}>
      <form 
        className={cn(styles.form, 'mb-10')}
      >
        <div className={cn(styles.inputField)}>
          <Input
            type={'text'}
            placeholder={'??????'}
            value={formData.name}
            name={'name'}
            error={false}
            errorText={'????????????'}
            disabled={isInputDisabled}
            size={'default'}
            onChange={onChangeFormData}
            icon={isInputDisabled ? 'EditIcon' : undefined}
            onIconClick={toggleDisableInput}
          />
        </div>
        <div className={cn(styles.inputField)}>
          <Input
            type={'email'}
            placeholder={'??????????'}
            value={formData.email}
            name={'email'}
            error={false}
            errorText={'????????????'}
            disabled={isInputDisabled}
            size={'default'}
            onChange={onChangeFormData}
            icon={isInputDisabled ? 'EditIcon' : undefined}
            onIconClick={toggleDisableInput}
          />
        </div>
        <div className={cn(styles.inputField)}>
          <Input
            type={'password'}
            placeholder={'????????????'}
            value={formData.password || ""}
            name={'password'}
            error={false}
            errorText={'????????????'}
            disabled={isInputDisabled}
            size={'default'}
            onChange={onChangeFormData}
            icon={isInputDisabled ? 'EditIcon' : isPasswordShow ? "HideIcon" : "ShowIcon"}
            onIconClick={isInputDisabled ? toggleDisableInput : toggleShowPassword}
            ref={inputRef}
          />
        </div>
        {!isInputDisabled && <div className={styles.buttonGroup}>
            <div className='mr-10'><Button type="primary" size="medium" onClick={handleSave}>??????????????????</Button></div>
            <div><Button type="secondary" size="medium" onClick={handleCancel}>????????????</Button></div>
        </div>}
      </form>
      { updateUserRequest && <ProfileFormMessage text={'????????????????...'} />}
      { updateUserSuccess && <ProfileFormMessage text={'???????????????????? ?????????????????? ??????????????'} />}
      { updateUserFailed && <ProfileFormMessage text={'?????????????????? ????????????, ???????????????????? ?????? ??????'} />}
    </div>  
  );
};

export default ProfileForm;