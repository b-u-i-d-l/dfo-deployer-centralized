var DeployController = function (view) {
    var context = this;
    context.view = view;

    context.deploy = async function deploy(data) {
        context.view.emit('message');
        var errors = [];
        !data.dfoName && errors.push('Insert a valid DFO Name');
        !data.tokenSymbol && errors.push('Insert a valid Token Symbol');
        data.tokenTotalSupply < 1 && errors.push('Token Total Supply must be greater than 1');
        data.surveyLength < 1 && errors.push('Survey Length must be greater than 1');
        !data.surveyValidationRulesAddress && errors.push('Survey Validation Rules Address must be a valid Ethereum Address');
        if (errors.length > 0) {
            throw errors;
        }
        context.view.emit('loader/toggle');
        context.view.emit('message', 'Transaction 1 of 6 - Creating VotingToken...', 'info');
        var votingToken = await createContract(window.context.votingTokenAbi, window.context.votingTokenBin, 
            data.dfoName,
            data.tokenSymbol,
            18,
            data.tokenTotalSupply);
        context.view.emit('message', 'Transaction 2 of 6 - Creating StateHolder...', 'info');
        var stateHolder = await createContract(window.context.stateHolderAbi, window.context.stateHolderBin, '0x0000000000000000000000000000000000000000');
        context.view.emit('message', 'Transaction 3 of 6 - Creating MVD Functionality Proposal Manager...', 'info');
        var mvdFunctionalityProposalManager = await createContract(window.context.mvdFunctionalityProposalManagerAbi, window.context.mvdFunctionalityProposalManagerBin);
        context.view.emit('message', 'Transaction 4 of 6 - Creating Survey Block Length...', 'info');
        var mvdBlockLengthProvider = await createContract(window.context.mvdBlockLengthProviderAbi, window.context.mvdBlockLengthProviderBin, data.surveyLength);
        context.view.emit('message', 'Transaction 5 of 6 - Creating Functionalities Manager...', 'info');
        var functionalitiesManager = await createContract(window.context.functionalitiesManagerAbi, window.context.functionalitiesManagerBin, window.getRobeAddress(), context.view.mvdBlockLengthProviderId, mvdBlockLengthProvider.address, context.view.surveyValidationRuleNFTId, data.surveyValidationRulesAddress, 0, '0x0000000000000000000000000000000000000000');
        context.view.emit('message', 'Transaction 6 of 6 - Creating Your DFO...', 'info');
        var dFO =  await createContract(window.context.mvdAbi, window.context.mvdBin,
            votingToken.address,
            stateHolder.address,
            window.getMVDFunctionalityModelsManagerAddress(),
            mvdFunctionalityProposalManager.address,
            functionalitiesManager.address
        );
        context.view.emit('message', 'Finalizing creation...', 'info');
        await window.wait(7000);
        context.view.emit('message');
        return dFO;
    };
};