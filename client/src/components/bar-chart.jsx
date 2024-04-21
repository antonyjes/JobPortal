import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export const BarChart = ({data}) => {
    const [formattedData, setFormattedData] = useState([]);

    const options = {
        chart: {
            title: "Rendimiento de Aplicaciones",
            subtitle: "Estado de aplicaciones: 2024"
        }
    }

    useEffect(() => {
        if (data) {
            const formatData = [["Month", "Sent", "Seen", "Interview", "Selected"]];
            Object.keys(data).forEach(month => {
                const rowData = [new Date(0, month).toLocaleString('en-US', { month: 'long'})];
                const statusCounts = data[month];
                formatData[0].forEach((header, index) => {
                    if (index !== 0) {
                        rowData.push(statusCounts[header] || 0);
                    }
                });
                formatData.push(rowData);
            })
            setFormattedData(formatData);
        }
    }, [data])

    return(
        <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={formattedData}
            options={options}
        />
    )
}