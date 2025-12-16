"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CurrencyInput from "@/components/CurrencyInput";

export default function Register() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        age: "",
        gender: "",
        workStatus: "",
        loanAmount: "",
        loanAmountFormatted: ""
    });

    const [loading, setLoading] = useState(false);


    const submit = async () => {
        if (loading) return;

        if (!form.workStatus) {
            toast.error("Please select your work status");
            return;
        }
        if (form.age < 18) {
            alert("You must be at least 18 years old to register.");
            return;
        }

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
                        <div>
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

                    {/* Work Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Work Status
                        </label>
                        <select
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
                         bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            onChange={(e) =>
                                setForm({ ...form, workStatus: e.target.value })
                            }
                        >
                            <option value="">Select</option>
                            <option value="employed">Employed</option>
                            <option value="unemployed">Unemployed</option>
                            <option value="self-employed">Self-employed</option>
                        </select>
                    </div>

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


                </div>
                <div className="px-2">Already have an account <Link className="text-blue-700" href="/login">login</Link></div>

                {/* Submit */}
                <button
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
                </button>
            </div>
        </div>
    );
}
