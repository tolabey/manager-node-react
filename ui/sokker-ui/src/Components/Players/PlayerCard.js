import React from "react";
import I from "immutable";
import { connect } from "react-redux";
import Tablo from "../Tablo/Tablo";


class PlayerCard extends React.Component {

    constructor(props) {
        super(props);
        this.tableTitles = [
            "ID",
            "name",
            "surname",
            "age",
            "skillForm",
            "skillExperience",
            "skillTeamwork",
            "skillDiscipline",
            "skillStamina",
            "skillPace",
            "skillTechnique",
            "skillPassing",
            "skillKeeper",
            "skillDefending",
            "skillPlaymaking",
            "skillScoring",
            "saveDate"
        ]

    }

    calculateImprovement(prevListIndex = this.props.playerList.size - 2 ) {
        console.log("prevListIndex", prevListIndex, this.props.playerList.size - 2)
        let calculatedList = [];
        const playerList = this.props.playerList.toJS();
        const playersCount = playerList[playerList.length - 1].players.length;

        for(let i = 0; i < playersCount; i++) {
            const tempPlayerInfo = {};

            for(let skill in playerList[playerList.length - 1].players[i]) {
                if(
                    [
                        "skillForm",
                        "skillExperience",
                        "skillTeamwork",
                        "skillDiscipline",
                        "skillStamina",
                        "skillPace",
                        "skillTechnique",
                        "skillPassing",
                        "skillKeeper",
                        "skillDefending",
                        "skillPlaymaking",
                        "skillScoring"
                    ].includes(skill)
                ) {
                    const current = playerList[playerList.length - 1].players[i][skill];
                    console.log(playerList, playerList.length - 1)
                    console.log(prevListIndex)
                    const prev = playerList[prevListIndex].players[i][skill];


                    const dif = current - prev;
                    tempPlayerInfo[skill] = <div className={`${dif > 0 && 'green'} ${dif < 0 && 'red'}`}>{playerList[playersCount - 1].players[i][skill] + "(" + dif + ")"}</div>;
                } else {
                    tempPlayerInfo[skill] = playerList[playersCount - 1].players[i][skill];
                }
            }
            calculatedList = [...calculatedList, tempPlayerInfo];
        }
        return calculatedList;
    }

    render() {
        const { playerList, selectedDateIndex } = this.props;
        if(playerList.size !== 0) {
            return(
                <div className="player-wrapper">
                    <Tablo
                        titles={this.tableTitles}
                        data={this.calculateImprovement(selectedDateIndex)}
                    />
                </div>
            )
        }
        else return null
    }
}

function mapStateToProps(store) {
    return {
        playerList: store.get("playerList", I.List()),
        selectedDateIndex: store.get("selectedDateIndex", undefined),
    }
}

export default connect(mapStateToProps)(PlayerCard);