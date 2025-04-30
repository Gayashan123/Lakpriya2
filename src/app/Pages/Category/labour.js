'use client';

import React, { useState, useEffect } from "react";

export default function Labour() {
  const [labourData, setLabourData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadLabourData();
  }, []);

  const loadLabourData = async () => {
    try {
      const response = await fetch("/api/labour_rate");
      const result = await response.json();
      if (response.ok) {
        setLabourData(result);
      } else {
        setLabourData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLabourData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addLabour = () => {
    const newItemNo = labourData.length + 1;
    const newCodeNo = `L-${String(newItemNo).padStart(3, "0")}`;
    const newLabour = {
      _id: "temp-" + newItemNo,
      Item_No: newItemNo,
      description: "",
      Code_no: newCodeNo,
      unit: "Day",
      price: "",
      isNew: true,
    };
    setLabourData([...labourData, newLabour]);
    setHasChanges(true);
  };

  const updateLabour = (id, key, value) => {
    setLabourData((prev) =>
      prev.map((labour) =>
        labour._id === id ? { ...labour, [key]: value } : labour
      )
    );
    setHasChanges(true);
  };

  const saveData = async () => {
    if (labourData.some((labour) => !labour.description || !labour.Code_no || !labour.unit || !labour.price)) {
      alert("Please fill all fields before saving.");
      return;
    }

    try {
      const formattedData = labourData.map(({ isNew, _id, ...rest }) => rest);
      const response = await fetch("/api/labour_rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Data saved successfully!");
        loadLabourData();
        setHasChanges(false);
      } else {
        alert("Failed to save: " + result.message);
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Error saving data");
    }
  };

  const deleteRow = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this labour rate?");
    if (!confirmDelete) return;
    
    if (!id.startsWith("temp-")) {
      try {
        const response = await fetch("/api/labour_rate", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Failed to delete");
      } catch (error) {
        console.error("Error deleting:", error);
        alert("Error deleting labour rate");
        return;
      }
    }
    setLabourData((prev) => prev.filter((labour) => labour._id !== id));
    setHasChanges(true);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center my-4 bg-gray-800 text-white py-2 rounded-lg">Labour Table</h1>
      
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 w-full"
        />
        <button className="ml-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Search</button>
      </div>
      
      <button onClick={addLabour} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
        Add Labour
      </button>

      {hasChanges && (
        <button onClick={saveData} className="ml-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
          Save Changes
        </button>
      )}

      {isLoading ? (
        <div className="text-center">
          <div className="animate-spin border-t-4 border-blue-600 border-solid w-12 h-12 rounded-full mx-auto"></div>
          <p className="mt-4 text-xl text-gray-700">Loading data...</p>
        </div>
      ) : (
        <table className="w-full mt-4 border bg-white shadow-md">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="p-3">Item No</th>
              <th className="p-3">Code No</th>
              <th className="p-3">Description</th>
              <th className="p-3">Unit</th>
              <th className="p-3">Price (Rs.)</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {labourData.filter(labour => labour.description.toLowerCase().includes(searchTerm.toLowerCase())).map((labour) => (
              <tr key={labour._id} className="border-b text-center hover:bg-gray-200">
                <td className="p-3">{labour.Item_No}</td>
                <td className="p-3">{labour.Code_no}</td>
                <td className="p-3">
                  <input
                    type="text"
                    value={labour.description}
                    onChange={(e) => updateLabour(labour._id, "description", e.target.value)}
                    className="border p-2 w-full"
                  />
                </td>
                <td className="p-3">{labour.unit}</td>
                <td className="p-3">
                  <input
                    type="number"
                    value={labour.price}
                    onChange={(e) => updateLabour(labour._id, "price", e.target.value)}
                    className="border p-2 w-full"
                  />
                </td>
                <td className="p-3">
                  <button onClick={() => deleteRow(labour._id)} className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}