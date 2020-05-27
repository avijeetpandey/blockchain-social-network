const SocialNetwork = artifacts.require('./SocialNetwork.sol');

// chai assertion library
require('chai').
    use(require('chai-as-promised')).
    should();

contract('SocialNetwork',([deployer , author , tipper])=>{
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
    });

    describe('posts',async ()=>{
        let result , postCount;
        // test for create posts
        it('creates post',async()=>{
            result =await socialNetwork.createPost("This is my first post",{
                from :author
            });
            postCount = await socialNetwork.postCount();

            //success case
            assert.equal(postCount,1);
            const event=result.logs[0].args;
            assert.equal(event.id.toNumber(),postCount.toNumber(),'id is correct');
            assert.equal(event.content,"This is my first post",'content is correct');
            assert.equal(event.tipAmount,0,'tip amount is correct');
            assert.equal(event.author,author,'author is correct');

            //case of failure
            await socialNetwork.createPost("",{
                from :author
            }).should.be.rejected;
        });

        // test for lists posts
        it('list posts',async()=>{

        });

        //test for post payment
        it('allows user to tip posts',async()=>{

        });

    });

});


