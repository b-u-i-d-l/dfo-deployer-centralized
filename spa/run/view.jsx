var Run = React.createClass({
    componentDidMount() {
        this.controller.loadFunctionalities();
    },
    onClick(e, it) {
        
    },
    render() {
        var _this = this;
        return (
            <div className="chooser">
                    <h2><span className="BOLD">Hello World </span> | Deploy your DFO</h2>
                    <ul>
                    {this.state && this.state.functionalities && this.state.functionalities.map(it =><li key={it.codeName}>
                        <span>{it.codeName}</span>
                        {!it.isInternal && it.submitable && <button onClick={e => _this.onClick(e, it)}>Write</button>}
                        {!it.isInternal && !it.submitable && <button onClick={e => _this.onClick(e, it)}>Read</button>}
                        {it.isInternal && <span>Internal</span>}
                        <a href={getEtherscanURL() + "address/" + it.location}>Smart Contract</a>
                        {it.proposalAddress && parseInt(it.proposalAddress.toLowerCase().split("x").join("")) >0 &&  <a href={getEtherscanURL() + "address/" + it.proposalAddress}>History</a>}
                    </li> )}
                    </ul>
            </div> 
        );
    }
});