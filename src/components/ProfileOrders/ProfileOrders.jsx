import styles from "./ProfileOrders.module.css";

const ProfileOrders = () => {
    return (
        <div className={styles.block}>
            <p className="text text_type_main-default">Вы пока не можете посмотреть историю заказов.</p>
            <p className="text text_type_main-default">Мы работаем над этим.</p>
        </div>
    );
};

export default ProfileOrders