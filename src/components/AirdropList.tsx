"use client";

import React, { useState, FormEvent } from "react";
import { createMerkleTreeFromAllowList } from "@thirdweb-dev/react";

interface AirdropItem {
  address: string;
  maxClaimable: string;
}

const AirdropList: React.FC = () => {
  const [airdropList, setAirdropList] = useState<AirdropItem[]>([]);
  const [merkleRootHash, setMerkleRootHash] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const address = formData.get("address") as string;
    const maxClaimable = formData.get("maxClaimable") as string;

    setAirdropList((prevList) => [...prevList, { address, maxClaimable }]);
  };

  const handleGetMerkleTreeHash = async () => {
    if (airdropList.length > 0) {
      const merkleTree = await createMerkleTreeFromAllowList(airdropList);
      setMerkleRootHash(merkleTree.getHexRoot());
    }
  };

  return (
    <div className="flex justify-start gap-6">
      <div>
        <h3 className="text-lg">Airdrop List</h3>
        <form
          className="flex flex-col gap-2 pt-4 pb-2 items-start"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="address"
            placeholder="Address For Airdrop"
            className="border w-[300px] h-[30px]"
          />
          <input
            type="number"
            name="maxClaimable"
            placeholder="Claim Amount"
            className="border w-[300px] h-[30px]"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add address
          </button>
        </form>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={handleGetMerkleTreeHash}
        >
          Get Merkle Root Hash
        </button>
      </div>
      <div>
        <h3 className="pb-4">Allow list</h3>

        {airdropList?.map((item, key) => (
          <p key={`${item.address}-${key}`}>
            {item.address} - {item.maxClaimable} HIKARI
          </p>
        ))}
      </div>
      <div>
        <h3 className="pb-4">Merkle Root Hash</h3>
        {merkleRootHash && <p>{merkleRootHash}</p>}
      </div>
    </div>
  );
};

export default AirdropList;
