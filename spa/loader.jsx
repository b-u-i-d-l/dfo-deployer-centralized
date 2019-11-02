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
                <div><iframe src="https://giphy.com/embed/PgKXoMooutndQOOSAB" width="100%" height="100%" frameBorder="0" style={{"position":"absolute"}} class="giphy-embed" allowFullScreen></iframe></div>
                </figure>
            </div>
        );
    }
});