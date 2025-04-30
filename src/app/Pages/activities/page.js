// pages/activities/index.js

'use client';

import React, { useState, useEffect } from 'react';
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Link from "next/link";

export default function ActivityTracker() {
  const [activityData, setActivityData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newActivity, setNewActivity] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadActivityData();
  }, []);

  const loadActivityData = async () => {
    try {
      const response = await fetch("/api/activity");
      const result = await response.json();
      if (response.ok) {
        setActivityData(result);
      } else {
        setActivityData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setActivityData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addActivity = async () => {
    if (!newActivity.trim()) return;

    const newAct = { name: newActivity };

    try {
      const response = await fetch("/api/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAct),
      });

      const result = await response.json();

      if (response.ok) {
        setActivityData([...activityData, result.newActivity]);
        setNewActivity("");
      } else {
        alert("Error adding activity: " + result.message);
      }
    } catch (error) {
      console.error("Error adding activity:", error);
      alert("Failed to add activity");
    }
  };

  const updateActivity = async (id, name) => {
    try {
      const response = await fetch(`/api/activity`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name }),
      });

      const result = await response.json();

      if (response.ok) {
        setActivityData((prev) =>
          prev.map((act) => (act._id === id ? { ...act, name: result.updatedActivity.name } : act))
        );
        setEditingId(null);
      } else {
        alert("Error updating activity: " + result.message);
      }
    } catch (error) {
      console.error("Error updating activity:", error);
      alert("Failed to update activity");
    }
  };

  const deleteActivity = async (id) => {
    if (!confirm("Are you sure you want to delete this activity?")) return;

    try {
      const response = await fetch(`/api/activity`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (response.ok) {
        setActivityData((prev) => prev.filter((act) => act._id !== id));
      } else {
        alert("Error deleting activity: " + result.message);
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
      alert("Failed to delete activity");
    }
  };

  const filteredSections = activityData.filter((section) =>
    section.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-grow">
        <div className="container mx-auto px-6 py-8">
          <div className="flex gap-6 mb-8 justify-center">
            <input
              type="text"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              className="border-2 border-gray-300 p-4 rounded-lg w-80 text-lg"
              placeholder="Enter activity name"
            />
            <button
              onClick={addActivity}
              className="bg-green-600 text-white px-8 py-4 rounded-lg"
            >
              Add Activity
            </button>
          </div>

          <div className="w-full max-w-md mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search activities..."
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-6xl">
            {filteredSections.map((section, index) => (
              <Link key={index} href={`/pages/activities/${section._id}`} passHref>
                <button className="bg-white text-gray-800 font-semibold py-4 px-6 rounded-lg shadow-xl">
                  {section.name}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
