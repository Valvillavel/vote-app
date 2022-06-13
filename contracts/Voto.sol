//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract Voto{
    struct Candidato{
        string name;
        uint cantVotos;
    }
    struct Votante{
        bool votado;
        uint vote;
    }

    address chairperson;

    Candidato[] public candidatos;

    mapping(address => Votante) public votantes;

    constructor(){
        chairperson = msg.sender;
    }

    modifier onlyAdmin(){
        require(msg.sender == chairperson,"no eres el administrador");
        _;
    }
    modifier onlyOneVote(){
        Votante storage sender = votantes[msg.sender];
        require(!sender.votado, "ya votaste");
        _;
    }
    function addCandidatos(string memory _name) public onlyAdmin{
        candidatos.push(Candidato({
            name: _name,
            cantVotos:0
        }));
    }
    function votar(uint32 index) public onlyOneVote{
        Votante storage sender = votantes[msg.sender];
        sender.votado=true;
        sender.vote=index;
        candidatos[index].cantVotos += 1;
    }
    function getChairPerson() public view returns (address) {
    return chairperson;
    }
    function getLengthCandidatos() public view returns(uint256){
        return candidatos.length;
    }
    function getVotosById(uint index) public view returns(uint256){
        return candidatos[index].cantVotos;
    }
    function getCandidatos() public view returns(Candidato[] memory){
        return candidatos;
    }
}

