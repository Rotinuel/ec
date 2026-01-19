"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Autocomplete from "react-google-autocomplete";
import CurrencyInput from "@/components/CurrencyInput";

export default function Register() {
    const router = useRouter();

    const [step, setStep] = useState(1);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        dateOfBirth: "",
        gender: "",
        workStatus: "",
        workStatusOther: "",
        loanType: "",
        loanAmount: "",
        loanAmountFormatted: "",
        interestRate: 5,
        repaymentMonths: "",
        address: "",
        latitude: null,
        longitude: null,
        idDocument: null,
    });

    const [loading, setLoading] = useState(false);

    // const calculateAge = (dob) => {
    //     if (!dob) return 0;
    //     const birthDate = new Date(dob);
    //     const today = new Date();

    //     let age = today.getFullYear() - birthDate.getFullYear();
    //     const m = today.getMonth() - birthDate.getMonth();

    //     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    //         age--;
    //     }

    //     return age;
    // };

    const goToStep2 = () => {
        if (!form.name || !form.email || !form.password || !form.dateOfBirth || !form.gender || !form.workStatus || !form.loanType || !form.loanAmount || !form.loanAmountFormatted || !form.interestRate || !form.repaymentMonths) {
            toast.error("Please fill all required fields");
            return;
        }
        if (form.workStatus === "Others" && !form.workStatusOther) {
            toast.error("Please specify your work status");
            return;
        }
        if (!form.dateOfBirth) {
            toast.error("Date of birth is required");
            return;
        }

        // const age = calculateAge(form.dateOfBirth);
        // if (age < 18) {
        //     toast.error("You must be at least 18 years old");
        //     return;
        // }
        setStep(2)
    }


    const submit = async () => {
        if (loading) return;

        setLoading(true);

        const res = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(form),
            headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();

        if (!res.ok) {
            toast.error(data.error || "Registration failed");
            setLoading(false);
            return;
        }

        toast.success("Account created successfully!");

        // ✅ Auto-login
        const loginRes = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email: form.email,
                password: form.password
            }),
            headers: { "Content-Type": "application/json" }
        });

        if (loginRes.ok) {
            toast.success("Logged in!");
            router.push("/dashboard");
        } else {
            router.push("/login");
        }

        setLoading(false);
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#9dc5f5] to-[#b3a6e8] px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">

                <h1 className="text-2xl font-semibold text-center text-gray-800">
                    Create an Evercrest Account
                </h1>
                {step === 1 && (
                    <>
                        <div className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Full Name
                                </label>
                                <input
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="John Doe"
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="example@email.com"
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="••••••••"
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                />
                            </div>

                            {/* Age & Gender */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Age
                                    </label>
                                    <input
                                        type="number"
                                        min="18"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        placeholder="25"
                                        onChange={(e) => setForm({ ...form, age: e.target.value })}
                                    />
                                </div> */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        placeholder="DD/MM/YYYY"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" value={form.dateOfBirth}
                                        onChange={(e) => {
                                            let value = e.target.value.replace(/\D/g, "");

                                            if (value.length >= 3) {
                                                value = value.slice(0, 2) + "/" + value.slice(2);
                                            }
                                            if (value.length >= 6) {
                                                value = value.slice(0, 5) + "/" + value.slice(5, 9);
                                            }
                                            // Logic to handle the string input
                                            setForm({ ...form, dateOfBirth: e.target.value });
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Gender
                                    </label>
                                    <select
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
                           bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        onChange={(e) => setForm({ ...form, gender: e.target.value })}
                                    >
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Residential Address
                                </label>

                                <Autocomplete
                                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                                    onPlaceSelected={(place) => {
                                        setForm({
                                            ...form,
                                            address: place.formatted_address,
                                            latitude: place.geometry.location.lat(),
                                            longitude: place.geometry.location.lng(),
                                        });
                                    }}
                                    options={{
                                        types: ["address"],
                                        componentRestrictions: { country: "ng" }, // Nigeria
                                    }}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
      focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Enter your address"
                                />
                            </div>


                            {/* Work Status */}
                            {/* <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Employment Status
                                </label>

                                {["Employed", "Self Employed", "Retired", "Others"].map((status) => (
                                    <label key={status} className="flex items-center gap-2 text-sm">
                                        <input
                                            type="radio"
                                            name="workStatus"
                                            value={status}
                                            onChange={(e) =>
                                                setForm({ ...form, workStatus: e.target.value })
                                            }
                                        />
                                        {status}
                                    </label>
                                ))}

                                {form.workStatus === "Others" && (
                                    <input
                                        className="mt-2 w-full border rounded-lg px-3 py-2 text-sm"
                                        placeholder="Specify"
                                        onChange={(e) =>
                                            setForm({ ...form, workStatusOther: e.target.value })
                                        }
                                    />
                                )}
                            </div>  */}

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Employment Status
                                </label>

                                <select
                                    name="workStatus"
                                    value={form.workStatus}
                                    onChange={(e) =>
                                        setForm({ ...form, workStatus: e.target.value })
                                    }
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select employment status</option>
                                    {["employed", "self-employed", "retired", "unemployed", "others"].map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>

                                {form.workStatus === "Others" && (
                                    <input
                                        className="mt-2 w-full border rounded-lg px-3 py-2 text-sm"
                                        placeholder="Specify"
                                        value={form.workStatusOther || ""}
                                        onChange={(e) =>
                                            setForm({ ...form, workStatusOther: e.target.value })
                                        }
                                    />
                                )}
                            </div>


                            <label className="block text-sm">
                                Loan Type
                                <select
                                    name="loanType"
                                    value={form.loanType}
                                    onChange={(e) =>
                                        setForm({ ...form, loanType: e.target.value })
                                    }
                                    className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select loan type</option>
                                    {[
                                        "Personal Loan",
                                        "Business Loan",
                                        "Auto Loan",
                                        "Home Loan",
                                        "Debt Consolidation",
                                        "Student Loan",
                                    ].map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </label>



                            {/* <CurrencyInput
                        label="Loan Amount"
                        min={10000}
                        value={form.loanAmountFormatted}
                        onChange={({ raw, formatted }) =>
                            setForm({
                                ...form,
                                loanAmount: raw,
                                loanAmountFormatted: formatted,
                            })
                        }
                    /> */}

                            <div className="p-4 space-y-3">
                                {/* <h3 className="font-semibold text-gray-700">Loan Calculator</h3> */}

                                <CurrencyInput
                                    label="Loan Amount"
                                    min={10000}
                                    value={form.loanAmountFormatted}
                                    onChange={({ raw, formatted }) =>
                                        setForm({
                                            ...form,
                                            loanAmount: raw,
                                            loanAmountFormatted: formatted,
                                        })
                                    }
                                />

                                <div>
                                    <label className="text-sm">Interest Rate</label>
                                    <input
                                        disabled
                                        value="5%"
                                        className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm">Repayment Period (months)</label>
                                    <input
                                        type="number"
                                        className="w-full border rounded-lg px-3 py-2"
                                        onChange={(e) =>
                                            setForm({ ...form, repaymentMonths: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="mt-2 p-2 bg-green-50 rounded-lg text-green-700 font-medium">
                                    Total Repayment:{" "}
                                    <span>
                                        ₱
                                        {form.loanAmount && form.repaymentMonths
                                            ? (
                                                form.loanAmount *
                                                (1 + form.interestRate / 100)
                                            ).toLocaleString()
                                            : " 0"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={goToStep2}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg"
                        >
                            Next
                        </button>
                    </>
                )}

                {step === 2 && (
                    <>
                        {/* <label>Government Issued ID</label>
                        <input
                            type="file"
                            onChange={(e) =>
                                setForm({ ...form, idDocument: e.target.files[0] })
                            }
                        />

                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep(1)}
                                className="w-full bg-gray-300 py-2 rounded-lg"
                            >
                                Back
                            </button>

                            <button
                                onClick={submit}
                                disabled={loading}
                                className="w-full bg-green-600 text-white py-2 rounded-lg"
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </div> */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Government Issued ID
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setForm({ ...form, idDocument: e.target.files[0] })
                                    }
                                    className="block w-full text-sm text-gray-600
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-gray-200 file:text-gray-700
                       hover:file:bg-gray-300
                       focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setStep(1)}
                                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 rounded-lg transition"
                                >
                                    Back
                                </button>

                                <button
                                    onClick={submit}
                                    disabled={loading}
                                    className={`flex-1 text-white font-medium py-2 rounded-lg transition
                ${loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
                                >
                                    {loading ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </div>

                    </>
                )}



                {/* <div className="px-2">Already have an account <Link className="text-blue-700" href="/login">login</Link></div> */}

                {/* Submit */}
                {/* <button
                    onClick={submit} diabled={loading}
                    className={`w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium
                     hover:bg-blue-700 active:scale-[0.98] transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Processing...
                        </div>
                    ) : (
                        "Register"
                    )}
                </button> */}
                {/* <button
                    onClick={() => setStep(2)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg"
                >
                    Next
                </button>

                {step === 2 && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-center">
                            Verification
                        </h2>

                        <div>
                            <label className="text-sm">Government Issued ID</label>
                            <input type="file" className="w-full" />
                        </div>

                        <div>
                            <label className="text-sm">
                                Bank Statement / Utility Bill
                            </label>
                            <input type="file" className="w-full" />
                        </div>

                        <button
                            onClick={submit}
                            className="w-full bg-green-600 text-white py-2 rounded-lg"
                        >
                            Submit Application
                        </button>
                    </div>
                )} */}


            </div>
        </div>
    );
}
