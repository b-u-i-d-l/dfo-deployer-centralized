var Messages=React.createClass({
    getDefaultSubscriptions() {
        return {
            'message' : this.onMessage
        };
    },
    onMessage(message, className) {
        var _this = this;
        this.setState({message, className}, function() {
            !_this.state.message || _this.state.message.length === 0 || _this.state.className === 'error' && _this.emit('loader/toggle', false);
        });
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