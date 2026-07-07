"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, Download, LogOut } from "lucide-react";

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  location?: string;
  website?: string;
  source?: string;
  services?: string[];
  budget?: string;
  message?: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");

    if (isAdmin !== "true") {
      router.push("/admin/login");
      return;
    }

    fetchLeads();
  }, [router]);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads");

      if (!res.ok) {
        throw new Error("Failed to fetch leads");
      }

      const json = await res.json();
      setLeads(json.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/admin/login");
  };

  const downloadCSV = () => {
    const headers = [
      "No",
      "Name",
      "Email",
      "Phone",
      "Location",
      "Website",
      "Source",
      "Services",
      "Budget",
      "Message",
      "Date",
    ];

    const rows = leads.map((lead, index) => [
      `"${index + 1}"`,
      `"${(lead.name || "").replace(/"/g, '""')}"`,
      `"${(lead.email || "").replace(/"/g, '""')}"`,
      `"${(lead.phone || "").replace(/"/g, '""')}"`,
      `"${(lead.location || "").replace(/"/g, '""')}"`,
      `"${(lead.website || "").replace(/"/g, '""')}"`,
      `"${(lead.source || "").replace(/"/g, '""')}"`,
      `"${(lead.services && lead.services.length > 0 ? lead.services.join(", ") : "").replace(/"/g, '""')}"`,
      `"${(lead.budget || "").replace(/"/g, '""')}"`,
      `"${(lead.message || "").replace(/"/g, '""')}"`,
      `"${new Date(lead.createdAt).toLocaleString()}"`,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `leads_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            {!loading && (
              <p className="text-zinc-400 mt-1">
                {leads.length} lead{leads.length !== 1 ? "s" : ""} found
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={downloadCSV}
              disabled={leads.length === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Download size={18} />
              Download CSV
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-800">
                  <th className="p-3 text-left text-white font-semibold whitespace-nowrap">#</th>
                  <th className="p-3 text-left text-white font-semibold whitespace-nowrap">Name</th>
                  <th className="p-3 text-left text-white font-semibold whitespace-nowrap">Email</th>
                  <th className="p-3 text-left text-white font-semibold whitespace-nowrap">Phone</th>
                  <th className="p-3 text-left text-white font-semibold whitespace-nowrap">Location</th>
                  <th className="p-3 text-left text-white font-semibold whitespace-nowrap">Website</th>
                  <th className="p-3 text-left text-white font-semibold whitespace-nowrap">Source</th>
                  <th className="p-3 text-left text-white font-semibold whitespace-nowrap">Services</th>
                  <th className="p-3 text-left text-white font-semibold whitespace-nowrap">Budget</th>
                  <th className="p-3 text-left text-white font-semibold whitespace-nowrap">Message</th>
                  <th className="p-3 text-left text-white font-semibold whitespace-nowrap">Date</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={11} className="p-10 text-center text-zinc-400">
                      <div className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5 text-blue-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Loading leads...
                      </div>
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="p-10 text-center text-zinc-400">
                      No leads found
                    </td>
                  </tr>
                ) : (
                  leads.map((lead, index) => (
                    <tr
                      key={lead._id}
                      className="border-t border-zinc-800 hover:bg-zinc-800/40 transition-colors"
                    >
                      {/* # */}
                      <td className="p-3 text-zinc-500">
                        {index + 1}
                      </td>

                      {/* Name */}
                      <td className="p-3 text-white font-medium whitespace-nowrap">
                        {lead.name || "-"}
                      </td>

                      {/* Email */}
                      <td className="p-3 text-zinc-300">
                        <div className="flex items-center gap-1">
                          <Mail size={13} className="text-zinc-500 shrink-0" />
                          <span className="truncate max-w-[160px]">{lead.email || "-"}</span>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="p-3 text-zinc-300 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Phone size={13} className="text-zinc-500 shrink-0" />
                          {lead.phone || "-"}
                        </div>
                      </td>

                      {/* Location */}
                      <td className="p-3 text-zinc-300 whitespace-nowrap">
                        {lead.location || "-"}
                      </td>

                      {/* Website */}
                      <td className="p-3 text-zinc-300">
                        {lead.website ? (
                          <a
                            href={
                              lead.website.startsWith("http")
                                ? lead.website
                                : `https://${lead.website}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline truncate max-w-[120px] block"
                          >
                            {lead.website}
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>

                      {/* Source */}
                      <td className="p-3 text-zinc-300 whitespace-nowrap">
                        {lead.source ? (
                          <span className="px-2 py-0.5 rounded-full bg-zinc-700 text-xs text-zinc-200">
                            {lead.source}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>

                      {/* Services */}
                      <td className="p-3 text-zinc-300 max-w-[200px]">
                        {lead.services && lead.services.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {lead.services.map((s, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-full bg-green-900/50 text-green-300 text-xs whitespace-nowrap"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>

                      {/* Budget */}
                      <td className="p-3 text-zinc-300 whitespace-nowrap">
                        {lead.budget ? (
                          <span className="px-2 py-0.5 rounded-full bg-purple-900/50 text-purple-300 text-xs">
                            {lead.budget}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>

                      {/* Message */}
                      <td className="p-3 text-zinc-300 max-w-[180px]">
                        <span
                          title={lead.message || ""}
                          className="block truncate"
                        >
                          {lead.message || "-"}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="p-3 text-zinc-400 whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}