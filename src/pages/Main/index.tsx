import {FC, useEffect, useState} from "react";
import * as ST from './styled';
import {generateColors} from "@src/utils/colors";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {createChartData} from "@src/utils/calculate";
import { Settings } from '@src/pages/Main/components/Settings';
import { SettingsForm } from '@pages/Main/components/Settings/SettingsModal';
import { Payload } from 'recharts/types/component/DefaultLegendContent';

const DEFAULT_SETTINGS: SettingsForm = {
  count: 4,
  failureRates: [2,2,2,2],
  recoveryRates: [0,0,0,0],
}

const Main: FC = () => {
    const [colors, setColors] = useState(generateColors(100));
    const [activeLegend, setActiveLegend] = useState<number>()
    const [settings, setSettings] = useState<SettingsForm>(DEFAULT_SETTINGS)
    const [data, setData] = useState(createChartData({
        recoveryRates: DEFAULT_SETTINGS.recoveryRates,
        failureRates: DEFAULT_SETTINGS.failureRates,
        endTime: 1,
        count: DEFAULT_SETTINGS.count,
    }));

    const onSave = (values: SettingsForm) => {
      setSettings(values);
      setData(createChartData({
        recoveryRates: values.recoveryRates,
        failureRates: values.failureRates,
        count: values.count,
        endTime: 1,
      }));
    }

  const handleMouseEnter = (o: Payload) => {
    const { dataKey } = o;

    setActiveLegend(Number(dataKey));
  };

  const handleMouseLeave = () => {
    setActiveLegend(undefined);
  };

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
                    <YAxis max={1} min={0} />
                    <Tooltip />
                    <Legend verticalAlign="top" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                    {Array(Math.pow(2, settings.count)).fill(0).map((_, i) => (
                        <Line type="monotone" dataKey={i} stroke={colors[i]} max={1} min={0} strokeOpacity={typeof activeLegend === 'undefined' || activeLegend === i ? 1 : 0.1} />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </ST.Wrapper>
    )
}

export default Main
