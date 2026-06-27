"use client";
import { useState, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const runBubbleSort = (inputArr) => {
  const arr = [...inputArr];
  let comparisons = 0, swaps = 0, accesses = 0;
  const log = [];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      accesses += 2;
      comparisons++;
      log.push({ step: comparisons, action: `Compare arr[${j}]=${arr[j]} & arr[${j+1}]=${arr[j+1]}`, pass: i + 1 });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;
        accesses += 2;
        swapped = true;
        log.push({ step: comparisons, action: `Swap → arr[${j}]=${arr[j]}, arr[${j+1}]=${arr[j+1]}`, pass: i + 1 });
      }
    }
    if (!swapped) break;
  }
  return { comparisons, swaps, accesses, total: comparisons + swaps, log };
};

const generateArr = (size, pattern) => {
  const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
  if (pattern === "sorted") return arr.sort((a, b) => a - b);
  if (pattern === "reverse") return arr.sort((a, b) => b - a);
  if (pattern === "nearly") {
    const s = arr.sort((a, b) => a - b);
    for (let k = 0; k < Math.floor(size * 0.1); k++) {