import { Container } from 'components/ui/Grid/Grid';

import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';

import styles from './styles.module.css';

export const IngredientPage = () => {
    return (
        <Container>
            <div className={styles.block}>
                <IngredientDetails />
            </div>
        </Container>
    );
};