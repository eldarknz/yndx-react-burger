import { OrderItems } from "./OrderItem";

import styles from "./ProfileOrders.module.css";

const ProfileOrders = () => {

    const data: any = {
        "success": true,
        "orders": [
            {
                _id: "0",
                createdAt: "2021-06-23T20:13:23.654Z",
                updatedAt: "2021-06-23T20:13:23.657Z",
                number: "034535",
                name: "Death Star Starship Main бургер",
                status: "created",
                ingredients: [
                    "60d3b41abdacab0026a733c6"
                ]
            },
            {
                _id: "1",
                createdAt: "2021-06-23T20:11:01.403Z",
                updatedAt: "2021-06-23T20:11:01.406Z",
                number: "034534",
                name: "Interstellar бургер",
                status: "pending",
                ingredients: [
                    "60d3b41abdacab0026a733c7",
                    "60d3b41abdacab0026a733c9",
                    "60d3b41abdacab0026a733cd"
                ]
            },
            {
                _id: "2",
                createdAt: "2021-06-23T14:43:22.587Z",
                updatedAt: "2021-06-23T14:43:22.603Z",
                number: "034533",
                name: "Black Hole Singularity острый бургер",
                status: "done",
                ingredients: [
                    "60d3b41abdacab0026a733c6",
                    "60d3b41abdacab0026a733ca",
                    "60d3b41abdacab0026a733cb",
                    "60d3b41abdacab0026a733cf",
                    "60d3b41abdacab0026a733d0",
                    "60d3b41abdacab0026a733d1",
                    "60d3b41abdacab0026a733d2"
                ]
            },
        ]
    }
    const ordersRequest: boolean = false;
    const ordersFailed: boolean = false;

    return (
        <div className={styles.section}>
            <div
                className={styles.blockList}
            >
                { ordersFailed && <p className="text text_type_main-default pb-3">Произошла ошибка при получении данных</p> }
                { ordersRequest && <p className="text text_type_main-default pb-3">Загрузка...</p> }
                {
                    <div className={styles.cardGroup}>
                        {
                            !ordersFailed && !ordersRequest && data.orders.map((order: any) => (
                                <OrderItems key={order._id} order={order} />
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default ProfileOrders