import useAuth from "../../hooks/useAuth";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import { URL_HOST } from "../../urlHost";


const DailyMacros = (props) => {
    const [user, token] = useAuth();
    const [data, setData] = useState([["Macros","Calories","Fats","Carbs","Proteins"]]);
    const [dailyMacros, setDailyMacros] = useState();
    //get today's totals in calories, fats, carbs, protein
    
    useState(() =>{
        getDailyMacros()
        console.log("logging get daily macros from DMcomponent")
        })

    async function getDailyMacros() {
        try{
          console.log(URL_HOST)
          let response = await axios.get(`${URL_HOST}/consumed_foods/`, {
            headers: {
              Authorization: 'Bearer ' + token
            }
          })
            if(response.status === 200){
              console.log([response.data.cals, response.data.fats, response.data.carbs, response.data.proteins])
              console.log(`logging data ${data}`)
              setData([...data, [' ',response.data.cals, response.data.fats, response.data.carbs, response.data.proteins]])
              console.log(dailyMacros)
            } 
          } catch (error) {
              console.log(error.message)
            }
        }

        useEffect(() => {
            console.log(`DM trigger${dailyMacros}`)
            setData({...data, dailyMacros})
          },[dailyMacros])
    
    const options = {
        chart: {
            title: "Daily Macros",
        },
        width: 900,
        height: 500,
        viewWindow:{
            max:200,
            min:-100
        },
    }

    return ( 
        <div>
            <Chart
                    chartType="Bar"
                    data={data}
                    options={options}
                    width="100%"
                    height="400px"
                    legendToggle
                />
        </div>
     );
}
 
export default DailyMacros;