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
                <iframe src="https://giphy.com/embed/LnFPaepJw6JX2A0Q5Y" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/LnFPaepJw6JX2A0Q5Y">via GIPHY</a></p>
                </figure>
            </div>
        );
    }
});