var Deploy = React.createClass({
    render() {
        return (
            <section className="Nav">
                <div className="NavAll">
                    <div className="NavDeploy">
                        <h2><span className="BOLD">Hello World </span> | New DFO</h2>
                        <div className="special">
                            <h4 className="BOLD">DFO</h4>
                            <label for="dfoName">Name:</label>
                            <input id="dfoName" type="text" />
                        </div>
                        <div>
                            <h4 className="BOLD">Voting Tokens</h4>
                            <label for="tokenSymbol">Symbol:</label>
                            <input id="tokenSymbol" type="text" />
                        </div>
                        <div>
                            <label for="tokenDecimals">Decimals:</label>
                            <input id="tokenDecimals" type="number" min="1" />
                        </div>
                        <div className="special">
                            <label for="tokenTotalSupply">Total Supply:</label>
                            <input id="tokenTotalSupply" type="number" min="1" />
                        </div>
                        <div>
                            <h4 className="BOLD">Governance Rules</h4>
                            <label for="surveyLength">Survey Duration (Blocks):</label>
                            <input id="surveyLength" type="number" min="0" />
                        </div>
                        <div>
                            <label for="surveyValidationRulesAddress">Rules Smart Contract Address:</label>
                            <input id="surveyValidationRulesAddress" type="text" placeholder="Enter ethereum address.." />
                            <br />
                            <a id="defaultSurveyValidationRulesAddress" target="_blank" href="https://ropsten.etherscan.io/">Standard</a>
                        </div>
                        <div>
                            <button type="button" onclick="deploy();">Deploy</button>
                        </div>
                        <section className="NavHow">
                            <p>If you never heard about it, you have to can find more information here:</p>
                            <h3><span className="BOLD">How to start a DFO:</span></h3>
                            <p><span className="BOLD">STEP 1:</span> Define the voting rules and the voting token and deploy it to generate the DFO proxy Contract</p>
                            <p><span className="BOLD">STEP 2:</span> Set your first function, deploying a Smart Contract and go to the section "Survey". Fill the label to create a survey and request the connection to the proxy to Token Holders.</p>
                            <p><span className="BOLD">STEP 3:</span> Vote for the Survey using your Voting Tokens in the section "Governance"</p>
                        </section>
                    </div>
                </div>
            </section>
        );
    }
});