import cn from "classnames";

import { useHistory, useLocation, useRouteMatch, matchPath  } from 'react-router-dom'

import { Nav, NavItem } from "../ui/Nav/Nav";
import FancyLink from "../ui/Link/Link";

import styles from "./ProfileMenu.module.css";

const ProfileMenu = () => {
    const location = useLocation();

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
                    <FancyLink>
                        <div className={"text text_type_main-medium"}>Выход</div>
                    </FancyLink>
                </NavItem>
            </Nav>
            { location.pathname === '/profile' && (
                <p className={cn(styles.text, "text text_type_main-default text_color_inactive mt-20")}>В этом разделе вы можете изменить свои персональные данные</p>
            )}
        </div>
    )
}

export default ProfileMenu;