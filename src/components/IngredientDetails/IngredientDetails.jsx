import cn from "classnames";

import PropTypes from "prop-types";
import { useSelector } from 'react-redux';

import { Row, Col } from "components/ui/Grid/Grid";

import styles from "./IngredientDetails.module.css";

export const ingredientType = PropTypes.shape({
    _id: PropTypes.string,
    __v: PropTypes.number,
    type: PropTypes.string,
    name: PropTypes.string,
    proteins: PropTypes.number,
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    fat: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string
});

const IngredientDetails = () => {
    const viewedIngredient = useSelector(store => store.app.viewedIngredient);
    const { image_large, name, calories, proteins, fat, carbohydrates } = viewedIngredient;

    return (
        <div className={styles.ingredientBlock}>
            <div className={styles.image}>
                <img src={image_large} alt={name}/>
            </div>
            <div className={cn(styles.title, "pb-8")}>
                <h3 className="text text_type_main-medium">{name}</h3>
            </div>
            <Row>
                <Col col="3" className="textAlignCenter">
                    <p className="text text_type_main-default text_color_inactive pb-2">Калории,ккал</p>
                    <p className="text text_type_main-default text_color_inactive pb-2">{calories}</p>
                </Col>
                <Col col="3" className="textAlignCenter">
                    <p className="text text_type_main-default text_color_inactive pb-2">Белки, г</p>
                    <p className="text text_type_main-default text_color_inactive pb-2">{proteins}</p>
                </Col>
                <Col col="3" className="textAlignCenter">
                    <p className="text text_type_main-default text_color_inactive pb-2">Жиры, г</p>
                    <p className="text text_type_main-default text_color_inactive pb-2">{fat}</p>
                </Col>
                <Col col="3" className="textAlignCenter">
                    <p className="text text_type_main-default text_color_inactive pb-2">Углеводы, г</p>
                    <p className="text text_type_main-default text_color_inactive pb-2">{carbohydrates}</p>
                </Col>
            </Row>
        </div>
    );
};

export default IngredientDetails