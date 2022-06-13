const { expect } = require("chai");
const { ethers } = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("Voto contract", function () {

  let voto;
  let Voto;
  let owner;
  let addr1;
  let addr2; 

  beforeEach(async function(){
    Voto = await ethers.getContractFactory("Voto");
    [owner, addr1, addr2]=await ethers.getSigners();

    voto= await Voto.deploy()
  })

  describe("Deploy", function(){
    it("should set correctly the chairperson", async function(){
      expect( await voto.getChairPerson()).to.equal(owner.address)
    })
  })
  describe("add candidatos", function(){
    it("should return 1 candidato", async function(){
      const addCandidatoTx = await voto.addCandidatos("juan");
      await addCandidatoTx.wait()
      expect(await voto.getLengthCandidatos()).to.equal(1);
    })
    it("should not add a proposal", async function(){
      expect(voto.connect(addr1).addCandidatos("arturo")).to.revertedWith("no eres el administrador")
    })
  })
  describe("votar", function(){
    beforeEach(async function(){
      await voto.addCandidatos("test1")
      await voto.addCandidatos("test2")
      await voto.connect(addr1).votar(1)
    })
    it("should add 1 voto", async function(){
      await voto.connect(addr2).votar(0)
      expect(await voto.getVotosById(0)).to.equal(1);
    })
    it("should not add 1 voto", async function(){
      await expect(voto.connect(addr1).votar(0)).to.be.revertedWith("ya votaste");
    })
  })
});
