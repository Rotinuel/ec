"use client";
import { useState } from "react";

export default function CurrencyInput({
  label = "Amount",
  value,
  onChange,
  min = 10000,
}) {
  const [isFocused, setIsFocused] = useState(false);

  // Format number → ₱50,000.00
  const formatCurrency = (num) => {
    if (!num) return "";
    const number = Number(num);
    return "₱ " + number.toLocaleString("en-PH", {
      style: "currency",
      minimumFractionDigits: 2,
    });
  };

  // Format while typing → 50,000 (NO ₱, NO decimals)
  const formatTyping = (num) => {
    if (!num) return "";
    return "₱ " + Number(num).toLocaleString("en-PH");
  };

  // Remove formatting → "50000"
  const unformat = (val) => val.replace(/[^0-9]/g, "");

  const handleChange = (e) => {
    const raw = unformat(e.target.value);

    onChange({
      raw,
      formatted: isFocused ? formatTyping(raw) : formatCurrency(raw),
    });
  };

  const handleBlur = () => {
    setIsFocused(false);

    const raw = unformat(value);
    onChange({
      raw,
      formatted: formatCurrency(raw),
    });
  };

  const handleFocus = () => {
    setIsFocused(true);

    const raw = unformat(value);
    onChange({
      raw,
      formatted: formatTyping(raw),
    });
  };

  // ✅ Define rawValue here for min validation
  const rawValue = Number(unformat(value))

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-600">{label}</label>

      <div className="relative">
        {/* ₱ Icon */}
        {!isFocused && value && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            ₱
          </span>
        )}

        <input
          type="number"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`w-full border border-gray-300 rounded-lg ${!isFocused && value ? "pl-8" : "pl-3"
            } pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
          placeholder="10,000"
        />
      </div>
      {/* ✅ Min validation message */}
      {rawValue > 0 && rawValue < min && (
        <p className="text-red-500 text-xs">
          Minimum amount is ₱ {min.toLocaleString("en-PH")}
        </p>
      )}
    </div>
  );
}
