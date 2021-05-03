import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect } from 'react';
import api from './service/api';
import moment from 'moment';




function Graficos() {
  
  const [data, setData] = useState()  
  const [currency, setCurrency] = useState('EUR')
  const [hasError, setHasError] = useState(false)

  const now = moment().format("YYYY-MM-DD")
  const days = [
    moment(now).subtract(6, "d").format("YYYY-MM-DD"),
    moment(now).subtract(5, "d").format("YYYY-MM-DD"),
    moment(now).subtract(4, "d").format("YYYY-MM-DD"),
    moment(now).subtract(3, "d").format("YYYY-MM-DD"),
    moment(now).subtract(2, "d").format("YYYY-MM-DD"),
    moment(now).subtract(1, "d").format("YYYY-MM-DD"),
    now
  ]
  
  
  useEffect(() => {  
    const getData = async () => {
      try {
        const apiData = await Promise.all(days.map((day) => api.get('/api/'+day)))
        setData(apiData)
      } catch (error) {
        console.log(error)
        setHasError(true)
      }

    } 
    getData()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    console.log(now)
    console.log(moment(now).subtract(1, "d"))
    console.log(data)
    // eslint-disable-next-line
  }, [data])

  let options //variavel do grafico
  let series = [] //array dos valores a serem colocados no grafico
  let dataGraph = []

  if (data && !hasError) {
    for (let i = 0; i <= 6; i++) {
      series.push(data[i].data.rates[currency]) //automatizando os valores p serem inseridos do grafico
      dataGraph.push(moment(now).subtract(i, "d").format("DD/MM/YYYY"))
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
          categories: [
            dataGraph[6],
            dataGraph[5],
            dataGraph[4],
            dataGraph[3],
            dataGraph[2],
            dataGraph[1],
            moment(now).format("DD/MM/YYYY")
          ],
          title: {
            text: 'Dias'
          }
        }],

      yAxis: [
        {
          title: {
            text: 'Valor'
          }
        }],

      series: [
        {
          name: 'Cotação',
          data: series
        }
      ]
    };
  }
  return (
    <>
      {hasError && <div>Houve um erro com a api</div>}
      <HighchartsReact highcharts={Highcharts} options={options} />
      <button onClick={() => setCurrency('EUR')}>EUR</button>
      <button onClick={() => setCurrency('JPY')}>JPY</button>
      <button onClick={() => setCurrency('USD')}>USD</button>
    </>

  );
}

export default Graficos;