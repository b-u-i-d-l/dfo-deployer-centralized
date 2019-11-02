var Loader=React.createClass({
    getDefaultSubscriptions() {
        return {
            'loader/toggle' : this.onToggle
        };
    },
    onToggle() {
        this.setState({visible:(this.state && this.state.visible && !this.state.visible) || true });
        this.setState({toggle:!(this.state && this.state.visible)});
    },
    render() {
        return(
            <div className="MainLoader" style={{"visible":this.state && this.state.visible ? 'block' : 'none'}} style={{"display" : !this.state || !this.state.visible ? "none" : "block"}}>
                <figure>
                <div><iframe src="https://giphy.com/embed/PgKXoMooutndQOOSAB" width="100%" height="100%" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>
                </figure>
            </div>
        );
    }
});