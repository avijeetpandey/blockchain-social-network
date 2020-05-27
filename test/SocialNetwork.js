const SocialNetwork = artifacts.require('./SocialNetwork.sol');

// chai assertion library
require('chai').
    use(require('chai-as-promised')).
    should();

contract('SocialNetwork',(accounts)=>{
    let socialNetwork;

    before(async ()=>{
        socialNetwork = await SocialNetwork.deployed();
    });

    describe('deployment',async ()=>{
        it('Deployed succesfully',async ()=>{
            const address = await SocialNetwork.address;
            assert.notEqual(address,0x0);
            assert.notEqual(address,'');
            assert.notEqual(address,undefined);
            assert.notEqual(address,null);
        });

        it('has a name ',async ()=>{
            const name = await socialNetwork.name();
            assert.equal(name,'BlockChain Social Network');
        });
    })
});


