import { iconsLibrary } from "./Icon.lib"

export const Icon = ({ name, type = "primary" }) => {
    const props = {
        type
    }

    const resultIcon = iconsLibrary[name]?.(props)

    if (!resultIcon) return null;

    return resultIcon
}