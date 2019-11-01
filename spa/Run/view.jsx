var Run = React.createClass({
    componentDidMount() {
        this.controller.loadFunctionalities();
    },
    render() {
        return (
            <div className="chooser">
                    <h2><span className="BOLD">Hello World </span> | Deploy your DFO</h2>
                    <ul>
                    {this.state && this.state.functionalities && this.state.functionalities.map(it =><li key={it.codeName}>
                        <span>{it.codeName}</span>
                        {!it.isInternal && it.submitable && <button>Write</button>}
                        {!it.isInternal && !it.submitable && <button>Read</button>}
                        {it.isInternal && <span>Internal</span>}
                        <a href={it.location}>Smart Contract</a>
                        {it.proposalAddress && parseInt(it.proposalAddress.toLowerCase().split("x").join("")) >0 &&  <a href={it.proposalAddress}>History</a>}
                    </li> )}
                    </ul>
            </div> 
        );
    }
});