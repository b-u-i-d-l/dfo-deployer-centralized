var Index = React.createClass({
    load(e) {
        e && e.preventDefault(true) && e.stopPropagation(true);
        var _this = this;
        _this.setState({dFO: null, deploy: null }, () => {
            _this.controller.tryLoadDFO(this.address.value.split(' ').join('')).then(function(dFO) {
                _this.setState({dFO});
            }).catch(alert);
        });
    },
    deploy(e) {
        e && e.preventDefault(true) && e.stopPropagation(true);
        this.setState({dFO: null, deploy: true });
    },
    requiredModules: [
        'spa/deploy',
        'spa/dFORule'
    ],
    requiredScripts: [
        'spa/messages.jsx'
    ],
    componentDidMount() {
        var address = '';
        try {
            address = window.location.search.split(' ').join('').split('/').join('').split('?addr=').join('');
        } catch(e) {
        }
        isEthereumAddress(address) && (this.address.value = address) && this.load();
    },
    render() {
        return (
            <div className="Main">
                <Messages/>
                <article className="MainAwesome">
                    <figure>
                        <div className="GIFY"><iframe src="https://giphy.com/embed/cPHYguVPkcXBIM5tpX" width="100%" height="100%" style={{"position":"absolute"}} frameBorder="0" className="giphy-embed" allowFullScreen></iframe></div>
                    </figure>
                    <h4>Deploy and Manage a DFO</h4>
                    <p>The Decentralized Flexible Organization is a new concept, that reshapes how we’re building Decentralized Applications, solving some critical points of failure in the today’s Dapp ecosystem like the needs of a Legal Known Entity to Trust, the slowly Smart Contract Developing and the Centralized or Distributed Servers Needs.</p>
                    <div className="MainBtn">
                        <a target="_blank" href="https://medium.com/risepic/introducing-the-decentralized-flexible-organization-8c9e6fbab6d4">Manifesto</a>
                        <a target="_blank" href="https://github.com/b-u-i-d-l">Code</a>
                        <a target="_blank" href="https://gitcoin.co/grants/154/decentralized-flexible-organization">Support</a>
                    </div>
                    <div className="MainLoad">
                       <input ref={ref => this.address = ref } placeholder="DFO ETH Address" /> 
                       <button type="button" onClick={this.load}>Load</button>
                       <a className="MainDeploy" href="javascript:;" onClick={this.deploy}>or deploy a new <span className="BOLD">Decentralized Flexible Organization</span></a>
                    </div>
                </article>
                   {this.state && this.state.dFO && <DFORule dFO={this.state.dFO}/>}
                   {this.state && this.state.deploy && <Deploy/>}
            </div>
        );
    }
});