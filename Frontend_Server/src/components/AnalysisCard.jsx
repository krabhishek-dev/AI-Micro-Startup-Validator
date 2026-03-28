

const AnalysisCard = ({ title, content, score }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl shadow-lg text-white border border-white/20 hover:scale-105 transition">
      
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        {score !== undefined && (
          <span className="bg-blue-500 px-3 py-1 rounded-full text-sm">
            {score}/10
          </span>
        )}
      </div>

      <p className="text-gray-300">{content}</p>

    </div>
  );
};

 
export default AnalysisCard;