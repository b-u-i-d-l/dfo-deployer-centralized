var Loader=React.createClass({
    getDefaultSubscriptions() {
        return {
            'loader/toggle' : this.onToggle
        };
    },
    onToggle(visible) {
        this.setState({visible: (visible === true || visible === false) ? visible : this.state && this.state.visible ? !this.state.visible : true});
    },
    render() {
        return(
            <div className="MainLoader" style={{"display" : this.state && this.state.visible ? "block" : "none"}}>
                <figure>
                <div><iframe src="https://giphy.com/embed/PgKXoMooutndQOOSAB" width="100%" height="100%" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>
                </figure>
            </div>
        );
    }
});