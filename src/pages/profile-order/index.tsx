import { Container } from '../../components/ui/Grid/Grid';

import ProfileOrder from '../../components/ProfileOrder/ProfileOrder';

import styles from './styles.module.css';

export const ProfileOrderPage = () => {
    return (
        <Container>
            <div className={styles.block}>
                <ProfileOrder />
            </div>
        </Container>
    );
};