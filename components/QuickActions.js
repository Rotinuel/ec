// "use client";

// import { CreditCard, FileText } from "lucide-react";
// import { toast } from "react-hot-toast";
// import BankAction from "@/components/BankSelect";

// function ActionBtn({ icon, label, sub, onClick }) {
//     return (
//         <button
//             onClick={onClick}
//             className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-2xl w-full text-left hover:border-blue-300 hover:shadow-md transition-all active:scale-[0.98]"
//         >
//             <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
//                 {icon}
//             </div>
//             <div>
//                 <p className="text-sm font-bold text-slate-800">{label}</p>
//                 <p className="text-xs text-slate-400">{sub}</p>
//             </div>
//         </button>
//     );
// }

// export default function QuickActions() {
//     return (
//         <div className="space-y-4">
//             <ActionBtn
//                 icon={<CreditCard className="text-blue-600" />}
//                 label="Make Payment"
//                 sub="Pay using Card or Bank"
//                 onClick={() =>
//                     toast("No payment yet", { duration: 3000 })
//                 }
//             />

//             <BankAction />

//             <ActionBtn
//                 icon={<FileText className="text-blue-600" />}
//                 label="Download Statement"
//                 sub="Check for better rates"
//                 onClick={() => toast("Statement not available yet")}
//             />
//         </div>
//     );
// }


"use client";

import { useState } from "react";
import { CreditCard, FileText } from "lucide-react";
import BankAction from "@/components/BankSelect";
import NoPaymentModal from "@/components/NoPaymentModal";

function ActionBtn({ icon, label, sub, onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-2xl w-full text-left hover:border-blue-300 hover:shadow-md transition-all active:scale-[0.98]"
        >
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                {icon}
            </div>
            <div>
                <p className="text-sm font-bold text-slate-800">{label}</p>
                <p className="text-xs text-slate-400">{sub}</p>
            </div>
        </button>
    );
}

export default function QuickActions() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <ActionBtn
                icon={<CreditCard className="text-blue-600" />}
                label="Make Payment"
                sub="Pay using Card or Bank"
                onClick={() => setShowModal(true)}
            />

            <BankAction />

            <ActionBtn
                icon={<FileText className="text-blue-600" />}
                label="Download Statement"
                sub="Check for better rates"
                onClick={() => setShowModal(true)}
            />

            <NoPaymentModal
                open={showModal}
                onClose={() => setShowModal(false)}
            />
        </>
    );
}
