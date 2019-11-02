var Propose = React.createClass({
    render() {
        return (
            <section className="Nav">
                <div className="NavAll">
                    <div className="NavPropose">
                        <h2><span className="BOLD">Propose</span> Update</h2>
                    <div>
                        <h4 className="BOLD">Bio</h4>
                        <label for="functionalityName">Name:</label>
                        <input id="functionalityName" type="text" />
                    </div>
                    <div className="special">
                        <label for="functionalityAddress">SmartContract Address:</label>
                        <input id="functionalityAddress" type="text" />
                    </div>
                    <div>
                        <h4 className="BOLD">Id</h4>
                        <label for="functionalitySubmitable">Is submitable?</label>
                        <input id="functionalitySubmitable" type="checkbox" />
                    </div>
                    <div>
                        <label for="functionalityInternal">Is internal? (callable from other functions)</label>
                        <input id="functionalityInternal" type="checkbox" />
                    </div>
                    <div className="special">
                        <label for="functionalityNeedsSender">need a sender?</label>
                        <input id="functionalityNeedsSender" type="checkbox" />
                    </div>
                    <div>
                        <h4 className="BOLD">Advanced</h4>
                        <label for="functionalityMethodSignature">Method Signature to call:</label>
                        <input id="functionalityMethodSignature" type="text" />
                    </div>
                    <div className="special">
                        <label for="functionalityOutputParameters">Output Values (separated by space):</label>
                        <input id="functionalityOutputParameters" type="text" />
                    </div>
                    <div>
                        <h4 className="BOLD">Edit Functionality</h4>
                        <label for="functionalityReplace">Update an Existing Function?:</label>
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
            </section>
        );
    }
});