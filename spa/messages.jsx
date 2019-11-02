var Messages=React.createClass({
    getDefaultSubscriptions() {
        return {
            'message' : this.onMessage
        };
    },
    onMessage(message, className) {
        this.setState({message, className});
    },
    render() {
        return(
            <div className={"MainMsg" + (this.state && this.state.className ? (" " + this.state.className) : "")} style={{"display" : this.state && this.state.message ? "block" : "none"}}>
                {this.state && this.state.message && typeof this.state.message === 'string' && <p>{this.state.message}</p>}
                {this.state && this.state.message && typeof this.state.message !== 'string' && <ul>
                    {this.state.message.map((it, i) =>
                        <li key={i}>
                            <p>{it}</p>
                        </li>
                    )}
                </ul>}
            </div>
        );
    }
});