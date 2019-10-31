var Index = React.createClass({
    render() {
        return (
            <div className="main">
                <article>
                    <figure>
                        <div className="GIFY"><iframe src="https://giphy.com/embed/cPHYguVPkcXBIM5tpX" width="100%" height="100%" style={{"position":"absolute"}} frameBorder="0" className="giphy-embed" allowFullScreen></iframe></div>
                        <p>
                            <a href="https://giphy.com/gifs/ethereum-alessandromltoschi-cPHYguVPkcXBIM5tpX"></a>
                        </p>
                    </figure>
                    <section>
                        <p>If you never heard about it, you have to can find more information here:</p>
                        <h3><span className="BOLD">How to start a DFO:</span></h3>
                        <p><span className="BOLD">STEP 1:</span> Define the voting rules and the voting token and deploy it to generate the DFO proxy Contract</p>
                        <p><span className="BOLD">STEP 2:</span> Set your first function, deploying a Smart Contract and go to the section "Survey". Fill the label to create a survey and request the connection to the proxy to Token Holders.</p>
                        <p><span className="BOLD">STEP 3:</span> Vote for the Survey using your Voting Tokens in the section "Governance"</p>
                    </section>
                </article>
                <div className="chooser">
                    <h2><span className="BOLD">Hello World </span> | Deploy your DFO</h2>
                    <div className="create">
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
                        <div className="special">
                            <label for="surveyValidationRulesAddress">Rules Smart Contract Address:</label>
                            <input id="surveyValidationRulesAddress" type="text" placeholder="Enter ethereum address.." />
                            <br />
                            <a id="defaultSurveyValidationRulesAddress" target="_blank" href="https://ropsten.etherscan.io/">Standard</a>
                        </div>
                        <div>
                            <button type="button" onclick="deploy();">Deploy</button>
                        </div>
                        <div id="messages"></div>
                    </div>
                    <div className="load">
                        Load previously deployed DFO: <input id="dfo-address" placeholder="Enter your ethereum address here..." /> &nbsp; <button type="button" onclick="loadDFO();">Load</button>
                    </div>
                </div>
            </div>
        );
    }
});