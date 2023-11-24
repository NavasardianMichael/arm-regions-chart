import { FC, useState } from 'react';
import { Collapse, CollapseProps } from 'antd';
import { T_Legend } from 'store/chart/types';
import { ChartSettings } from './chart/Main';
import { LegendSettings } from './legend/Main';

type DataType = T_Legend

const TABS = {
    chart: 'chart',
    legend: 'legend',
} as const

export const Settings: FC = () => {

    const [activeKey, setActiveKey] = useState<typeof TABS[keyof typeof TABS]>(TABS.chart)

    const items: CollapseProps['items'] = [
        {
          key: TABS.chart,
          label: 'This is panel header 1',
          children: <ChartSettings />,
        },
        {
          key: TABS.legend,
          label: 'This is panel header 2',
          children: <LegendSettings />,
        },
    ];

    return (
        <Collapse 
            items={items} 
            activeKey={activeKey} 
            defaultActiveKey={TABS.chart}
            onChange={key => setActiveKey(key as typeof TABS[keyof typeof TABS])} 
        />
    )
}