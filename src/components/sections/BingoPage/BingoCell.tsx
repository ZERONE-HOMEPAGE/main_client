type Tier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'ruby';

const styles = {
  bronze: 'bg-[#9D4900]',
  silver: 'bg-[#9ea4ae]',
  gold: 'bg-[#FFB028]',
  platinum: 'bg-[#27E2A4]',
  diamond: 'bg-[#2BBFFF]',
  ruby: 'bg-[#E0004C]',
};

interface BingoProps {
  tier: number | null;
  problemId: string | number;
}

const getTierLabel = (tier: number | null): Tier => {
  if (!tier) return 'bronze';

  const TIERS: Tier[] = ['bronze', 'silver', 'gold', 'platinum', 'diamond', 'ruby'];

  return TIERS[Math.floor((tier - 1) / 5)] ?? 'bronze';
};

export default function BingoCell({ problemId, tier }: BingoProps) {
  const tierLabel = getTierLabel(tier);

  const ClickHandle = () => {
    window.open(`https://www.acmicpc.net/problem/${problemId}`, '_blank');
  };

  return (
    <div
      className={`flex aspect-square w-20 cursor-pointer items-center justify-center rounded-lg ${styles[tierLabel]} p-2`}
      onClick={ClickHandle}
    >
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-white">
        <p className="whitespace-nowrap text-center text-xs font-bold">{problemId} 번</p>
      </div>
    </div>
  );
}
