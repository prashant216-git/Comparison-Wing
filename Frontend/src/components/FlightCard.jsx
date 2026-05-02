import { ArrowRight, Calendar, Clock, Plane } from "lucide-react";

const FlightCard = ({ data, onAdd }) => {

    const TimeBlock = ({ time, code }) => (
        <div className="text-center min-w-[60px]">
            <p className="text-lg font-bold text-slate-800">
                {time.split(" ")[0]}
            </p>
            <p className="text-[10px] text-slate-400">
                {time.split(" ")[1]}
            </p>
            <p className="text-[10px] mt-1 bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                {code}
            </p>
        </div>
    );

    const DurationBlock = ({ duration, stops }) => (
        <div className="flex flex-col items-center flex-1 px-3">

            <div className="flex items-center gap-1 text-[10px] text-slate-500">
                <Clock size={11} /> {duration}
            </div>

            {/* flight path */}
            <div className="relative w-full my-2">
                <div className="h-[2px] bg-gradient-to-r from-slate-200 via-blue-200 to-slate-200 rounded-full" />

                <Plane className="w-3.5 h-3.5 text-blue-500 absolute top-[-6px] left-1/2 -translate-x-1/2 bg-white rounded-full" />
            </div>

            <p className="text-[10px] text-slate-500">
                {stops}
            </p>
        </div>
    );

    const Tag = ({ text, color }) => (
        <span
            className={`text-[10px] px-2 py-1 rounded-full border ${
                color === "green"
                    ? "bg-green-50 text-green-600 border-green-100"
                    : "bg-blue-50 text-blue-600 border-blue-100"
            }`}
        >
            {text}
        </span>
    );

    return (
        <div className="w-full mb-4 bg-white rounded-2xl p-5 shadow-sm border border-slate-100
            transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

            {/* HEADER */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">

                <div>
                    <h4 className="text-sm font-bold text-slate-800">
                        {data.airline}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                        {data.flightNumber}
                    </p>
                </div>

                <div className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full text-[10px] text-slate-600">
                    <Calendar size={11} /> {data.date}
                </div>

            </div>

            {/* BODY */}
            <div className="flex justify-between items-center mt-4">

                <TimeBlock time={data.departureTime} code={data.source} />

                <DurationBlock
                    duration={data.duration}
                    stops={data.stops}
                />

                <TimeBlock time={data.arrivalTime} code={data.destination} />

            </div>

            {/* TAGS */}
            <div className="flex gap-2 mt-4">
                <Tag text="Refundable" color="green" />
                <Tag text={data.classType} color="blue" />
            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-center pt-4 mt-3 border-t border-slate-100">

                <div>
                    <p className="text-[11px] text-slate-400">
                        Total Price
                    </p>
                    <p className="text-xl font-bold text-slate-900">
                        {data.price}
                    </p>
                </div>

                <button
                    onClick={() => onAdd(data)}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600
                    hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl
                    text-xs font-semibold flex items-center gap-2 shadow-md
                    transition-all hover:scale-105"
                >
                    Add to Cart <ArrowRight size={14} />
                </button>

            </div>

        </div>
    );
};

export default FlightCard;