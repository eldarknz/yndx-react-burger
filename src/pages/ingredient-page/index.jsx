import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Container } from 'components/ui/Grid/Grid';

import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';

import { GET_INGREDIENT_DETAILS } from 'services/actions';

import styles from './styles.module.css';

export const IngredientPage = () => {
    const dispatch = useDispatch();

    const { id } = useParams();

    const { ingredients, viewedIngredient } = useSelector(store => store.app);

    const selectedIngredient = ingredients.find(ingredient => ingredient._id === id);

    useEffect(() => {
        dispatch({ type: GET_INGREDIENT_DETAILS, ingredient: selectedIngredient });
    }, [dispatch, ingredients, selectedIngredient]);

    return (
        <Container>
            <div className={styles.block}>
                {viewedIngredient ? <IngredientDetails /> : (
                    <div className="text text_type_main-default">Загрузка...</div>
                )}
            </div>
        </Container>
    );
};