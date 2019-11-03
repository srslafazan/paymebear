export default (abi, address = null, options = {}) => window.web3.eth.contract(abi).at(address)
