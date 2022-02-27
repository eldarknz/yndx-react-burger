import React from "react";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { LockIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { EditIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ShowIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { HideIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { LogoutIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { DeleteIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ArrowUpIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ArrowDownIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { MenuIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const iconsLibrary = {
    currency: (props) => <CurrencyIcon {...props} />,
    burger: (props) => <BurgerIcon {...props} />,
    lock: (props) => <LockIcon {...props} />,
    drag: (props) => <DragIcon {...props} />,
    close: (props) => <CloseIcon {...props} />,
    check: (props) => <CheckMarkIcon {...props} />,
    list: (props) => <ListIcon {...props} />,
    profile: (props) => <ProfileIcon {...props} />,
    edit: (props) => <EditIcon {...props} />,
    info: (props) => <InfoIcon {...props} />,
    show: (props) => <ShowIcon {...props} />,
    hide: (props) => <HideIcon {...props} />,
    logout: (props) => <LogoutIcon {...props} />,
    delete: (props) => <DeleteIcon {...props} />,
    arrowUp: (props) => <ArrowUpIcon {...props} />,
    arrowDown: (props) => <ArrowDownIcon {...props} />,
    menu: (props) => <MenuIcon {...props} />,
}