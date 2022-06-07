import useAuth from "../../hooks/useAuth";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import { URL_HOST } from "../../urlHost";


const DailyMacros = (props) => {
    const [user, token] = useAuth();
    const [data, setData] = useState([]);

        useEffect(() => {
            console.log(`DM trigger${props.dailyWater}`)
            setData([["Daily Goals",`Water ${props.dailyWater.toFixed(0)} of 100oz`,`Calories ${(props.dailyCals*2000/100).toFixed(0)} of 2000 cal`,`Fats ${(props.dailyFats*66/100).toFixed(0)} of 66g`,`Carbs ${(props.dailyCarbs*225/100).toFixed(0)} of 225g`,`Proteins ${(props.dailyProteins*122/100).toFixed(0)}g of 122g`], [' ',props.dailyWater, props.dailyCals, props.dailyFats, props.dailyCarbs, props.dailyProteins]])
          },[props.dailyCals, props.dailyFats, props.dailyProteins, props.dailyCarbs, props.dailyWater])
    
    const options = {
            title: "Daily Macros",
            hAxis: { title: "Daily Goals", viewWindow: { min: 0, max: 15 } },
            vAxis: { title: "Percent Complete", viewWindow: { min: 0, max: 125 } },
            
    }

    return ( 
        <div>
            <Chart
                    chartType="Bar"
                    data={data}
                    options={options}
                    width="100%"
                    height="100%"
                    title="Daily Macros"
                />
        </div>
     );
}
 
export default DailyMacros;