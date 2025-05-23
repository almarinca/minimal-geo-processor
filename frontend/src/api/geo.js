"use client";
import axios from "axios";
import { config } from "../config";


export async function getGeoSummary (data) {
    const response = await axios.post(`${config.GEO_API_URL}/geo/summary`, data);
    return response.data;
};
