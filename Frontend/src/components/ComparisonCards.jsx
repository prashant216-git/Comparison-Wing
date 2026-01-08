import FlightCard from "./FlightCard";

function ComparisonCards({ title, data, color }) {
    return (
      <div className="flex flex-col">
        <div className="bg-white p-3 rounded-xl shadow border mb-3 flex justify-between items-center">
          <h3 className="font-semibold">{title}</h3>
          <span className="text-xs bg-slate-100 px-2 py-1 rounded">
            {data.length} options
          </span>
        </div>
        


        <div className="space-y-4">
          {data.map((flight) => (
            <FlightCard key={flight.id} data={flight} />
          ))}
        </div>
      </div>
    );
  }

export default ComparisonCards;