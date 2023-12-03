import { FC, memo, useEffect } from 'react'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, ColorPicker, Flex, Input, Table } from 'antd'
import { Color } from 'antd/es/color-picker'
import { ColumnsType } from 'antd/es/table'
import { LEGEND_OPTION_NAMES } from 'helpers/constants/chart'
import { makeid } from 'helpers/functions/commons'
import { selectChartLegendOptions } from 'store/chart/selectors'
import { addChartLegend, removeChartLegend, setChartLegendOptions } from 'store/chart/slice'
import { T_Legend } from 'store/chart/types'
import { useTranslations } from 'hooks/useTranslations'
import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useTypedSelector } from 'hooks/useTypedSelector'
import styles from './styles.module.css'

type DataType = T_Legend

export const LegendDataInput: FC = memo(() => {
  const dispatch = useTypedDispatch()
  const legendOptions = useTypedSelector(selectChartLegendOptions)
  const translations = useTranslations()

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value, type } = e.currentTarget
    const attrName = e.currentTarget.getAttribute('data-chart-option-name') as keyof T_Legend

    const action = {
      id: name,
      [attrName]: type === 'number' ? +value : value,
    }
    if (attrName === 'rangeStart' || attrName === 'rangeEnd') {
      const rangeStart = attrName === 'rangeStart' ? +value : legendOptions.byId[name].rangeStart
      const rangeEnd = attrName === 'rangeEnd' ? +value : legendOptions.byId[name].rangeEnd
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

  const handleColorChange: (value: Color, hex: string, id: T_Legend['id']) => void = (value, hex, id) => {
    dispatch(
      setChartLegendOptions({
        id,
        color: hex,
      })
    )
  }

  useEffect(() => {}, [legendOptions.allIds.length])

  const columns: ColumnsType<DataType> = [
    {
      key: LEGEND_OPTION_NAMES.name,
      title: translations.legendName,
      dataIndex: LEGEND_OPTION_NAMES.name,
      render: (value: T_Legend['name'], record) => {
        return (
          <Input
            name={record.id}
            data-chart-option-name={LEGEND_OPTION_NAMES.name}
            className={styles.name}
            value={value}
            onChange={handleChange}
          />
        )
      },
    },
    {
      key: LEGEND_OPTION_NAMES.rangeStart,
      title: translations.legendRangeStart,
      dataIndex: LEGEND_OPTION_NAMES.rangeStart,
      render: (value: T_Legend['rangeStart'], record) => {
        return (
          <Input
            type="number"
            name={record.id}
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
      title: translations.legendRangeEnd,
      dataIndex: LEGEND_OPTION_NAMES.rangeEnd,
      render: (value: T_Legend['rangeEnd'], record) => {
        return (
          <Input
            type="number"
            name={record.id}
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
      title: translations.legendColor,
      dataIndex: LEGEND_OPTION_NAMES.color,
      render: (value: T_Legend['color'], record) => {
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
      title: '',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="text" 
          danger 
          id={record.id} 
          icon={<MinusOutlined />} 
          onClick={handleRemoveClick} 
        />
      ),
    },
  ]

  const dataSource: T_Legend[] = legendOptions.allIds.map((legendOptionId) => ({
    key: legendOptionId,
    ...legendOptions.byId[legendOptionId],
  }))
  console.log({ dataSource })

  return (
    <Flex gap="small" vertical className="normalized-table-wrapper">
      <Table columns={columns} pagination={false} dataSource={dataSource} bordered />
      <Button icon={<PlusOutlined />} type="text" onClick={handlePlusClick} />
    </Flex>
  )
})
