import PropTypes from "prop-types";

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