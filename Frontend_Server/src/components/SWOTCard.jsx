//SWOTCard.jsx 

const SWOTCard = ({ swot }) => {
  return (
    <div className="grid grid-cols-2 gap-4 text-white mt-6">

      <div className="bg-green-500/20 p-4 rounded-xl">
        <h3 className="font-bold mb-2">Strengths</h3>
        <ul>
          {swot.strengths.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </div>

      <div className="bg-red-500/20 p-4 rounded-xl">
        <h3 className="font-bold mb-2">Weaknesses</h3>
        <ul>
          {swot.weaknesses.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </div>

      <div className="bg-blue-500/20 p-4 rounded-xl">
        <h3 className="font-bold mb-2">Opportunities</h3>
        <ul>
          {swot.opportunities.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </div>

      <div className="bg-yellow-500/20 p-4 rounded-xl">
        <h3 className="font-bold mb-2">Threats</h3>
        <ul>
          {swot.threats.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default SWOTCard;