// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.8.0;

contract MyFlag {

    struct Topic {
        string title;
        string content;
        address onwer;
        uint ts;
    }

    Topic[] public topics;

    function postTopic(string memory title, string memory content) public {
        require(bytes(title).length>0, "title error. ");
        require(bytes(content).length>0, "content error. ");

        topics.push(Topic(title, content, msg.sender, block.timestamp));
    }

    function getCount() public view returns(uint) {
        return topics.length;
    }
}
