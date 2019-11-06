var Propose = React.createClass({
    componentDidMount() {
        var _this = this;
        loadFunctionalities(_this.props.dFO).then(functionalities => _this.setState({ functionalities })).catch(e => _this.emit('message', e.message || e, 'error'));
    },
    propose(e) {
        e && e.preventDefault(true) && e.stopPropagation(true);
        var _this = this;
        _this.controller.propose(getData(this.domRoot)).catch(e => _this.emit('message', e.message || e, 'error'));
    },
    render() {
        return (
            <section className="Nav">
                <div className="NavAll">
                    <div className="NavPropose">
                        <h2><span className="BOLD">Propose</span> Update</h2>
                        <div>
                            <h4 className="BOLD">Bio</h4>
                            <label htmlFor="functionalityName">Name:</label>
                            <input id="functionalityName" type="text" />
                        </div>
                        <div className="special">
                            <label htmlFor="functionalityAddress">SmartContract Address:</label>
                            <input id="functionalityAddress" type="text" />
                        </div>
                        <div>
                            <h4 className="BOLD">Id</h4>
                            <label htmlFor="functionalitySubmitable">Is submitable?</label>
                            <input id="functionalitySubmitable" type="checkbox" />
                        </div>
                        <div>
                            <label htmlFor="functionalityInternal">Is internal? (callable from other functionality only)</label>
                            <input id="functionalityInternal" type="checkbox" />
                        </div>
                        <div className="special">
                            <label htmlFor="functionalityNeedsSender">needs sender?</label>
                            <input id="functionalityNeedsSender" type="checkbox" />
                        </div>
                        <div>
                            <h4 className="BOLD">Advanced</h4>
                            <label htmlFor="functionalityMethodSignature">Method Signature to call:</label>
                            <input id="functionalityMethodSignature" type="text" />
                        </div>
                        <div className="special">
                            <label htmlFor="functionalityOutputParameters">Output Values (separated by spaces):</label>
                            <input id="functionalityOutputParameters" type="text" />
                        </div>
                        <div>
                            <h4 className="BOLD">Edit Functionality</h4>
                            <label htmlFor="functionalityReplace">Update an Existing Function?:</label>
                            <select id="functionalityReplace">
                                <option selected="true">NONE</option>
                                {this.state && this.state.functionalities && this.state.functionalities.map(it => <option key={it.codeName}>{it.codeName}</option>)}
                            </select>
                        </div>
                        <div>
                            <button type="button" onClick={this.propose}>Propose</button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});