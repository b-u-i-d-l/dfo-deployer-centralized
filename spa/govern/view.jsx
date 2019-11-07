var Govern = React.createClass({
    componentDidMount() {
        var _this = this;
        _this.setState({currentBlock : 99999, surveys : [
            {
                codseName : 'ciao',
                location:'0xabc',
                methodsignature: 'read',
                startBlock : 0,
                endBlock : 99999,
                accept: 0,
                refuse: 0
            }
        ]});
        //this.controller.loadSurveys().then(data => _this.setState(data)).catch(e => _this.emit('message', e.message || e, "error"));
    },
    vote(e, survey) {
        e && e.preventDefault(true) && e.stopPropagation(true);
        var $element = $(e.target);
        var amount = parseInt($element.parent().find('.voteAmount').val());
        var type = $element.hasClass('VoteYep') ? "accept" : "refuse";
        this.controller.vote(survey, type, amount).catch(e => _this.emit('message', e.message || e, 'error'));
    },
    set(e, survey) {
        e && e.preventDefault(true) && e.stopPropagation(true);
        this.controller.set(survey).catch(e => _this.emit('message', e.message || e, 'error'));
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
                    <input type="number" className="voteAmount" min="1" placeholder="Token Amount"/>,
                    <button className="VoteYep" onClick={e => this.vote(e, survey)}>Accept</button>,
                    <button className="VoteNope" onClick={e => this.vote(e, survey)}>Refuse</button>
                ]}
                {survey.endBlock < this.state.currentBlock && !survey.set && <button onClick={e => this.set(e, survey)}>Finalize Survey</button>}
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