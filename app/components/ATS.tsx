type ATSProps = {
  score: Feedback["ATS"]["score"];
  suggestions: Feedback["ATS"]["tips"];
};

const ATS = ({ score, suggestions }: ATSProps) => {
  return <div>ATS</div>;
};

export default ATS;
