import { FC } from 'react';
import styles from './styles.module.css';
import { useTypedDispatch } from 'hooks/useTypedDispatch';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { selectChartLegendOptions } from 'store/chart/selectors';
import { T_Legend } from 'store/chart/types';
import { addChartLegend, removeChartLegend, setChartLegendOptions } from 'store/chart/slice';
import { makeid } from 'helpers/functions/commons';
import { Button, ColorPicker, Input, Table } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { LEGEND_OPTION_NAMES } from 'helpers/constants/chart';
import { Color } from 'antd/es/color-picker';

type DataType = T_Legend

export const LegendsTable: FC = () => {

    const dispatch = useTypedDispatch()
    const legendOptions = useTypedSelector(selectChartLegendOptions) 

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.currentTarget
        const attrName = e.currentTarget.getAttribute('data-chart-option-name') as keyof T_Legend
        
        const action = {
            id: name,
            [attrName]: value
        }
        if(attrName === 'rangeStart' || attrName === 'rangeEnd') {
            const { rangeStart, rangeEnd } = legendOptions.byId[name]
            action.name = rangeStart + ' - ' + rangeEnd
        }

        dispatch(setChartLegendOptions(action))
    }

    const handlePlusClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(addChartLegend({ id: makeid() }))
    }

    const handleRemoveClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        dispatch(removeChartLegend({ id: e.currentTarget.id }))
    }

    const handleColorChange: ((value: Color, hex: string, id: T_Legend['id']) => void) = (value, hex, id) => {
        dispatch(setChartLegendOptions({
            id,
            color: hex
        }))
    }

    const columns: ColumnsType<DataType> = 
    [
        {
            key: LEGEND_OPTION_NAMES.name,
            title: LEGEND_OPTION_NAMES.name,
            dataIndex: LEGEND_OPTION_NAMES.name,
            render: (options: T_Legend) => {
                return (
                    <Input 
                        name={LEGEND_OPTION_NAMES.name}
                        data-chart-option-name={LEGEND_OPTION_NAMES.name}
                        className={styles.name}
                        value={options.name}
                        onChange={handleChange}
                    />
                )
            }
        },
        {
            key: LEGEND_OPTION_NAMES.rangeStart,
            title: LEGEND_OPTION_NAMES.rangeStart,
            dataIndex: LEGEND_OPTION_NAMES.rangeStart,
            render: (options: T_Legend) => {
                return (
                    <Input 
                        type='number'
                        name={LEGEND_OPTION_NAMES.rangeStart}
                        data-chart-option-name={LEGEND_OPTION_NAMES.rangeStart}
                        className={styles.rangeStart}
                        value={options.rangeStart}
                        onChange={handleChange}
                    />
                )
            },
        },
        {
            key: LEGEND_OPTION_NAMES.rangeEnd,
            title: LEGEND_OPTION_NAMES.rangeEnd,
            dataIndex: LEGEND_OPTION_NAMES.rangeEnd,
            render: (options: T_Legend) => {
                return (
                    <Input 
                        type='number'
                        name={LEGEND_OPTION_NAMES.rangeEnd}
                        data-chart-option-name={LEGEND_OPTION_NAMES.rangeEnd}
                        className={styles.rangeEnd}
                        value={options.rangeEnd}
                        onChange={handleChange}
                    />
                )
            },
        },
        {
            key: LEGEND_OPTION_NAMES.color,
            title: LEGEND_OPTION_NAMES.color,
            dataIndex: LEGEND_OPTION_NAMES.color,
            render: (options: T_Legend) => {
                return (
                    <ColorPicker 
                        className={styles.rangeEnd}
                        value={options.color}
                        onChange={(value: Color, hex: string) => handleColorChange(value, hex, options.id)}
                    />
                )
            },
        },
    ]

                // <TableCell>
            //     <input 
            //         name={id}
            //         data-chart-option-name='rangeStart'
            //         className={styles.rangeStart}
            //         value={rangeStart}
            //         onChange={handleChange}
            //     />
            // </TableCell>
            // <TableCell>
            //     <input 
            //         type='number' 
            //         data-chart-option-name='rangeEnd'
            //         name={id}
            //         className={styles.rangeEnd}
            //         value={rangeEnd}
            //         onChange={handleChange}
            //     />
            // </TableCell>
            // <TableCell>
            //     <input 
            //         type="color"
            //         data-chart-option-name='color'
            //         className={styles.color} 
            //         name={id}
            //         value={color} 
            //         onChange={handleChange} 
            //     />
            // </TableCell>
            // <TableCell className={styles.removeLegendCell}>
            // <Button 
            //     type="primary" 
            //     shape="circle" 
            //     id={id}
            //     color='red'
            //     icon={<MinusOutlined />} 
            //     onClick={handleRemoveClick}
            // />
            // </TableCell>

    const dataSource: T_Legend[] = legendOptions.allIds.map((legendOptionId) => legendOptions.byId[legendOptionId])

    return (
        <div className={styles.legendTable}>
            <Table
                columns={columns}
                dataSource={dataSource} 
            />
        </div>
    )
}