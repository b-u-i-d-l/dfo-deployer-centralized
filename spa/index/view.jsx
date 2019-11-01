var Index = React.createClass({
    requiredModules:[
        'spa/DFORule'
    ],
    render() {
        return (
            <div className="Main">
                <article className="MainAwesome">
                    <figure>
                        <div className="GIFY"><iframe src="https://giphy.com/embed/cPHYguVPkcXBIM5tpX" width="100%" height="100%" style={{"position":"absolute"}} frameBorder="0" className="giphy-embed" allowFullScreen></iframe></div>
                    </figure>
                    <section className="MainHow">
                        <p>If you never heard about it, you have to can find more information here:</p>
                        <h3><span className="BOLD">How to start a DFO:</span></h3>
                        <p><span className="BOLD">STEP 1:</span> Define the voting rules and the voting token and deploy it to generate the DFO proxy Contract</p>
                        <p><span className="BOLD">STEP 2:</span> Set your first function, deploying a Smart Contract and go to the section "Survey". Fill the label to create a survey and request the connection to the proxy to Token Holders.</p>
                        <p><span className="BOLD">STEP 3:</span> Vote for the Survey using your Voting Tokens in the section "Governance"</p>
                    </section>
                    <div className="MainLoad">
                       <input id="dfo-address" placeholder="Enter your ethereum address here..." /> 
                       <button type="button" onclick="loadDFO();">Load</button>
                    </div>
                </article>
                <section className="Nav">
                    <DFORule/>
                </section>
            </div>
        );
    }
});