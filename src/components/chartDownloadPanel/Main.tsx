import { useState } from 'react';
import { FC } from 'react';
import { renderToString } from 'react-dom/server';

import { Chart } from 'components/chart/Main';
import { T_ChartState } from 'store/chart/types';
import { T_RegionsState } from 'store/regions/types';

import styles from './styles.module.css';
import { ASSET_TYPES, HANDLERS_BY_ASSET_TYPE } from 'helpers/constants/chart';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Select, MenuProps } from 'antd';

type T_Props = {
    data: T_RegionsState,
    chart: T_ChartState
}


export const ChartDownloadPanel: FC<T_Props> = ({ data, chart }) => {
    const [ assetType, setAssetType ] = useState<typeof ASSET_TYPES[keyof typeof ASSET_TYPES]>(ASSET_TYPES.png)

    const handleChangeAssetType = (event: any) => {
        setAssetType(event.target.value as typeof assetType);
    }

    const handleClick = () => {
        const svgMarkup = <Chart data={data} chart={chart} />;
        const svgStr = renderToString(svgMarkup);

        HANDLERS_BY_ASSET_TYPE[assetType](svgStr);
    }

    const items = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              1st menu item
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              2nd menu item
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              3rd menu item
            </a>
          ),
        },
    ];    

    return (
        <div className={styles.chartDownloadPanel}>
            <Select
                value={assetType}
                onChange={handleChangeAssetType}
                options={items}
            />
            <Button 
                type="primary" 
                icon={<DownloadOutlined />} 
                onClick={handleClick}
            >
                Download {assetType}
            </Button>
        </div>
    )
}