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
        address payable author; //hex address
    }

    event PostCreated(
        uint id,
        string content,
        uint tipAmount,
        address payable author
    );

    event PostTipped(
        uint id,
        string content,
        uint tipAmount,
        address payable author
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

    // function for tip posts
    function tipPost(uint _id) public payable{
        require(_id >0 && _id==postCount);
       // FETCH the post
        Post memory _post=posts[_id];
        address payable _author =  _post.author;
        address(_author).transfer(msg.value);
        // paying the author ethereum coins
        _post.tipAmount = _post.tipAmount + msg.value;
        posts[_id]=_post;
        // trigger the event
        emit PostTipped(postCount,_post.content,_post.tipAmount,_author);
    }

}
