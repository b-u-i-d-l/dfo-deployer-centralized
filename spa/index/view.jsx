var Index = React.createClass({
    getDefaultSubscriptions() {
        return {
            'dfo/deploy': this.onDFO
        };
    },
    onDFO(dFO) {
        var _this = this;
        _this.address && (_this.address.value = dFO.address);
        var tokenAddress = '';
        var tokenName = '';
        var tokenSymbol = '';
        dFO.getToken(function (error, tA) {
            try {
                tokenAddress = tA;
                var token = window.web3.eth.contract(window.context.votingTokenAbi).at(tokenAddress);
                token.name(function (error1, tN) {
                    try {
                        tokenName = tN;
                        token.symbol(function (error2, tS) {
                            try {
                                tokenSymbol = tS;
                            } catch(e) {
                            }
                            _this.setState({ dFO, tokenAddress, tokenName, tokenSymbol, deploy: null }, function () {
                                window.history.pushState({}, "", window.location.protocol + "//" + window.location.hostname + (window.location.port && window.location.port !== "443" && window.location.port !== "80" ? (":" + window.location.port) : "") + "/?addr=" + dFO.address);
                            });
                        });
                    } catch (e) {
                        _this.setState({ dFO, tokenAddress, tokenName, tokenSymbol, deploy: null }, function () {
                            window.history.pushState({}, "", window.location.protocol + "//" + window.location.hostname + (window.location.port && window.location.port !== "443" && window.location.port !== "80" ? (":" + window.location.port) : "") + "/?addr=" + dFO.address);
                        });
                    }
                });
            } catch (e) {
                _this.setState({ dFO, tokenAddress, tokenName, tokenSymbol, deploy: null }, function () {
                    window.history.pushState({}, "", window.location.protocol + "//" + window.location.hostname + (window.location.port && window.location.port !== "443" && window.location.port !== "80" ? (":" + window.location.port) : "") + "/?addr=" + dFO.address);
                });
            }
        });
    },
    load(e) {
        e && e.preventDefault(true) && e.stopPropagation(true);
        this.emit('message', '');
        var _this = this;
        _this.setState({ dFO: null, deploy: null }, () => {
            _this.controller.tryLoadDFO(this.address.value.split(' ').join('')).then(_this.onDFO).catch(alert);
        });
    },
    deploy(e) {
        e && e.preventDefault(true) && e.stopPropagation(true);
        this.setState({ dFO: null, deploy: true });
    },
    requiredModules: [
        'spa/deploy',
        'spa/dFORule'
    ],
    requiredScripts: [
        'spa/messages.jsx',
        'spa/loader.jsx'
    ],
    componentDidMount() {
        var address = '';
        try {
            address = window.location.search.split(' ').join('').split('/').join('').split('?addr=').join('');
        } catch (e) {
        }
        window.isEthereumAddress(address) && (this.address.value = address) && this.load();
    },
    render() {
        return (
            <div className="Main">
                <Messages />
                <Loader />
                <article className="MainAwesome">
                    <figure>
                        <div className="GIFY"><iframe src="https://giphy.com/embed/cPHYguVPkcXBIM5tpX" width="100%" height="100%" style={{ "position": "absolute" }} frameBorder="0" className="giphy-embed" allowFullScreen></iframe></div>
                    </figure>
                    <h4>Deploy and Manage a DFO</h4>
                    <p>The Decentralized Flexible Organization is a new concept, that reshapes how we’re building Decentralized Applications, solving some critical points of failure in the today’s Dapp ecosystem like the needs of a Legal Known Entity to Trust, the slowly Smart Contract Developing and the Centralized or Distributed Servers Needs.</p>
                    <div className="MainBtn">
                        <a target="_blank" href="https://medium.com/risepic/introducing-the-decentralized-flexible-organization-8c9e6fbab6d4">Manifesto</a>
                        <a target="_blank" href="https://github.com/b-u-i-d-l">Code</a>
                        <a target="_blank" href="https://gitcoin.co/grants/154/decentralized-flexible-organization">Support</a>
                    </div>
                    <div className="MainLoad">
                        <input ref={ref => this.address = ref} placeholder="DFO ETH Address" />
                        <button type="button" onClick={this.load}>Load</button>
                        <a className="MainDeploy" href="javascript:;" onClick={this.deploy}>or deploy a new <span className="BOLD">Decentralized Flexible Organization</span></a>
                    </div>
                </article>
                {this.state && this.state.dFO && <DFORule dFO={this.state.dFO} tokenAddress={this.state.tokenAddress} tokenName={this.state.tokenName} tokenSymbol={this.state.tokenSymbol} />}
                {this.state && this.state.deploy && <Deploy />}
                <div className="NoWeb3">
                    <figure>
                        <img src="./assets/img/DFOhub5w.png" />
                    </figure>
                    <section className="UnderstandingDFO">
                        <h1>Why Decentralized Flexible Organization can be a huge game changer?</h1>
                        <h3>Dapps today needs a well-known entity to trust, we can call them "Semi-Dapps", for some unadressed issues... like...</h3>
                        <ul>
                            <li>
                                <h4>The Front-End Attack: </h4>
                                <p>If a Company rule the front end of a Dapp, the scenario of censorship is not impossible, in fact editing the Front-End you can choose easily what people can see, and even if the information is public in the Blockchain, users are not able to see some information inside the application.</p>
                            </li>
                            <li>
                                <h4>The DNS Attack: </h4>
                                <p>If a Well-Known Entity hosts a Decentralized Application, governments can easily block the DNS connections to it. Someone can argue that this attack is limited by the fact that people can call Smart Contracts directly from the Main Net of the Blockchain, but this is very difficult for non-tech users and in terms of non-financial related applications is definitely a censoring model.</p>
                            </li>
                            <li>
                                <h4>Slowly Developing and Pre-Release Bug Fixing: </h4>
                                <p>Smart Contracts once deployed they need to be killed and forked, so Coders have to be sure about the code and they need to trust third parties to scrutinize the code before to test it in the main-net with real users. This situation is exactly the contrary of what makes Web 2.0 fast and resilient. </p>
                            </li>
                            <li>
                                <h4>Monolithic Coding and Centralized Decision Making: </h4>
                                <p>The monolithic way of coding Smart Contracts to build Decentralized Applications, is a huge gap for adoption, first of all for limitation of space in deploying to Programmable Blockchains. Secondly, for the GAS used by users in calling a function inside a complex application (more complex is the code, more GAS users have to spend to call a function). And at the end of the day, a well-know entity is needed to fork or update an application...</p>
                            </li>
                            <li>
                                <h4>Monolithic Coding and Centralized Decision Making: </h4>
                                <p>The monolithic way of coding Smart Contracts to build Decentralized Applications, is a huge gap for adoption, first of all for limitation of space in deploying to Programmable Blockchains. Secondly, for the GAS used by users in calling a function inside a complex application (more complex is the code, more GAS users have to spend to call a function). And at the end of the day, a well-know entity is needed to fork or update an application...</p>
                            </li>
                        </ul>
                        <h1>A new wave of Decentralized Applications is coming... But this time with <span className="BOLD">no points of failure</span></h1>
                        <p>The Decentralized Flexible Organization is a new concept, that reshapes how we’re building Decentralized Applications, solving some critical points of failure in the today’s Dapp ecosystem like the needs of a Legal Known Entity to Trust, the slowly Smart Contract Developing and the Centralized or Distributed Servers Needs.</p>
                        <p> The Decentralized Flexible Organisation is a basic layer independent from the functions of a Decentralized Applications, with the aim to rule all of the developing and upgrade of it since the beginning in an anonymous way. In fact, using DFO, the first step to start building a Decentralized Application is to Deploy the DAO side, with the Voting Token information and the Voting Rules.</p>
                        <p> Once deployed the DFO Smart Contract works as a Proxy to route functions in Read/Write rules or read-only rules to the connected Smart Contracts or Non-Fungible Tokens, so at the end of the day, Token Holders can vote the edit, kill or add functionality and design features of the Decentralized Application. Basically, the community can BUIDL, and 100% rule it without needs to trust an entity or to trust each other.</p>
                        <figure>
                            <img src="./assets/img/DFOImg.png" />
                        </figure>
                        <p>To reach this goal, the DFO is introducing a new way to deploy Flexible Decentralized Applications that will enable an interesting, smart way to code and deploy Smart Contracts, more like Microservices, and this is why we called it “Flexible” rather than “Autonomous.”</p>
                        <p>This Microservices kind of developing is fascinating because can introduce a new wave of Decentralized Application where if a single Smart Contract is broken, don’t block the entire application security and usability, but only the single function and it’ll be killed or edited fast without needs to a single entity to do emergency strategies like to fork the entire application.</p>
                        <p>Another important step forward is the idea to introduce NFTs for Front-End Code, so the DFO proxy is able to redirect users to the right NFTs to download the frontend code when a user’s browsers want to surf the Decentralized Application, and at the same time, Token Holders are able to easily vote for the front end connecting the Proxy to the chained NFTs they prefer.</p>
                        <p>This setup is a step forward for building Decentralized Application, that can be hosted by anyone in every kind of domain name, just adding one or two simple lines of code to redirect users to the Proxy of the DFO, making Dapps more censorship-resistant than ever before.</p>
                        <div className="MainBtn">
                            <a target="_blank" href="https://medium.com/risepic/introducing-the-decentralized-flexible-organization-8c9e6fbab6d4">Manifesto</a>
                            <a target="_blank" href="https://github.com/b-u-i-d-l">Github</a>
                            <a target="_blank" href="https://gitcoin.co/grants/154/decentralized-flexible-organization">Gitcoin</a>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
});