import { useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FC } from 'react';
import { renderToString } from 'react-dom/server';

import { Chart } from 'components/chart/Main';
import { T_ChartState } from 'store/chart/types';
import { T_RegionsState } from 'store/regions/types';

import styles from './styles.module.css';
import { ASSET_TYPES, HANDLERS_BY_ASSET_TYPE } from 'helpers/constants/chart';

type T_Props = {
    data: T_RegionsState,
    chart: T_ChartState
}


export const ChartDownloadPanel: FC<T_Props> = ({ data, chart }) => {
    const [ assetType, setAssetType ] = useState<typeof ASSET_TYPES[keyof typeof ASSET_TYPES]>(ASSET_TYPES.png)

    const handleChangeAssetType = (event: SelectChangeEvent) => {
        setAssetType(event.target.value as typeof assetType);
    }

    const handleClick = () => {
        const svgMarkup = <Chart data={data} chart={chart} />;
        const svgStr = renderToString(svgMarkup);

        HANDLERS_BY_ASSET_TYPE[assetType](svgStr);
    }

    return (
        <div className={styles.chartDownloadPanel}>
            <FormControl sx={{width: '200px'}}>
                <InputLabel id="demo-simple-select-label">Asset Type</InputLabel>
                <Select
                    value={assetType}
                    label="Asset Type"
                    onChange={handleChangeAssetType}
                >
                <MenuItem value={ASSET_TYPES.png}>{ASSET_TYPES.png}</MenuItem>
                <MenuItem value={ASSET_TYPES.svg}>{ASSET_TYPES.svg}</MenuItem>
                <MenuItem value={ASSET_TYPES.pdf}>{ASSET_TYPES.pdf}</MenuItem>
                </Select>
            </FormControl>
            <IconButton onClick={handleClick} sx={{borderRadius: 1, marginLeft: '1rem'}}>
                <DownloadIcon sx={{marginTop: '6px', paddingRight: '6px'}} />
                <div>Download {assetType}</div>
            </IconButton>
        </div>
    )
}