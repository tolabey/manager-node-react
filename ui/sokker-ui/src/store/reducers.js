import I from "immutable";

export default function reducers(store = I.Map(), action) {
    switch (action.type) {
        case "USER_NAME":
            return store.setIn(["account", "userName"], action.payload);
        case "USER_PASSWORD":
            return store.setIn(["account", "password"], action.payload);
        case "SET_TEAM_ID_AND_COOKIE":
            return store.set("idAndCookie", action.payload);
        case "SET_PLAYER_LIST":
            console.log("playerList reducer", action.payload);
            return store.set("playerList", action.payload);
        case "SET_SELECTED_DATE_INDEX":
            console.log("action", action)
            return store.set("selectedDateIndex", action.payload);
        default:
            return store;
    }
}