import ac from "../_constants/action.constants";

export default {
    move,
}

function move(direction) {
    return {type: ac.move, direction};
}