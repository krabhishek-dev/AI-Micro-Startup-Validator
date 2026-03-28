//

const ChartBox = ({ data }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl text-white mt-6">
      
      <h3 className="text-xl font-semibold mb-4">Analysis Overview</h3>

      {Object.entries(data).map(([key, value], i) => (
        <div key={i} className="mb-4">
          
          <div className="flex justify-between text-sm mb-1">
            <span className="capitalize">{key}</span>
            <span>{value}/10</span>
          </div>

          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              style={{ width: `${value * 10}%` }}
            />
          </div>

        </div>
      ))}

    </div>
  );
};

export default ChartBox;