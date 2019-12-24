var RunController = function(view) {
    var context = this;
    context.view = view;

    context.call = async function call(type, codeName, inputParameters, args, returnAbiParametersArray, needsSender) {
        inputParameters && needsSender && type !== 'read' && args.unshift(0);
        inputParameters && needsSender && args.unshift('0x0000000000000000000000000000000000000000');
        inputParameters && (args = window.abi.encode(inputParameters, args));
        var data = await blockchainCall(context.view.props.dFO[type], codeName, args);
        return type === 'read' ? window.decodeAbiParameters(returnAbiParametersArray, data) : [];
    }
};