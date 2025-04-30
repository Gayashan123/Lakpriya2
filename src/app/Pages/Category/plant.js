'use client';

import React, { useState, useEffect } from "react";

export default function Plant() {
  const [plantData, setPlantData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadPlantData();
  }, []);

  useEffect(() => {
    setFilteredData(
      plantData.filter((plant) =>
        plant.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, plantData]);

  const loadPlantData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/plant_rate");
      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();
      setPlantData(result);
      setFilteredData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setPlantData([]);
      setFilteredData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addPlant = () => {
    const newItemNo = plantData.length + 1;
    const newCodeNo = `P-${String(newItemNo).padStart(3, "0")}`;
    const newPlant = {
      _id: "temp-" + newItemNo,
      Item_No: newItemNo,
      description: "",
      Code_no: newCodeNo,
      unit: "Day",
      price: "",
      isNew: true,
    };
    setPlantData((prev) => [...prev, newPlant]);
    setHasChanges(true);
  };

  const updatePlant = (id, key, value) => {
    setPlantData((prev) =>
      prev.map((plant) =>
        plant._id === id ? { ...plant, [key]: value } : plant
      )
    );
    setHasChanges(true);
  };

  const saveData = async () => {
    if (plantData.some((plant) => !plant.description || !plant.Code_no || !plant.unit || !plant.price)) {
      alert("Please fill all fields before saving.");
      return;
    }

    try {
      const formattedData = plantData.map(({ isNew, _id, ...rest }) => rest);
      const response = await fetch("/api/plant_rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) throw new Error("Failed to save data");

      alert("Data saved successfully!");
      setHasChanges(false);
      await loadPlantData();
    } catch (error) {
      console.error("Save error:", error);
      alert("Error saving data");
    }
  };

  const deleteRow = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plant?")) return;

    if (!id.startsWith("temp-")) {
      try {
        const response = await fetch("/api/plant_rate", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) throw new Error("Failed to delete data");
      } catch (error) {
        console.error("Error deleting:", error);
        alert("Error deleting plant");
        return;
      }
    }

    setPlantData((prev) => prev.filter((plant) => plant._id !== id));
    setHasChanges(true);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center my-4 bg-gray-800 text-white py-2 rounded-lg">Plant Table</h1>

      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search by description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-lg w-1/3 mr-4"
        />
        <button onClick={addPlant} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          Add Plant
        </button>
      </div>

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
            {filteredData.map((plant) => (
              <tr key={plant._id} className="border-b text-center hover:bg-gray-200">
                <td className="p-3">{plant.Item_No}</td>
                <td className="p-3">{plant.Code_no}</td>
                <td className="p-3">
                  <input
                    type="text"
                    value={plant.description}
                    onChange={(e) => updatePlant(plant._id, "description", e.target.value)}
                    className="border p-2 w-full"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    value={plant.unit}
                    onChange={(e) => updatePlant(plant._id, "unit", e.target.value)}
                    className="border p-2 w-full"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="number"
                    value={plant.price}
                    onChange={(e) => updatePlant(plant._id, "price", e.target.value)}
                    className="border p-2 w-full"
                  />
                </td>
                <td className="p-3">
                  <button
                    onClick={() => deleteRow(plant._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                  >
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
