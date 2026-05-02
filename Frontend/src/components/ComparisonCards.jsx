import FlightCard from "./FlightCard";

function ComparisonCards({ title, data = [], color = "blue", onAdd }) {
  return (
    <div className="flex flex-col gap-4">

      {/* HEADER */}
      <div className="relative overflow-hidden p-4 rounded-2xl shadow-md border border-slate-100 bg-gradient-to-r from-white to-slate-50">

        <div className="flex justify-between items-center">

          <h3 className="text-lg font-semibold text-slate-800">
            {title}
          </h3>

          <span className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
            {data.length} options
          </span>

        </div>

        {/* decorative bar */}
        <div className={`absolute bottom-0 left-0 h-1 w-full bg-${color}-500 opacity-20`} />

      </div>

      {/* EMPTY STATE */}
      {data.length === 0 && (
        <div className="p-6 text-center text-slate-500 border rounded-2xl bg-white">
          No flights found ✈️
        </div>
      )}

      {/* FLIGHT LIST */}
      <div className="flex flex-col gap-4">
        {data.map((flight, index) => (
          <div
            key={flight.id ?? index}
            className="transform transition-all duration-200 hover:-translate-y-0.5"
          >
            <FlightCard data={flight} onAdd={onAdd} />
          </div>
        ))}
      </div>

    </div>
  );
}

export default ComparisonCards;