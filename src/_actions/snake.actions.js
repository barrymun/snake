import ac from "../_constants/action.constants";

export default {
    move,
}

function move(direction, position) {
    return {type: ac.move, direction, position};
}