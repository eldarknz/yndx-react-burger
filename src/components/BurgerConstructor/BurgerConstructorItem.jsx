import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Row } from "../ui/Grid/Grid";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { deleteIngredient, swapIngredients } from 'services/actions';

import { ingredientType } from "../../utils/types";

import styles from "./BurgerConstructor.module.css";

const BurgerConstructorItem = (props) => {

    const dispatch = useDispatch();

    const { price, image, name } = props.ingredient;

    const ref = useRef(null);

    const [{ opacity }, dragRef] = useDrag({
        type: 'burgerIngredient',
        item: () => ({ id: props.ingredient._id, index: props.index }),
        collect: monitor => ({
          opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    const [, dropRef] = useDrop({
        accept: 'burgerIngredient',
        hover: (item, monitor) => {
            if (!ref.current) return;
            
            const dragIndex = item.index;
            const hoverIndex = props.index;
        
            if (dragIndex === hoverIndex) return;

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();

            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
        
            dispatch(swapIngredients(dragIndex, hoverIndex));
        
            item.index = hoverIndex;
        }
    });

    dragRef(dropRef(ref))

    return (
        <div ref={ref} style={{ opacity }}>
            <Row align="center">
                {
                    <div 
                        className={styles.block}
                    >
                        <div className={styles.blokcIcon}>
                            <DragIcon type="primary" />
                        </div>
                        <div className={styles.constructorElementFull}>
                            <ConstructorElement
                                text={name}
                                price={price}
                                thumbnail={image}
                                handleClose={() => dispatch(deleteIngredient(props.ingredient))}
                            />
                        </div>
                    </div>
                }
            </Row>
        </div>
    );
};

BurgerConstructorItem.propTypes = {
    index: PropTypes.number.isRequired,
    ingredient: ingredientType.isRequired
};

export default BurgerConstructorItem