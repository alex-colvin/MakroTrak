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
            setData([[" ",`Water ${props.dailyWater} of 100oz`,`Calories ${props.dailyCals*2000/100} of 2000 cal`,`Fats ${props.dailyFats*66/100} of 66g`,`Carbs ${props.dailyCarbs*225/100} of 225g`,`Proteins ${props.dailyProteins*122/100}g of 122g`], [' ',props.dailyWater, props.dailyCals, props.dailyFats, props.dailyCarbs, props.dailyProteins]])
          },[props.dailyCals, props.dailyFats, props.dailyProteins, props.dailyCarbs, props.dailyWater])
    
    const options = {
            title: "Daily Goals",
            hAxis: {  title: " ",viewWindow: { min: 0, max: 15 } },
            vAxis: { title: "Percent Complete", viewWindow: { min: 100, max: 125 } },
            
    }

    return ( 
        <div>
            <h2 className="mb-3">Daily Goals</h2>
            <Chart 
                    chartType="Bar"
                    data={data}
                    options={options}
                    width="100%"
                    height="300px"
                />
        </div>
     );
}
 
export default DailyMacros;