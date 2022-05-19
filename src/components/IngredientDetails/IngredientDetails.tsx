import cn from "classnames";

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Row, Col } from "../../components/ui/Grid/Grid";

import { IIngredientsStore, TIngredient } from "../../../declarations";

import styles from "./IngredientDetails.module.css";

const IngredientDetails = () => {

    const { id } = useParams<{ id: string }>();

    const { ingredients } = useSelector((store: IIngredientsStore) => store.app);

    const viewedIngredient = ingredients.find((ingredient: TIngredient) => ingredient._id === id);

    return (
        <div className={styles.ingredientBlock}>
            {!viewedIngredient ? <div className="text text_type_main-default">Загрузка...</div> : (
                <>
                <div className={styles.image}>
                    <img src={viewedIngredient.image_large} alt={viewedIngredient.name}/>
                </div>
                <div className={cn(styles.title, "pb-8")}>
                    <h3 className="text text_type_main-medium">{viewedIngredient.name}</h3>
                </div>
                <Row>
                    <Col col="3" className="textAlignCenter">
                        <p className="text text_type_main-default text_color_inactive pb-2">Калории,ккал</p>
                        <p className="text text_type_main-default text_color_inactive pb-2">{viewedIngredient.calories}</p>
                    </Col>
                    <Col col="3" className="textAlignCenter">
                        <p className="text text_type_main-default text_color_inactive pb-2">Белки, г</p>
                        <p className="text text_type_main-default text_color_inactive pb-2">{viewedIngredient.proteins}</p>
                    </Col>
                    <Col col="3" className="textAlignCenter">
                        <p className="text text_type_main-default text_color_inactive pb-2">Жиры, г</p>
                        <p className="text text_type_main-default text_color_inactive pb-2">{viewedIngredient.fat}</p>
                    </Col>
                    <Col col="3" className="textAlignCenter">
                        <p className="text text_type_main-default text_color_inactive pb-2">Углеводы, г</p>
                        <p className="text text_type_main-default text_color_inactive pb-2">{viewedIngredient.carbohydrates}</p>
                    </Col>
                </Row>
                </>
            )}
        </div>
    );
};

export default IngredientDetails