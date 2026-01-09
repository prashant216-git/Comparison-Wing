import { ArrowRight, Calendar, Clock, Plane } from "lucide-react";

// ---------------- FLIGHT CARD ----------------
  const FlightCard = ({ data }) => {
    const TimeBlock = ({ time, code }) => (
        <div className="text-center">
            <p className="text-lg font-bold">{time.split(" ")[0]}</p>
            <p className="text-[10px] text-slate-400">{time.split(" ")[1]}</p>
            <p className="text-xs bg-slate-100 px-2 rounded">{code}</p>
        </div>
    );

    const DurationBlock = ({ duration, stops }) => (
        <div className="flex flex-col items-center flex-1 px-2">
        <div className="flex items-center gap-1 text-[9px] text-slate-500">
            <Clock size={10} /> {duration}
        </div>

        <div className="w-full h-0.5 bg-slate-200 relative my-2">
            <Plane className="w-3 h-3 text-blue-500 absolute left-1/2 -translate-x-1/2 bg-white" />
        </div>

        <p className="text-[9px] text-slate-500">{stops}</p>
        </div>
    );

    const Tag = ({ text, color }) => (
        <span
        className={`text-[10px] px-2 py-0.5 rounded border ${
            color === "green"
            ? "bg-green-50 text-green-600 border-green-100"
            : "bg-blue-50 text-blue-600 border-blue-100"
        }`}
        >
        {text}
        </span>
    );
    return (
        <div
        className="w-full mb-4 bg-[#e2ece9] rounded-2xl p-4 shadow-sm border border-slate-100
        transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer"
        >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
            <div className="flex items-center gap-2">
            <div>
                <h4 className="text-sm font-bold">{data.airline}</h4>
                <p className="text-[10px] text-slate-400">{data.flightNumber}</p>
            </div>
            </div>

            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded text-[10px]">
            <Calendar size={10} /> {data.date}
            </div>
        </div>

        {/* Timings */}
        <div className="flex justify-between items-center mt-3">
            <TimeBlock time={data.departureTime} code={data.source} />
            <DurationBlock duration={data.duration} stops={data.stops} />
            <TimeBlock time={data.arrivalTime} code={data.destination} />
        </div>

        {/* Tags */}
        <div className="flex gap-2 mt-3">
            <Tag text="Refundable" color="green" />
            <Tag text={data.classType} color="blue" />
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t mt-2">
            <div>
            <p className="text-[10px] text-slate-400">Total Price</p>
            <p className="text-lg font-bold">{data.price}</p>
            </div>

            <button className="px-4 py-2 bg-slate-900 hover:bg-[#e2ece9]-700 text-white rounded-lg text-xs font-bold flex items-center gap-1">
            Book <ArrowRight size={12} />
            </button>
        </div>
        </div>
    )
};


export default FlightCard