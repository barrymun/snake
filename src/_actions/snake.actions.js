import ac from "../_constants/action.constants";

export default {
    move,
    changeDirection,
    changeInterval,
}

function move() {
    return {type: ac.move};
}

function changeDirection(direction) {
    return {type: ac.changeDirection, direction};
}

function changeInterval(interval) {
    return {type: ac.changeInterval, interval};
}
