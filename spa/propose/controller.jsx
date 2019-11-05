var ProposeController = function (view) {
    var context = this;
    context.view = view;

    context.propose = async function propose(data) {
        context.view.emit('message');
        var errors = [];
        data.functionalityReplace = data.functionalityReplace.split('NONE').join('');
        !data.functionalityName && !data.functionalityReplace && errors.push('Almost a new entry or a disabling functionality must be specified');
        data.functionalityName && !data.functionalityMethodSignature && errors.push('If you specify a functionality you must also specify a method signature');
        data.functionalityName && !isEthereumAddress(data.functionalityAddress) && errors.push('A valid ethereum address must be provided if a new functionality is proposed');
        if (errors.length > 0) {
            throw errors;
        }
        context.view.emit('loader/toggle');
        context.view.emit('message', 'Proposing Feature...');
        var transactionReceipt = await waitForReceipt(await blockchainCall(
            context.view.props.dFO.newProposal,
            data.functionalityName,
            data.functionalityAddress,
            data.functionalitySubmitable,
            data.functionalityMethodSignature,
            data.functionalityOutputParameters,
            data.functionalityInternal,
            data.functionalityNeedsSender,
            data.functionalityReplace
        ));
        context.view.emit('message', 'Proposal sent!');
        context.view.emit('loader/toggle');
        return transactionReceipt;
    }
};