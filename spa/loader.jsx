var Loader=React.createClass({
    getDefaultSubscriptions() {
        return {
            'loader/toggle' : this.onToggle
        };
    },
    onToggle() {
        this.setState({visible:(this.state && this.state.visible && !this.state.visible) || true });
    },
    render() {
        return(
            <div className="MainLoader" style={{"display" : !this.state || !this.state.visible ? "none" : "block"}}>
                <figure>
                    <img src=""></img>
                </figure>
            </div>
        );
    }
});