var Index = React.createClass({
    load(e) {
        e && e.preventDefault(true) && e.stopPropagation(true);
        var _this = this;
        _this.setState({dFOAddress: null, deploy: null }, () => {
            _this.setState({dFOAddress:"CIAOQUALCOSA"});
        });
    },
    deploy(e) {
        e && e.preventDefault(true) && e.stopPropagation(true);
        this.setState({dFOAddress: null, deploy: true });
    },
    requiredModules: [
        'spa/deploy',
        'spa/dFORule'
    ],
    requiredScripts: [
        'spa/messages.jsx'
    ],
    render() {
        return (
            <div className="Main">
                <Messages/>
                <article className="MainAwesome">
                    <figure>
                        <div className="GIFY"><iframe src="https://giphy.com/embed/cPHYguVPkcXBIM5tpX" width="100%" height="100%" style={{"position":"absolute"}} frameBorder="0" className="giphy-embed" allowFullScreen></iframe></div>
                    </figure>
                    <div className="MainLoad">
                       <input ref={ref => this.address = ref } placeholder="Enter your ethereum address here..." /> 
                       <button type="button" onClick={this.load}>Load</button>
                       <a className="MainDeploy" href="javascript:;" onClick={this.deploy}>or deploy a new <span className="BOLD">Decentralized Flexible Organization</span></a>
                    </div>
                </article>
                   {this.state && this.state.dFOAddress && <DFORule dFOAddress={this.state.dFOAddress }/>}
                   {this.state && this.state.deploy && <Deploy/>}
            </div>
        );
    }
});