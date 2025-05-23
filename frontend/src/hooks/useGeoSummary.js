"use client";
import { getGeoSummary } from "@/api/geo";
import { useMutation } from "@tanstack/react-query";


export function useGeoSummary() {
    return useMutation({
        mutationFn: getGeoSummary,
    })
}
