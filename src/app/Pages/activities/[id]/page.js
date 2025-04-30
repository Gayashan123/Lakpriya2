"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Correct import
import Link from "next/link"; // ✅ Correct import
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

export default function ActivityTracker() {
  const router = useRouter(); // ✅ Initialize router
  const [tableData, setTableData] = useState([
    {
      Item_No: "",
      Code_no: "",
      quantity: "",
   },
  ]);



  const [title, setTitle] = useState("");
  const [titleNo, setTitleNo] = useState("");
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [filteredSections, setFilteredSections] = useState([]);
  const [tableCount , settableCount] = useState(0);

  
  
  useEffect(() => {
    // Fetch existing activities from the database
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/activityid");
        const data = await response.json();
        setFilteredSections(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };
    fetchActivities();
  }, []);

  
  
  const addRowToTable = () => {
    setTableData((prev) => [
      ...prev,
      {
        Item_No: "",
        Code_no: "",
        description: "",
        unit: "",
        quantity: "",
        price: 0,
        amount: 0,
      },
    ]);
  };

  const updateTableData = (index, key, value) => {
    setTableData((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [key]: value } : row))
    );
  };

  const deleteRow = (index) => {
    setTableData((prev) => prev.filter((_, i) => i !== index));
  };

  const saveData = async () => {
    if (!title || !titleNo) {
      alert("Title and Title No are required");
      return;
    }

    try {
      const response = await fetch("/api/activityid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, title_no: titleNo, items: tableData }),
      });

      if (response.ok) {
        alert("Data saved successfully");
        setTableData([
          {
            Item_No: "",
            Code_no: "",
            description: "",
            unit: "",
            quantity: "",
            price: 0,
            amount: 0,
          },
        ]);
        setTitle("");
        setTitleNo("");
      } else {
        const result = await response.json();
        alert("Error saving data: " + result.message);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-grow">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold mb-8">Activity Tracker</h1>

          {/* Buttons */}
          <div className="mb-8">
            <button
              onClick={() => setIsTableVisible(true)}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg mr-4"
            >
              Add Table
            </button>

            <button
              className="bg-green-600 text-white px-8 py-4 rounded-lg"
              onClick={() => router.push("/pages/activities/tables")} // ✅ Dynamic navigation
            >
              Show Tables
            </button>
          </div>

          {/* Display Available Tables */}
          <div className="mb-8">
            {filteredSections.map((section) => (
              <Link
                key={section._id}
                href={`/pages/activities/tables/${section._id}`} // Ensure the dynamic part is correct
                passHref
              >
                <button className="bg-white text-gray-800 font-semibold py-4 px-6 rounded-lg shadow-xl m-2">
                  {section.name}
                </button>
              </Link>
            ))}
          </div>

          {/* Table Form */}
          {isTableVisible && (
            <>
              <div className="mb-8">
                <label className="block text-lg font-semibold mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded-lg mb-4"
                  placeholder="Enter Title"
                />
                <label className="block text-lg font-semibold mb-2">Title No</label>
                <input
                  type="text"
                  value={titleNo}
                  onChange={(e) => setTitleNo(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter Title No"
                />
              </div>

              {/* Table */}
              <table className="min-w-full bg-white shadow-md rounded-lg mb-8">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Item No</th>
                    <th className="py-2 px-4 border-b">Code No</th>
                    <th className="py-2 px-4 border-b">Quantity</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">
                        <input
                          type="text"
                          value={row.Item_No}
                          onChange={(e) =>
                            updateTableData(index, "Item_No", e.target.value)
                          }
                          className="w-full p-2 border rounded-lg"
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <input
                          type="text"
                          value={row.Code_no}
                          onChange={(e) =>
                            updateTableData(index, "Code_no", e.target.value)
                          }
                          className="w-full p-2 border rounded-lg"
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <input
                          type="text"
                          value={row.quantity}
                          onChange={(e) =>
                            updateTableData(index, "quantity", e.target.value)
                          }
                          className="w-full p-2 border rounded-lg"
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => deleteRow(index)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                onClick={addRowToTable}
                className="bg-green-600 text-white px-8 py-4 rounded-lg mb-8"
              >
                Add Row
              </button>
              <button
                onClick={saveData}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg"
              >
                Save Data
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
