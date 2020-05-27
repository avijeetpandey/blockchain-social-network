pragma solidity ^0.5.0;

contract SocialNetwork{

    string public name;
    uint public postCount=0;
    constructor() public{
        name="BlockChain Social Network";
    }

    //key value store to write data into blockchain
    mapping(uint => Post) public posts;

    // struct for the post
    struct Post{
        uint id; //unsigned integer
        string content;
        uint tipAmount;
        address author; //hex address
    }

    event PostCreated(
        uint id,
        string content,
        uint tipAmount,
        address author
    );

    // function to create posts
    function createPost(string memory _content) public {
        // require valid _content
        require(bytes(_content).length > 0);  // returns true or false
        postCount++;
    // msg is a special global variable
        posts[postCount]=  Post(postCount,_content,0,msg.sender);   // mapping to the posts map declared above
        // Events
        emit PostCreated(postCount,_content,0,msg.sender);
    }

}
