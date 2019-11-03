var Govern = React.createClass({
    componentDidMount() {
        var _this = this;
        this.controller.loadSurveys().then(surveys => _this.setState({ surveys })).catch(e => _this.emit('message', e.message || e, "error"));
    },
    accept(e) {
        e && e.preventDefault(true) && e.stopPropagation(true);
    },
    refuse(e) {
        e && e.preventDefault(true) && e.stopPropagation(true);
    },
    render() {
        return (
            <section className="Nav">
                <div className="NavAll">
                    <div className="NavGovern">
                        <h2><span className="BOLD"></span> Coming Soon</h2>
                        <h2><span className="BOLD">Proposal </span> | In Progress</h2>
                        <ul>
                            {this.state && this.state.surveys && this.state.surveys.map(it => <li key={it.codeName}>
                                {it.codeName && [<div className="NavGovernTitle">
                                    <p><span className="BOLD">{it.codeName || "NONE"}</span></p>
                                    <a href="">{it.proposalAddress || "Smart Contract"}</a>
                                    {it.replaced && <div>
                                        <label>Repplace:</label>
                                        <span>{it.replaced}</span>
                                    </div>}
                                </div>,
                                <div className="NavGovernNerd">
                                    <p>submitable: <span className="BOLD">{it.submitable}</span></p>
                                    <p>internal: <span className="BOLD">{it.isInternal}</span></p>
                                    <p>sender: <span className="BOLD">{it.needsSender}</span></p>
                                    <p>Method Signature: <span className="BOLD">{it.methodSignature}</span></p>
                                    <p>Output Values:</p>
                                    <span>{JSON.stringify(it.returnAbiParametersArray)}</span>
                                </div>]}
                                <div className="NavGovernVote">
                                    <h3 htmlFor="amount">Vote</h3>
                                    <input type="number" ref={ref => this.amount = ref} id="amount" min="0" placeholder="Token Amount"/>
                                    <button onClick={this.accept}>Accept</button>
                                    <button onClick={this.refuse}>Refuse</button>
                                    <h3 htmlFor="amount">Status</h3>
                                    <p>Accepted: <span className="BOLD">99</span></p>
                                    <p>Refused: <span className="BOLD">200</span></p>
                                    <p>End Block: <span className="BOLD">972356725723</span></p>
                                    <p>Token Invested: <span className="BOLD">70</span></p>
                                    <button className="VoteCancel" onClick={this.refuse}>Withdraw</button>
                                </div>
                            </li>)}
                        </ul>
                        <h2><span className="BOLD">Proposal </span> | History</h2>
                        <ul>
                            {this.state && this.state.surveys && this.state.surveys.map(it => <li key={it.codeName}>
                                {it.codeName && [<div className="NavGovernTitle">
                                    <p><span className="BOLD">{it.codeName || "NONE"}</span></p>
                                    <a href="">{it.proposalAddress || "Smart Contract"}</a>
                                    {it.replaced && <div>
                                        <label>Repplace:</label>
                                        <span>{it.replaced}</span>
                                    </div>}
                                </div>,
                                <div className="NavGovernNerd">
                                    <p>submitable: <span className="BOLD">{it.submitable}</span></p>
                                    <p>internal: <span className="BOLD">{it.isInternal}</span></p>
                                    <p>sender: <span className="BOLD">{it.needsSender}</span></p>
                                    <p>Method Signature: <span className="BOLD">{it.methodSignature}</span></p>
                                    <p>Output Values:</p>
                                    <span>{JSON.stringify(it.returnAbiParametersArray)}</span>
                                </div>]}
                                <div className="NavGovernVote">
                                    <h3 htmlFor="amount">Results</h3>
                                    <p>Accepted: <span className="BOLD">99</span></p>
                                    <p>Refused: <span className="BOLD">200</span></p>
                                    <p>Start Block: <span className="BOLD">962356725723</span></p>
                                    <p>End Block: <span className="BOLD">972356725723</span></p>
                                    <p>Token Locked: <span className="BOLD">0</span></p>
                                    <button className="VoteCancel" onClick={this.refuse}>Withdraw</button>
                                </div>
                            </li>)}
                        </ul>
                    </div>
                </div>
            </section>
        );
    }
});