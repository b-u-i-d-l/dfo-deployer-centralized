var DFORule = React.createClass({
    requiredModules: [
        "spa/run"
    ],
    onClick(e) {
        e && e.preventDefault(true) && e.stopPropagation(true);
        this.domRoot.children().find('li').removeClass('selected');
        $(e.target).parent().addClass('selected');
        var _this = this;
        var element = e.target.innerHTML
        ReactModuleLoader.load({
            modules: ['spa/' + element.firstLetterToLowerCase()],
            callback : () => _this.setState({element })
        })
    },
    render() {
        return (
            <section className="Nav">
                <div className="NavAll">
                        <ul className="NavChooser">
                            <li className="selected"><a href="javascript:;" onClick={this.onClick} >Run</a></li>
                            <li><a href="javascript:;" onClick={this.onClick}>Propose</a></li>
                            <li><a href="javascript:;" onClick={this.onClick}>Govern</a></li>
                        </ul>
                        {React.createElement(window[(this.state && this.state.element) || 'Run'],{dFOAddress:this.props.dFOAddress})}
                </div>
            </section>
        );
    }
});