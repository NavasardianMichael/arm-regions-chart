import { FC } from 'react';
import styles from './styles.module.css';
import { useTypedDispatch } from 'hooks/useTypedDispatch';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { selectChartLegendOptions } from 'store/chart/selectors';
import { T_Legend } from 'store/chart/types';
import { addChartLegend, removeChartLegend, setChartLegendOptions } from 'store/chart/slice';
import { makeid } from 'helpers/functions/commons';
import { Button, ColorPicker, Flex, Input, Table } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
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
            title: 'Name',
            dataIndex: LEGEND_OPTION_NAMES.name,
            render: (value) => {
                return (
                    <Input 
                        name={LEGEND_OPTION_NAMES.name}
                        data-chart-option-name={LEGEND_OPTION_NAMES.name}
                        className={styles.name}
                        value={value}
                        onChange={handleChange}
                    />
                )
            }
        },
        {
            key: LEGEND_OPTION_NAMES.rangeStart,
            title: 'Range Start',
            dataIndex: LEGEND_OPTION_NAMES.rangeStart,
            render: (value) => {
                return (
                    <Input 
                        type='number'
                        name={LEGEND_OPTION_NAMES.rangeStart}
                        data-chart-option-name={LEGEND_OPTION_NAMES.rangeStart}
                        className={styles.rangeStart}
                        value={value}
                        onChange={handleChange}
                    />
                )
            },
        },
        {
            key: LEGEND_OPTION_NAMES.rangeEnd,
            title: 'Range End',
            dataIndex: LEGEND_OPTION_NAMES.rangeEnd,
            render: (value) => {
                return (
                    <Input 
                        type='number'
                        name={LEGEND_OPTION_NAMES.rangeEnd}
                        data-chart-option-name={LEGEND_OPTION_NAMES.rangeEnd}
                        className={styles.rangeEnd}
                        value={value}
                        onChange={handleChange}
                    />
                )
            },
        },
        {
            key: LEGEND_OPTION_NAMES.color,
            title: 'Color',
            dataIndex: LEGEND_OPTION_NAMES.color,
            render: (value, record) => {
                return (
                    <ColorPicker 
                        className={styles.rangeEnd}
                        data-chart-option-name={LEGEND_OPTION_NAMES.color}
                        value={value}
                        onChange={(value: Color, hex: string) => handleColorChange(value, hex, record.id)}
                    />
                )
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button 
                    type="text"
                    id={record.id}
                    icon={<MinusOutlined />} 
                    danger
                    onClick={handleRemoveClick}
                />
            ),
        },        
    ]

    const dataSource: T_Legend[] = legendOptions.allIds.map((legendOptionId) => legendOptions.byId[legendOptionId])

    return (
        <Flex gap='middle' vertical>
            <Table
                columns={columns}
                pagination={false}
                dataSource={dataSource}
                bordered
            />
            <Button 
                icon={<PlusOutlined />} 
                type='text'
                onClick={handlePlusClick}
            />            
            
        </Flex>
    )
}