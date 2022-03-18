<div className={styles.block}>
    <div className={styles.blokcIcon}>
        <DragIcon type="primary" />
    </div>
    <div className={styles.constructorElementFull}>
        <ConstructorElement
            text={item.name}
            price={item.price}
            thumbnail={item.image}
            handleClose={() => onDelete(item._id)}
        />
    </div>
</div>