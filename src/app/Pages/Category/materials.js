"use client";

import React, { useState, useEffect } from "react";

export default function Materials() {
  const [materialsData, setMaterialsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadMaterialsData();
  }, []);

  const loadMaterialsData = async () => {
    try {
      const response = await fetch("/api/material_rate");
      const result = await response.json();
      if (response.ok) {
        setMaterialsData(result);
      } else {
        setMaterialsData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMaterialsData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addMaterial = () => {
    const newItemNo = materialsData.length + 1;
    const newCodeNo = `M-${String(newItemNo).padStart(3, "0")}`;
    const newMaterial = {
      _id: "temp-" + newItemNo,
      Item_No: newItemNo,
      description: "",
      Code_no: newCodeNo,
      unit: "Day",
      price: "",
      isNew: true,
    };
    setMaterialsData([...materialsData, newMaterial]);
    setHasChanges(true);
  };

  const updateMaterial = (id, key, value) => {
    setMaterialsData((prev) =>
      prev.map((material) =>
        material._id === id ? { ...material, [key]: value } : material
      )
    );
    setHasChanges(true);
  };

  const saveData = async () => {
    if (materialsData.some((material) => !material.description || !material.Code_no || !material.unit || !material.price)) {
      alert("Please fill all fields before saving.");
      return;
    }

    try {
      const formattedData = materialsData.map(({ isNew, _id, ...rest }) => rest);
      const response = await fetch("/api/material_rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Data saved successfully!");
        loadMaterialsData();
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
    const confirmDelete = window.confirm("Are you sure you want to delete this material?");
    if (!confirmDelete) return;
    
    if (!id.startsWith("temp-")) {
      try {
        const response = await fetch("/api/material_rate", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Failed to delete");
      } catch (error) {
        console.error("Error deleting:", error);
        alert("Error deleting material");
        return;
      }
    }
    setMaterialsData((prev) => prev.filter((material) => material._id !== id));
    setHasChanges(true);
  };

  const filteredMaterials = materialsData.filter((material) =>
    material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.Code_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.unit.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center my-4 bg-gray-800 text-white py-2 rounded-lg">Materials Table</h1>

      <div className="flex gap-4 mb-4">
        <button onClick={addMaterial} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          Add Material
        </button>
        <input
          type="text"
          placeholder="Search materials..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-full"
        />
        {hasChanges && (
          <button onClick={saveData} className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
            Save Changes
          </button>
        )}
      </div>

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
            {filteredMaterials.map((material) => (
              <tr key={material._id} className="border-b text-center hover:bg-gray-200">
                <td className="p-3">{material.Item_No}</td>
                <td className="p-3">{material.Code_no}</td>
                <td className="p-3">
                  <input
                    type="text"
                    value={material.description}
                    onChange={(e) => updateMaterial(material._id, "description", e.target.value)}
                    className="border p-2 w-full"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    value={material.unit}
                    onChange={(e) => updateMaterial(material._id, "unit", e.target.value)}
                    className="border p-2 w-full"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="number"
                    value={material.price}
                    onChange={(e) => updateMaterial(material._id, "price", e.target.value)}
                    className="border p-2 w-full"
                  />
                </td>
                <td className="p-3">
                  <button onClick={() => deleteRow(material._id)} className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700">
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
