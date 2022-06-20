import { Container } from 'components/ui/Grid/Grid';

import FeedOrder from '../../components/FeedOrder/FeedOrder';

import styles from './styles.module.css';

export const FeedOrderPage = () => {
    return (
        <Container>
            <div className={styles.block}>
                <FeedOrder />
            </div>
        </Container>
    );
};