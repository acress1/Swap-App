import React, { useEffect, useState } from "react";
import Table from "./Table";
import { format } from 'date-fns';
import './ViewBoxes.scss';

export default function DayBox ({ BASEURL, searchField, selectedDay }) {
    
    const formatedSelectedDay = format(selectedDay, 'dd/MM/yyyy');
    
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        setLoading(true);
    
        fetch(`${BASEURL}/dbData`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch DayBox Data');
            }
            return response.json();
        })
        .then(data => {
            const sortedData = data.data
            .filter(item => item.Date === formatedSelectedDay)
             // eslint-disable-next-line
            .map(item => item.Outbound == item.Inbound ? {...item, Outbound: "See Note", Inbound: " "} : item);

            setFormData({ ...data, data: sortedData });
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }, [BASEURL, formatedSelectedDay]);
    
    return (
        <div className="viewBox dayBox">
            {loading ? (
                <div className="loading-spinner"></div>
            ) : (
                <Table formData={formData} searchField={searchField} />
            )}
        </div>
    );
};