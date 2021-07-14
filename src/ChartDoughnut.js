import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const ChartDoughnut = ({data}) => {

  const data_as_array = Object.entries(data)
  const removeNull = key => key[1] != null  
  const filteredArray = data_as_array.filter(removeNull)
  const keys = filteredArray.map(kv => `${kv[0]} - ${(kv[1]*100).toFixed(2)}%`)
  const value_of_keys = filteredArray.map(kv => kv[1])

  const transformedData = {
    labels: keys,
    datasets: [{
      data: value_of_keys,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        "#ff9936", 
        "#50C878", 
        "#FF00FF",     
        "#fff000", 
        "#9e36ff",
        "#673147",
        "#7F00FF",
      ],
     //hoverOffset: 4
    }]
  };

  return (
    <div>
      <Doughnut 
        data={transformedData}
        options={{
            responsive: true,
        }}
      />
    </div>
  )
}; 

  
export default ChartDoughnut;