import PropTypes from 'prop-types';

import { iconsLibrary } from "./Icon.lib"

export const Icon = ({ name, type = "primary" }) => {
    const props = {
        type
    }

    const resultIcon = iconsLibrary[name]?.(props)

    if (!resultIcon) return null;

    return resultIcon
}

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string
};