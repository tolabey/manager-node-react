import React from "react";
import "./tablo.scss";

export default class Tablo extends React.Component {

    constructor(props) {
        super(props);
    }

    renderHeader() {
        return (
            this.props.titles.map((each) => {
                return <div className="one-title one-cell">{ each }</div>
            })
        )
    }

    renderContent() {
        return this.props.data.map((eachRow) => {
            return (
                <div className="one-row">
                    {
                        this.props.titles.map((oneTitle) => {
                            return (
                                <div className="one-cell">
                                    { eachRow[oneTitle] || "" }
                                </div>
                            )
                        })
                    }
                </div>
            )
        })
    }

    render() {
        return(
            <div className="tablo">
                <div className="header">
                    { this.renderHeader() }
                </div>
                <div className="table-content">
                    { this.renderContent() }
                </div>
            </div>
        )
    }
}