var IndexController = function(view) {
    var context = this;
    context.view = view;

    context.tryLoadDFO = function tryLoadDFO(dFOAddress) {
        return new Promise(function(ok, ko) {
            if(!isEthereumAddress(dFOAddress)) {
                ko("Please insert a valid Ethereum address");
            }
            var dFO = web3.eth.contract(window.context.mvdAbi).at(dFOAddress);
            dFO.getFunctionalitiesAmount(function(e, data) {
                if(e) {
                    return ko(e.message || e);
                }
                if(data.toNumber() === 0) {
                    //return ko("The Provided address is not a valid DFO Smart Contract");
                }
                return ok(dFO);
            });
        });
    }
};