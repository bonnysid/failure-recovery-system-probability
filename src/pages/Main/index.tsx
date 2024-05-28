import {FC, useEffect, useState} from "react";
import * as ST from './styled';
import {generateColors} from "@src/utils/colors";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {createChartData} from "@src/utils/calculate";
import { Settings } from '@src/pages/Main/components/Settings';
import { Payload } from 'recharts/types/component/DefaultLegendContent';
import { ChartApi, ChartDataRequestData } from '@src/api/ChartAPI';

const DEFAULT_SETTINGS: ChartDataRequestData = {
  l1: 2,
  l2: 2,
  l3: 2,
  l4: 2,
  l5: 2,
  u1: 0,
  u2: 0,
  u3: 0,
  u4: 0,
  u5: 0,
}

const Main: FC = () => {
    const [colors, setColors] = useState(generateColors(100));
    const [activeLegend, setActiveLegend] = useState<number>()
    const [settings, setSettings] = useState<ChartDataRequestData>(DEFAULT_SETTINGS)
    const [data, setData] = useState<Array<Record<string, number>>>();

    const getData = async () => {
      try {
        const res = await ChartApi.getChartData(settings);
        setData(res.data.t.map((time, i) => ({
          time: time,
          ...(res.data.y.reduce((total, numbers, j) => ({
            ...total,
            [j]: numbers[i],
          }), {}))
        })));
      } catch (e) {
        console.log(e);
      }
    }

    const onSave = (values: ChartDataRequestData) => {
      setSettings(values);
    }

  const handleMouseEnter = (o: Payload) => {
    const { dataKey } = o;

    setActiveLegend(Number(dataKey));
  };

  const handleMouseLeave = () => {
    setActiveLegend(undefined);
  };

  useEffect(() => {
    getData()
  }, [settings]);
  
    return (
        <ST.Wrapper>
          <Settings onSave={onSave} currentSettings={settings} />
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                    {Object.keys((data || [])[0] || {})?.map((_, i) => (
                        <Line type="monotone" dataKey={i} stroke={colors[i]} max={1} min={0} strokeOpacity={typeof activeLegend === 'undefined' || activeLegend === i ? 1 : 0.1} />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </ST.Wrapper>
    )
}

export default Main
