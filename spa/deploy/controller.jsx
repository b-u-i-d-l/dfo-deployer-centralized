var DeployController = function (view) {
    var context = this;
    context.view = view;

    context.deploy = async function deploy(data) {
        context.view.emit('message');
        var errors = [];
        !data.dfoName && errors.push('Insert a valid DFO Name');
        !data.tokenSymbol && errors.push('Insert a valid Token Symbol');
        data.tokenDecimals < 1 && errors.push('Token Decimals must be greater than 1');
        data.tokenTotalSupply < 1 && errors.push('Token Total Supply must be greater than 1');
        data.surveyLength < 1 && errors.push('Survey Length must be greater than 1');
        !data.surveyValidationRulesAddress && errors.push('Survey Validation Rules Address must be a valid Ethereum Address');
        if (errors.length > 0) {
            throw errors;
        }
        context.view.emit('loader/toggle');
        context.view.emit('message', 'Transaction 1 of 4 - Creating StateHolder...', 'info');
        var stateHolder = await createContract(window.context.stateHolderAbi, window.context.stateHolderBin, '0x0000000000000000000000000000000000000000');
        context.view.emit('message', 'Transaction 2 of 4 - Creating MVD Functionality Proposal Manager...', 'info');
        var mvdFunctionalityProposalManager = await createContract(window.context.mvdFunctionalityProposalManagerAbi, window.context.mvdFunctionalityProposalManagerBin);
        context.view.emit('message', 'Transaction 3 of 4 - Creating Survey Block Length...', 'info');
        var mvdBlockLengthProvider = await createContract(window.context.mvdBlockLengthProviderAbi, window.context.mvdBlockLengthProviderBin, data.surveyLength);
        context.view.emit('message', 'Transaction 4 of 4 - Creating Your DFO...', 'info');
        var dFO =  await createContract(window.context.mvdAbi, window.context.mvdBin,
            data.dfoName,
            data.tokenSymbol,
            data.tokenDecimals,
            data.tokenTotalSupply,
            stateHolder.address,
            mvdFunctionalityProposalManager.address,
            window.getRobeAddress(),
            context.view.mvdBlockLengthProviderId,
            mvdBlockLengthProvider.address,
            window.getRobeAddress(),
            context.view.surveyValidationRuleNFTId,
            data.surveyValidationRulesAddress
        );
        context.view.emit('message');
        return dFO;
    };
};