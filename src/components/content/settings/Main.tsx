import { FC, useState } from 'react';
import { Collapse, CollapseProps } from 'antd';
import { ChartSettings } from './chart/Main';
import { LegendSettings } from './legend/Main';

const TABS = {
    chart: 'chart',
    legend: 'legend',
} as const

export const Settings: FC = () => {

    const [activeKey, setActiveKey] = useState<typeof TABS[keyof typeof TABS]>(TABS.chart)

    const items: CollapseProps['items'] = [
        {
          key: TABS.chart,
          label: 'Chart settings',
          children: <ChartSettings />,
        },
        {
          key: TABS.legend,
          label: 'Legend settings',
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