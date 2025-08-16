import { SCORE_VALUE } from "../../constants";

type ScoreBadgeProps = {
  score: number;
};

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  let badgeColor = "";
  let badgeText = "";

  if (score > SCORE_VALUE.high) {
    badgeColor = "bg-badge-green text-green-600";
    badgeText = "Strong";
  } else if (score > SCORE_VALUE.mid) {
    badgeColor = "bg-badge-yellow text-yellow-600";
    badgeText = "Good Start";
  } else {
    badgeColor = "bg-badge-red text-red-600";
    badgeText = "Needs Work";
  }
  return (
    <div className={`px-3 py-1 rounded-full ${badgeColor}`}>
      <p className="text-sm font-medium">{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;
