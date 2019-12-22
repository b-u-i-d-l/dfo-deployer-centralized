var RunController = function(view) {
    var context = this;
    context.view = view;

    context.call = async function call(type, codeName, inputParameters, args, returnAbiParametersArray, needsSender) {
        var parametersToEncode = [];
        if(inputParameters) {
            var length = inputParameters.length - (needsSender !== true ? 0 : type === 'read' ? 1 : 2);
            for(var i = 0; i < length; i++) {
                parametersToEncode.push(inputParameters[i]);
            }
        }
        parametersToEncode && (args = window.abi.encode(parametersToEncode, args));
        var data = await blockchainCall(context.view.props.dFO[type], codeName, args);
        return window.decodeAbiParameters(returnAbiParametersArray, data);
    }
};