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

        before(async()=>{
            result =await socialNetwork.createPost("This is my first post",{
                from :author
            });
            postCount = await socialNetwork.postCount();
        });

        it('creates post',async()=>{
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
            const post=await socialNetwork.posts(postCount);
            assert.equal(post.id.toNumber(),postCount.toNumber(),'id is correct');
            assert.equal(post.content,"This is my first post",'content is correct');
            assert.equal(post.tipAmount,0,'tip amount is correct');
            assert.equal(post.author,author,'author is correct');
        });

        //test for post payment
        it('allows user to tip posts',async()=>{

            // Checking author balance before and after transcation to make sure transcation is processed
            let oldBalance ;
            oldBalance = await web3.eth.getBalance(author);
            oldBalance = new web3.utils.BN(oldBalance);

            result=await socialNetwork.tipPost(postCount,{
                from : tipper,
                value: web3.utils.toWei('1','Ether')
            });

            // SUCCESS case
            const event=result.logs[0].args;
            assert.equal(event.id.toNumber(),postCount.toNumber(),'id is correct');
            assert.equal(event.content,"This is my first post",'content is correct');
            assert.equal(event.tipAmount,'1000000000000000000','tip amount is correct');
            assert.equal(event.author,author,'author is correct');

            // checking of author recieved new balance
            let newBalance;
            newBalance= await web3.eth.getBalance(author);
            newBalance = new web3.utils.BN(newBalance);

            let tipAmount = web3.utils.toWei('1','Ether');
            tipAmount=new web3.utils.BN(tipAmount);

            const expectedBalance = oldBalance.add(tipAmount);
            assert.equal(newBalance.toString(),expectedBalance.toString());

            //Failure test case
            await socialNetwork.tipPost(99,{
                from:tipper,
                value:web3.utils.toWei('1','Ether')
            }).should.be.rejected;
        });
    });

});


