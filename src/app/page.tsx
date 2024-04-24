import AirdropList from "@/components/AirdropList";

export default function Home() {
  return (
    <div className="flex justify-center py-16">
      <div className="w-full px-20">
        <h1 className="text-xl">Airdrop ERC-20 Claimable</h1>
        <div className="py-10">
          <AirdropList />
        </div>
      </div>
    </div>
  );
}
