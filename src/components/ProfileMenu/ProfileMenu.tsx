import cn from "classnames";

import { useDispatch } from "react-redux";
import { useLocation, useHistory } from 'react-router-dom'
import { logout } from "../../services/actions/user";
import { ROUTES } from "../../utils/constants";

import { Nav, NavItem } from "../ui/Nav/Nav";
import FancyLink from "../ui/Link/Link";

import styles from "./ProfileMenu.module.css";

const ProfileMenu = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const handleLogout = () => {
        dispatch(logout());
        history.replace({ pathname: ROUTES.home.path });
    } 

    return (
        <div className={styles.container}>
            <Nav direction='vertical'>
                <NavItem>
                    <FancyLink href={'/profile'} isExact={true}>
                        <div className={"text text_type_main-medium"}>Профиль</div>
                    </FancyLink>
                </NavItem>
                <NavItem>
                    <FancyLink href={'/profile/orders'}>
                        <div className={"text text_type_main-medium"}>История заказов</div>
                    </FancyLink>
                </NavItem>
                <NavItem>
                    <FancyLink className={styles.logout} onClick={handleLogout}>
                        <div className={"text text_type_main-medium"}>Выход</div>
                    </FancyLink>
                </NavItem>
            </Nav>
            {
                location.pathname === '/profile' && (
                    <p className={cn(styles.text, "text text_type_main-default text_color_inactive mt-20")}>В этом разделе вы можете изменить свои персональные данные</p>
                )
            }
            {
                location.pathname === '/profile/orders' && (
                    <p className={cn(styles.text, "text text_type_main-default text_color_inactive mt-20")}>В этом разделе вы можете просмотреть свою историю заказов</p>
                )
            }
        </div>
    )
}

export default ProfileMenu;