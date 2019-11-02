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
            <div className="chooser">
                <h2><span className="BOLD">Hello World </span> | Deploy your DFO</h2>
                <ul>
                    {this.state && this.state.surveys && this.state.surveys.map(it => <li key={it.codeName}>
                        {it.codeName && [<div>
                            <h4 className="BOLD">Bio</h4>
                            <label>Name:</label>
                            <span>{it.codeName || "NONE"}</span>
                        </div>,
                        <div className="special">
                            <label>SmartContract Address:</label>
                            <span>{it.proposalAddress || "NONE"}</span>
                        </div>,
                        <div>
                            <h4 className="BOLD">Id</h4>
                            <label >Is submitable?</label>
                            <span>{it.submitable}</span>
                        </div>,
                        <div>
                            <label >Is internal? (callable from other functions)</label>
                            <span>{it.isInternal}</span>
                        </div>,
                        <div className="special">
                            <label>Needs a sender?</label>
                            <span>{it.needsSender}</span>
                        </div>,
                        <div>
                            <h4 className="BOLD">Advanced</h4>
                            <label>Method Signature to call:</label>
                            <span>{it.methodSignature}</span>
                        </div>,
                        <div className="special">
                            <label>Output Values (separated by space):</label>
                            <span>{JSON.stringify(it.returnAbiParametersArray)}</span>
                        </div>]}
                        {it.replaced && <div>
                            <h4 className="BOLD">Edit Functionality</h4>
                            <label>Functionality that will be replaced:</label>
                            <span>{it.replaced}</span>
                        </div>}
                        <div>
                            <label htmlFor="amount">Amount:</label>
                            <input ref={ref => this.amount = ref} id="amount" type="text"/>
                            <button onClick={this.accept}>Accept</button>
                            <button onClick={this.refuse}>Refuse</button>
                        </div>
                    </li>)}
                </ul>
            </div>
        );
    }
});