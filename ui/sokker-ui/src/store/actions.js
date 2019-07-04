import I from "immutable";

export default function actionCreator(type, value) {
    return {type: type, payload: I.fromJS(value)};
}