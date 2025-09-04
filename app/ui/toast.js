import { ServerCog, X, CircleCheck } from "lucide-react"

export default function ToastAlert({ stateVar, textColor, text, onClick, iconHint }) {
    return (<>

        <div className="toast toast-center p-1 bottom-5 z-50">
            <div
                className={`${stateVar === false ? "hidden" : ""} alert flex justify-between items-center gap-2 border-0 shadow-sm py-1.5 rounded-full bg-cyan-50 ${textColor}`}
            >
                {iconHint === "success" && <CircleCheck size={17} />}
                {iconHint === "internalerror" && <ServerCog size={17} />}

                <span className="text-xs">{text}</span>
                <button
                    onClick={onClick}
                    className="btn-xs btn-ghost rounded-full text-black"
                >
                    <X size={15} />
                </button>
            </div>
        </div>
    </>)
}