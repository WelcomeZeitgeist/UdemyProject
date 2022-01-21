pragma solidity ^0.8.10;

interface interfaceA{
        struct User {
           string name;
           string surname;
           uint age;
    }
        function getUser(uint _userMap) external view returns (User memory);
    }


contract contractA {
    struct User {
        string name;
        string surname;
        uint age;
    }

    mapping (uint => User) public userMapping;


    constructor () {
        User memory user1;
        user1 = User("Hans","Landa",21);

        User memory user2;
        user2 = User("Vincent","Vega",31);

        userMapping[0] = user1;
        userMapping[1] = user2;
    }

    function getUser(uint _userMap) external view returns (User memory){
        return userMapping[_userMap];

    }

    }

contract contractB {
    address addressA;

     struct UserB {
            string name;
            string surname;
            uint age;
     }

    



    function setAddressA(address _addressA) external {
        addressA = _addressA;
    }

    function callGetUser(uint _userMap) external view returns (UserB memory _user){
        interfaceA iA = interfaceA(addressA);

         _user = UserB(iA.getUser(_userMap).name,iA.getUser(_userMap).surname, iA.getUser(_userMap).age );

        return _user ;
    }
}
