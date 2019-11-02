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
            <div className={"MainMsg" + (this.state && this.state.className ? (" MainMsg_" + this.state.className) : "")} style={{"display" : this.state && this.state.message ? "block" : "none"}}>
                {this.state && this.state.message && typeof this.state.message === 'string' && <p>{this.state.message}</p>}
                {this.state && this.state.message && typeof this.state.message !== 'string' && this.state.message.map((it) =><p key={it}>{it}</p>)}
            </div>
        );
    }
});