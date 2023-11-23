import { useState } from 'react';
import { FC } from 'react';
import { renderToString } from 'react-dom/server';

import { Chart } from 'components/chart/Main';
import { T_ChartState } from 'store/chart/types';
import { T_RegionsState } from 'store/regions/types';

import styles from './styles.module.css';
import { ASSET_TYPES, HANDLERS_BY_ASSET_TYPE } from 'helpers/constants/chart';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Select, MenuProps, Flex, Form } from 'antd';
import { Option } from 'antd/es/mentions';

type T_Props = {
    data: T_RegionsState,
    chart: T_ChartState
}


export const ChartDownloadPanel: FC<T_Props> = ({ data, chart }) => {
    const [ assetType, setAssetType ] = useState<typeof ASSET_TYPES[keyof typeof ASSET_TYPES]>(ASSET_TYPES.png)

    const handleChangeAssetType = (v: typeof assetType) => {
      setAssetType(v);
    }

    const handleClick = () => {
        const svgMarkup = <Chart data={data} chart={chart} />;
        const svgStr = renderToString(svgMarkup);

        HANDLERS_BY_ASSET_TYPE[assetType](svgStr);
    }  

    return (
      <Form.Item label="Export type">            
        <Flex gap='small'>
          <Select
            onChange={handleChangeAssetType}
            value={assetType}
            style={{width: 100}}
          >
            <Select.Option value={ASSET_TYPES.pdf}>{ASSET_TYPES.pdf}</Select.Option>
            <Select.Option value={ASSET_TYPES.png}>{ASSET_TYPES.png}</Select.Option>
            <Select.Option value={ASSET_TYPES.svg}>{ASSET_TYPES.svg}</Select.Option>
          </Select>
          <Button 
            type="primary" 
            icon={<DownloadOutlined />} 
            onClick={handleClick}
          >
            Download {assetType}
          </Button>
        </Flex>
      </Form.Item>           
    )
}