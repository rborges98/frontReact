import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect } from 'react';
import api from './service/api';


function Graficos() {
  
  const[data,setData] = useState()  //atribuindo os endpoint a variavel data e quando seu estado muda ele é re-renderizado
  const[currency,setCurrency] = useState('EUR')

    useEffect(()=>{  //função utilizada para renderizar o componente
      const getData = async () => {
        const apiData = await Promise.all([
          api.get('/api/2021/04/24'),   //pegando os endpoints da api para renderizar o json
          api.get('/api/2021/04/23'),
          api.get('/api/2021/04/22'),
          api.get('/api/2021/04/21'),
          api.get('/api/2021/04/20'),
          api.get('/api/2021/04/19'),
          api.get('/api/2021/04/18')
        ])

        setData(apiData)
      }

      getData()
    },[])
  
  useEffect(() => {
    console.log(data)
  }, [data])

  let options //variavel do grafico
  let series = [] //array dos valores a serem colocados no grafico

  if (data){
    for(let i = 0; i <= 6; i++){
      series.push(data[i].data.rates[currency]) //automatizando os valores p serem inseridos do grafico
    }
    options = {
    
      chart: {
        type: 'spline'
      },
      title: {
      text: 'Cotação BRL/' + currency
      },
      
      xAxis: [
        {
        title:{
          text:'Dias'
        }
      }],

      yAxis: [
        {
        title:{
          text:'Valor'
        }
      }],

      series: [
        {
          data: series
        }
      ]
    };
  }
  return(
    <>
      
      <HighchartsReact highcharts={Highcharts} options={options} /> 
      <button onClick={ () => setCurrency('EUR')}>EUR</button>
      <button onClick={ () => setCurrency('JPY')}>JPY</button>
      <button onClick={ () => setCurrency('USD')}>USD</button>
    </>
    
  );
}

export default Graficos;