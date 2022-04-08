import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { getUser } from '../../services/actions/user';

import { ROUTES } from "../../utils/constants";

const UnprotectedRoute = ({ path, exact, children }) => {
    const { user } = useSelector(store => store.user);
    console.log(user);
    
    const [isUserLoaded, setUserLoaded] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(getUser());
        setUserLoaded(true);
    }, [dispatch])

    if (!isUserLoaded) {
        return null;
    }
    
    const locationFrom =  location.search.indexOf('?redirectUrl=') >= 0  ? location.search.split('?redirectUrl=')[1] : ROUTES.home.path;

    return (
        <Route path={path} exact={exact} render={() => !user ? (children) : (<Redirect to={{ pathname: locationFrom }} />)} />
    )
}

export default UnprotectedRoute