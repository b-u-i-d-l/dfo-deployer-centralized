var IndexController = function(view) {
    var context = this;
    context.view = view;

    context.tryLoadDFO = function tryLoadDFO(dFOAddress) {
        return new Promise(function(ok, ko) {
            if(!isEthereumAddress(dFOAddress)) {
               return ko("Insert a valid DFO Address");
            }
            var dFO = window.web3.eth.contract(window.context.mvdAbi).at(dFOAddress);
            dFO.getFunctionalitiesAmount(function(e, data) {
                if(e) {
                    return ko(e.message || e);
                }
                if(data.toNumber() === 0) {
                    return ko("This Address is not a DFO");
                }
                return ok(dFO);
            });
        });
    }
};