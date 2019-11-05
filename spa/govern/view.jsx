var Govern = React.createClass({
    componentDidMount() {
        var _this = this;
        this.controller.loadSurveys().then(data => _this.setState(data)).catch(e => _this.emit('message', e.message || e, "error"));
    },
    accept(e) {
        e && e.preventDefault(true) && e.stopPropagation(true);
    },
    refuse(e) {
        e && e.preventDefault(true) && e.stopPropagation(true);
    },
    renderSurvey(survey) {
        return (<li key={survey.codeName}>
            <div className="NavGovernTitle">
                {survey.codeName && <p><span className="BOLD">{survey.codeName || "NONE"}</span></p>}
                {survey.location && <a href={getEtherscanURL() + "address/" + survey.location} target="_blank">{"Smart Contract"}</a>}
                {survey.replaces && <div>
                    <label>Replace:</label>
                    <span>{survey.replaces}</span>
                </div>}
            </div>
            {(survey.methodSignature !== '' || (survey.returnAbiParametersArray && survey.returnAbiParametersArray.length > 0)) && <div className="NavGovernNerd">
                {survey.methodSignature && [
                    <p>submitable: <span className="BOLD">{survey.submitable ? "YES" : "NO"}</span></p>,
                    <p>internal: <span className="BOLD">{survey.isInternal ? "YES" : "NO"}</span></p>,
                    <p>sender: <span className="BOLD">{survey.needsSender ? "YES" : "NO"}</span></p>,
                    <p>Method Signature: <span className="BOLD">{survey.methodSignature}</span></p>
                ]}
                {survey.returnAbiParametersArray && survey.returnAbiParametersArray.length > 0 && [
                    <p>Output Values:</p> ,
                    <span>{JSON.stringify(survey.returnAbiParametersArray)}</span>
                ]}
            </div>}
            <div className="NavGovernVote">
                {survey.endBlock >= this.state.currentBlock && [
                    <h3 htmlFor="amount">Vote</h3>,
                    <input type="number" ref={ref => this.amount = ref} id="amount" min="0" placeholder="Token Amount"/>,
                    <button className="VoteYep" onClick={this.accept}>Accept</button>,
                    <button className="VoteNope" onClick={this.refuse}>Refuse</button>
                ]}
                <h3 htmlFor="amount">Status</h3>
                <p>Start Block: <span className="BOLD">{survey.startBlock}</span></p>
                <p>End Block: <span className="BOLD">{survey.endBlock}</span></p>
                <p>Accepted: <span className="BOLD">{survey.accepted}</span></p>
                <p>Refused: <span className="BOLD">{survey.refused}</span></p>
                <p>Tokens Locked: <span className="BOLD">{survey.accepted + survey.refused}</span></p>
            </div>
        </li>);
    },
    render() {
        return (
            <section className="Nav">
                <div className="NavAll">
                    <div className="NavGovern">
                        <h2><span className="BOLD"></span> Coming Soon</h2>
                        <h2><span className="BOLD">Proposal </span> | In Progress</h2>
                        <ul>
                            {this.state && this.state.surveys && this.state.surveys.map(this.renderSurvey)}
                        </ul>
                        <h2><span className="BOLD">Proposal </span> | History</h2>
                        <ul>
                            {this.state && this.state.terminatedSurveys && this.state.terminatedSurveys.map(this.renderSurvey)}
                        </ul>
                    </div>
                </div>
            </section>
        );
    }
});