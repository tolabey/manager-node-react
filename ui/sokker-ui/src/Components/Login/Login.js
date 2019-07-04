import React from "react";
import I from "immutable";
import actionCreator from "../../store/actions";
import { connect } from "react-redux";

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    login() {
        fetch("http://localhost:9000/getTeamIdAndCookie", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({username: this.props.userName, password: this.props.userPassword}), // body data type must match "Content-Type" header
        }).then(
            (res) => {
                if (res.ok) {
                    return res.json();
                }
                throw res;
            }).then(res => {
                this.props.setTeamIdAndCookie(res);
        })
    }

    render() {
        const { userName, userPassword, setUserName, setUserPassword, idAndCookie } = this.props;
        return (
            <div id="login">
                {
                    idAndCookie.size === 0 ? <div>{"giriş yap lütfen"}</div> : <div>{"işlem tamam"}</div>
                }
                <input
                    type="text"
                    placeholder="user name"
                    value={userName}
                    onChange={setUserName}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={userPassword}
                    onChange={setUserPassword}
                />
                <button
                    className="submit"
                    onClick={() => this.login()}
                >{"log-in"}</button>
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        userName: store.getIn(["account", "userName"], ""),
        userPassword: store.getIn(["account", "password"], ""),
        idAndCookie: store.get("idAndCookie", I.Map()),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setTeamIdAndCookie: (value) => dispatch(actionCreator("SET_TEAM_ID_AND_COOKIE", value)),
        setUserName: (e) => dispatch(actionCreator("USER_NAME", e.target.value)),
        setUserPassword: (e) => dispatch(actionCreator("USER_PASSWORD", e.target.value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);