import { Container } from 'components/ui/Grid/Grid';

import OrderComposition from '../../components/OrderComposition/OrderComposition';

import styles from './styles.module.css';

export const OrderCompositionPage = () => {
    return (
        <Container>
            <div className={styles.block}>
                <OrderComposition />
            </div>
        </Container>
    );
};