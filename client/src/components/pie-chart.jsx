import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export const PieChart = ({data, title}) => {
    const [formattedData, setFormattedData] = useState([]);

    const options = {
        title: title,
    }

    useEffect(() => {
        if (data) {
            const formatData = [["Status", "Value"]];
            for (const status in data) {
                formatData.push([status, data[status]]);
            }
            setFormattedData(formatData);
        }
    }, [data]);

    return(
        <Chart chartType="PieChart" data={formattedData} options={options} width={"100%"} height={"400px"} />
    )
}