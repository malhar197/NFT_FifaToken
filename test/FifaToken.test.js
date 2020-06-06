const FifaToken = artifacts.require('./FifaToken.sol');
require('chai')
	.use(require('chai-as-promised'))
	.should()

contract('FifaToken',(accounts) => {
	let contract;

describe('deployment',async() => {
	it('deploys successfully', async () => {
		contract = await FifaToken.deployed();
		const address = contract.address;
		console.log(address);
		assert.notEqual(address,'');
	})
})

})