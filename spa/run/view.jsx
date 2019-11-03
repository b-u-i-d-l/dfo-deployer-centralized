var Run = React.createClass({
    componentDidMount() {
        var _this = this;
        loadFunctionalities(_this.props.dFO).then(functionalities => _this.setState({functionalities})).catch(e => _this.emit('message', e.message || e, 'error'));
    },
    onClick(e, it) {
        
    },
    render() {
        var _this = this;
        return (
            <div className="NavAll">
                    <h2><span className="BOLD">The DFO </span> | Explore</h2>
                    <ul className="NavRunRw">
                    {this.state && this.state.functionalities && this.state.functionalities.map(it =><li key={it.codeName}>
                        <span className="RwCn">{it.codeName}</span>
                        {!it.isInternal && it.submitable && <button className="RwWrite" onClick={e => _this.onClick(e, it)}>Write</button>}
                        {!it.isInternal && !it.submitable && <button className="RwRead" onClick={e => _this.onClick(e, it)}>Read</button>}
                        {it.isInternal && <span className="RwIntern">Internal</span>}
                        <a target="_blank" className="RwSm" href={getEtherscanURL() + "address/" + it.location}>Smart Contract</a>
                        {it.proposalAddress && parseInt(it.proposalAddress.toLowerCase().split("x").join("")) >0 &&  <a target="_blank" className="RwPa" href={getEtherscanURL() + "address/" + it.proposalAddress}>History</a>}
                    </li> )}
                    </ul>
            </div> 
        );
    }
});