import React from "react";
import { connect } from "react-redux";
import Login from "./Components/Login/Login";
import I from "immutable";
import Players from "./Components/Players/Players";
import "./home.scss";

class Home extends React.Component {
    render() {
        const { idAndCookie } = this.props;
        return (
            <div className="home">
                <Login />
                {
                    idAndCookie.size !== 0 && <Players />
                }
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        idAndCookie: store.get("idAndCookie", I.Map()),
    }
}


export default connect(mapStateToProps)(Home)