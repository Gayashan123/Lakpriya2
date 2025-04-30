"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation"; // ✅ Import to get dynamic ID
import Navbar from "../../../../components/navbar";
import Footer from "../../../../components/footer";

export default function ActivityTable() {
  const { id } = useParams(); // ✅ Get dynamic ID from the URL
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchTableData = async () => {
      try {
        const response = await fetch(`/api/activityid/${id}`); // ✅ Fetch the specific table
        if (!response.ok) throw new Error("Failed to fetch table data");

        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error("Error fetching table:", error);
      }
    };

    fetchTableData();
  }, [id]);

  if (!tableData) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-grow container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">{tableData.title}</h1>
        <h2 className="text-xl font-semibold mb-4">Title No: {tableData.title_no}</h2>

        {/* Table Display */}
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Item No</th>
              <th className="py-2 px-4 border-b">Code No</th>
              <th className="py-2 px-4 border-b">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {tableData.items.map((row, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{row.Item_No}</td>
                <td className="py-2 px-4 border-b">{row.Code_no}</td>
                <td className="py-2 px-4 border-b">{row.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}
