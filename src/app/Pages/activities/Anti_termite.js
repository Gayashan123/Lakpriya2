'use client';

import React, { useEffect, useState } from 'react';

const TableComponent = ({ title, data, totalAmount, rates }) => {
  const formatAmount = (amount) => {
    return amount.toFixed(2);  // Format the amount to 2 decimal places
  };

  return (
    <div className="p-4 bg-gray-100 w-full flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg overflow-hidden p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center border-b pb-2">{title}</h2>

        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="p-2 border">No.</th>
              <th className="p-2 border">Item Description</th>
              <th className="p-2 border">Item Ref</th>
              <th className="p-2 border">Unit</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Rate (Rs.)</th>
              <th className="p-2 border">Amount (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="text-center border-b hover:bg-gray-100">
                <td className="p-2 border">{row.no}</td>
                <td className="p-2 border text-left">{row.description}</td>
                <td className="p-2 border">{row.ref || '-'}</td>
                <td className="p-2 border">{row.unit || '-'}</td>
                <td className="p-2 border">{row.quantity !== undefined ? row.quantity : '-'}</td>
                <td className="p-2 border">
                  {row.rate !== undefined ? formatAmount(row.rate) : '-'}
                </td>
                <td className="p-2 border font-semibold">{formatAmount(row.amount)}</td>
              </tr>
            ))}
            <tr className="font-bold text-center bg-gray-300">
              <td colSpan={6} className="p-2 border">Total for 1Sqr</td>
              <td className="p-2 border">{formatAmount(totalAmount)}</td>
            </tr>

            <tr className="font-bold text-center bg-gray-300">
              <td colSpan={6} className="p-2 border">Rate For 1 Sqr</td>
              <td className="p-2 border">{formatAmount(totalAmount)}</td>
            </tr>
          </tbody>
        </table>

        {/* Rate Section */}
        <div className="mt-4">
          <table className="w-full border-collapse text-sm">
            <tbody>
              {rates.map((rate, index) => (
                <tr key={index} className="bg-yellow-200 text-center font-semibold border-b">
                  <td className="p-2 border">Rate (Say)</td>
                  <td className="p-2 border">{rate.type}</td>
                  <td className="p-2 border">{formatAmount(rate.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default function EarthWorkSupport() {
  const [materialRates, setMaterialRates] = useState({});
  const [labourRates, setLabourRates] = useState({});
  const [tableData, setTableData] = useState([]);

  // Fetch rates from API
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const materialResponse = await fetch('/api/material_rate', {
          headers: { 'Cache-Control': 'no-cache' },  // Disable cache for this request
        });
        const labourResponse = await fetch('/api/labour_rate', {
          headers: { 'Cache-Control': 'no-cache' },  // Disable cache for this request
        });

        if (materialResponse.ok && labourResponse.ok) {
          const materialData = await materialResponse.json();
          const labourData = await labourResponse.json();

          setMaterialRates(materialData);
          setLabourRates(labourData);

          // Update tableData after rates are fetched
          setTableData(prevData => prevData.map(item => {
            item.data.forEach(row => {
              row.rate = getRate(row.ref, labourData, materialData);  // Update rate based on ref
              row.amount = row.quantity * row.rate;  // Update amount based on quantity and rate
            });
            const total = item.data.reduce((sum, row) => sum + row.amount, 0); // Sum of all amounts
            item.totalAmount = total;

            // Calculate rates for 1 Sqr, 1 ft², and 1 m²
            item.rates[0].amount = total;  // Rate for 1 Sqr
            item.rates[1].amount = total / 1000;  // Assuming 1 Sqr = 1000 ft²
            item.rates[2].amount = total / 929.03;  // Assuming 1 Sqr = 929.03 m²

            return item;
          }));
        }
      } catch (error) {
        console.error('Error fetching rates:', error);
      }
    };

    fetchRates();
  }, []);

  // Function to fetch rate based on ref
  const getRate = (ref, labourData, materialData) => {
    let rate = 0;
    
    if (ref.startsWith('L')) {
      // Fetch from labour
      const matchedLabour = labourData.find(item => item.Code_no === ref);
      if (matchedLabour) {
        rate = matchedLabour.price || 0;
      }
    } else if (ref.startsWith('M')) {
      // Fetch from material
      const matchedMaterial = materialData.find(item => item.Code_no === ref);
      if (matchedMaterial) {
        rate = matchedMaterial.price || 0;
      }
    }

    return rate;
  };

  // Provided data
  const exampleData = [
    {
      title: "03.A.01 Anti-Termite treatment on excavated foundation and compacted soil under floors. (Analyse for 1 Sq)",
      data: [
        { no: '1', description: 'D. D. T. Powder', ref: 'M-038', unit: 'Lbs', quantity: 16, rate: 0, amount: 0 },  // 400
        { no: '1.0', description: 'Water', ref: 'M-157', unit: 'Gal', quantity: 20, rate: 0, amount: 0 },  // 6
        { no: '1.01', description: 'U / SK Labourer', ref: 'L-007', unit: 'Day', quantity: 0.5, rate: 0, amount: 0 },  // 900
      ],
      totalAmount: 0,  // Will calculate this dynamically
      rates: [
        { type: '1 Sqr', amount: 0 },  // Placeholder, will calculate dynamically
        { type: '1 ft²', amount: 0 },  // Placeholder, will calculate dynamically
        { type: '1 m²', amount: 0 },  // Placeholder, will calculate dynamically
      ],
    },
  ];

  useEffect(() => {
    setTableData(exampleData); // Set the initial table data from provided example
  }, []);

  return (
    <div className="space-y-6">
      {tableData.map((item, index) => (
        <TableComponent
          key={index}
          title={item.title}
          data={item.data}
          totalAmount={item.totalAmount}
          rates={item.rates}
        />
      ))}
    </div>
  );
}
