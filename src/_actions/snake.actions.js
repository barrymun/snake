import ac from "../_constants/action.constants";

export default {
    move,
    changeDirection,
}

function move() {
    return {type: ac.move};
}

function changeDirection(direction) {
    return {type: ac.changeDirection, direction};
}
