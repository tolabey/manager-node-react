import React from "react";
import I from "immutable";
import actionCreator from "../../store/actions";
import { connect } from "react-redux";
import PlayerCard from "./PlayerCard";

class Players extends React.Component {

    getPlayerList() {
        return () => {
            const cookie = this.props.idAndCookie.getIn(["data", "cookie"]);
            const teamId = this.props.idAndCookie.getIn(["data", "teamId"]);
            fetch("/setCurrentPlayerList", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                referrer: 'no-referrer', // no-referrer, *client
                body: JSON.stringify({teamId: teamId, cookie: cookie}), // body data type must match "Content-Type" header
            }).then(
                (res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    throw res;
                }).then(res => {
                    console.log("playerList fetch", res.data);
                this.props.setPlayerList(res.data);
            })
        }
    }

    dateListRender() {
        console.log("yaw", this.props.playerList)
        return this.props.playerList.map((each, index) => {
            console.log("a")
            return(
                <button onClick={this.props.setSelectedDateIndex(index)}>{each.get("date")}</button>
            )
        })
    }

    render() {
        console.log("players", this.props);
        return(
            <div className="players-container">
                <button
                    className="loader-btn"
                    onClick={this.getPlayerList()}
                >
                    Get Current Players
                </button>
                <div className="dates">
                    {this.dateListRender()}
                </div>
                <PlayerCard />
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        playerList: store.get("playerList", I.List()),
        idAndCookie: store.get("idAndCookie", I.Map()),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setPlayerList: (value) => dispatch(actionCreator("SET_PLAYER_LIST", value)),
        setSelectedDateIndex: (value) => dispatch(actionCreator("SET_SELECTED_DATE_INDEX", value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Players)