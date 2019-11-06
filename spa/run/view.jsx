var Run = React.createClass({
    componentDidMount() {
        var _this = this;
        loadFunctionalities(_this.props.dFO).then(functionalities => _this.setState({functionalities})).catch(e => _this.emit('message', e.message || e, 'error'));
    },
    onClick(e, element) {
        e && e.preventDefault(true) && e.stopPropagation();
        var type = $(e.target).hasClass('RwWrite') ? 'submit' : 'read';
        var args = [];
        var _this = this;
        if(this[element.codeName + 'Input']) {
            this[element.codeName + 'Input'].children().each((i, element) => {
                var $element = $($(element).children()[1]);
                var val = $element.val();
                $element.is('input[type="number"]') && (val = parseInt(val));
                $element.is('select') && (val = val === 'true');
                args.push(val);
            });
        }
        this.controller.call(type, element.codeName, element.inputParameters, args, element.returnAbiParametersArray).then(r => {
            var response = ((_this.state && _this.state.response) || {});
            response[element.codeName] = r;
            this.setState({response});
        }).catch(e => _this.emit('message', e.message || e, "error"));
    },
    renderInput(element) {
        if(element.isInternal || !element.methodSignature) {
            return;
        }
        var _this = this;
        return (<ul ref={ref => this[element.codeName + 'Input'] = $(ref)}>
            {element.inputParameters.map(it => <li key={it}>
                <label>{it}</label>
                {"\u00a0"}
                {(it === 'bytes32' || it === 'address' || it === 'string' || it.indexOf('uint') == 0) && <input type={it.indexOf('uint') == 0 ? "number" : "text"} min="0" placeholder={it === 'address' ? "Insert your ethereum address" : ""}></input>}
                {it === 'bool' && <select>
                    <option value="false" selected>false</option>
                    <option value="true">true</option>
                </select>}
            </li>)}
            {_this.state && _this.state.response && _this.state.response[element.codeName] && <p>Response: {JSON.stringify(_this.state.response[element.codeName])}</p>}
        </ul>);
    },
    render() {
        var _this = this;
        return (
            <div className="NavAll">
                    <h2><span className="BOLD">The DFO </span> | Explore</h2>
                    <ul className="NavRunRw">
                    {this.state && this.state.functionalities && this.state.functionalities.map(it =><li key={it.codeName}>
                        <span className="RwCn">{it.codeName}</span>
                        {this.renderInput(it)}
                        {!it.isInternal && it.submitable && <button className="RwWrite" onClick={e => _this.onClick(e, it)}>Write</button>}
                        {!it.isInternal && !it.submitable && <button className="RwRead" onClick={e => _this.onClick(e, it)}>Read</button>}
                        {it.isInternal && <span className="RwIntern">Internal</span>}
                        <a target="_blank" className="RwSm" href={getEtherscanURL() + "address/" + it.location}>Smart Contract</a>
                        {it.proposalAddress && parseInt(it.proposalAddress.toLowerCase().split("x").join("")) >0 &&  <a target="_blank" className="RwPa" href={getEtherscanURL() + "address/" + it.proposalAddress}>History</a>}
                    </li> )}
                    </ul>
            </div> 
        );
    }
});