import ac from "../_constants/action.constants";

export default {
    changeDirection,
}

const changeDirection = direction => ({type: ac.changeDirection, direction});