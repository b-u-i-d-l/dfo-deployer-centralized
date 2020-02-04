var Deploy = React.createClass({
    getDefaultSubscriptions() {
        return {
            'metamask/update': this.onNetworkUpdate
        };
    },
    onNetworkUpdate() {
        this.surveyValidationRulesAddress && (this.surveyValidationRulesAddress.value = window.web3.currentProvider.chainId === '0x3' ? context.surveyValidationRulesDefaultAddressRopsten : context.surveyValidationRulesDefaultAddress);
        this.defaultSurveyValidationRulesAddress && (this.defaultSurveyValidationRulesAddress.href = getEtherscanURL() + "address/" + this.surveyValidationRulesAddress.value + "#code");
        this.surveyValidationRuleNFTId = window.web3.currentProvider.chainId === '0x3' ? context.surveyValidationRuleNFTIdRopsten : context.surveyValidationRuleNFTId;
        this.mvdBlockLengthProviderId = window.web3.currentProvider.chainId === '0x3' ? context.mvdBlockLengthProviderIdRopsten : context.mvdBlockLengthProviderId;
    },
    deploy(e) {
        e && e.preventDefault(true) && e.stopPropagation(true);
        var _this = this;
        this.controller.deploy(getData(this.domRoot)).then(function(dFO) {
            _this.emit("dfo/deploy", dFO);
        }).catch(e => _this.emit('message', e.message || e, "error"));
    },
    render() {
        return (
            <section className="Nav">
                <div className="NavAll">
                    <div className="NavDeploy">
                        <h2><span className="BOLD">Hello World </span> | Deploy your DFO</h2>
                        <div className="special">
                            <h4 className="BOLD">DFO</h4>
                            <label htmlFor="dfoName">Name:</label>
                            <input id="dfoName" type="text" />
                        </div>
                        <div>
                            <h4 className="BOLD">Voting Tokens</h4>
                            <label htmlFor="tokenSymbol">Symbol:</label>
                            <input id="tokenSymbol" type="text" />
                        </div>
                        <div className="special">
                            <label htmlFor="tokenTotalSupply">Total Supply:</label>
                            <input id="tokenTotalSupply" type="number" min="1" />
                        </div>
                        <div>
                            <h4 className="BOLD">Governance Rules</h4>
                            <label htmlFor="surveyLength">Survey Duration (Blocks):</label>
                            <input id="surveyLength" type="number" min="1" />
                        </div>
                        <div className="special">
                            <label htmlFor="surveyValidationRulesAddress">Rules Smart Contract Address:</label>
                            <input id="surveyValidationRulesAddress" type="text" placeholder="Enter ethereum address.." ref={ref => (this.surveyValidationRulesAddress = ref) && this.onNetworkUpdate()} />
                            <br />
                            <a id="defaultSurveyValidationRulesAddress" target="_blank" ref={ref => (this.defaultSurveyValidationRulesAddress = ref) && this.onNetworkUpdate()}>Standard</a>
                        </div>
                        <div>
                            <button type="button" onClick={this.deploy}>Deploy</button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});