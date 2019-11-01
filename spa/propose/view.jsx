var Propose = React.createClass({
    render() {
        return (
            <div className="chooser">
                    <h2><span className="BOLD">Hello World </span> | Deploy your DFO</h2>
                    <div className="create">
                    <div>
                <h2><span className="BOLD">Propose your functionality</span></h2>
                <div className="special">
                    <label for="functionalityName">Name:</label>
                    <input id="functionalityName" type="text" />
                </div>
                <div className="special">
                    <label for="functionalityAddress">Address of the SmartContract containing the functionality:</label>
                    <input id="functionalityAddress" type="text" />
                </div>
                <div className="special">
                    <label for="functionalitySubmitable">Will be a submitable functionality?</label>
                    <input id="functionalitySubmitable" type="checkbox" />
                </div>
                <div className="special">
                    <label for="functionalityMethodSignature">Method signature of the functionality to call:</label>
                    <input id="functionalityMethodSignature" type="text" />
                </div>
                <div className="special">
                    <label for="functionalityOutputParameters">Insert output values of the functionality (separated by space):</label>
                    <input id="functionalityOutputParameters" type="text" />
                </div>
                <div className="special">
                    <label for="functionalityInternal">Will be an internal functionality (callable from other valid functionalities only)?</label>
                    <input id="functionalityInternal" type="checkbox" />
                </div>
                <div className="special">
                    <label for="functionalityNeedsSender">Will this functionality need the sender of the transaction?</label>
                    <input id="functionalityNeedsSender" type="checkbox" />
                </div>
                <div className="special">
                    <label for="functionalityReplace">Select the functionality that will be replaced, if any:</label>
                    <select id="functionalityReplace">
                        <option selected="true">NONE</option>
                        <option>Goku</option>
                        <option>Scooby Doo</option>
                        <option>Mia Nonna</option>
                        <option>Toschino</option>
                        <option>Carote</option>
                        <option>Vitalik Buterin</option>
                    </select>
                </div>
                <div>
                    <button type="button">Propose</button>
                </div>
            </div>
                </div>
                </div>
        );
    }
});