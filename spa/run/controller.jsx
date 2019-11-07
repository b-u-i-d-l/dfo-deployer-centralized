var RunController = function(view) {
    var context = this;
    context.view = view;

    context.call = async function call(type, codeName, inputParameters, args, returnAbiParametersArray) {
        inputParameters && (args = window.abi.encode(inputParameters, args));
        var data = await blockchainCall(context.view.props.dFO[type], codeName, args);
        return window.decodeAbiParameters(returnAbiParametersArray, data);
    }
};