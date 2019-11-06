var RunController = function(view) {
    var context = this;
    context.view = view;

    context.call = async function call(type, codeName, inputParameters, args, returnAbiParametersArray) {
        inputParameters && (args = window.abi.encodeParameters(inputParameters, args));

        var data = await blockchainCall(context.view.props.dFO[type], codeName, args);
        if(!returnAbiParametersArray || returnAbiParametersArray.length === 0) {
            return data;
        }
        data = window.abi.decodeParameters(returnAbiParametersArray, data);
        return (data.length || data.__length__) === 1 ? data[0] : data;
    }
};