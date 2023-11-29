import { FC, useCallback, useState } from 'react'
import { Button, Flex, Input } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import Title from 'antd/es/typography/Title'
import { selectRegionsData } from 'store/regions/selectors'
import { setRegionOptions, setRegionsData } from 'store/regions/slice'
import { T_RegionOptions, T_RegionsState } from 'store/regions/types'
import { useTranslations } from 'hooks/useTranslations'
import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { TextFormat } from './TextFormat'
import styles from './styles.module.css'
import { REGIONS_IDS_LIST, REGIONS_INITIAL_OPTIONS } from 'helpers/constants/regions'
import { ClockCircleOutlined } from '@ant-design/icons'
import { Tooltip } from 'components/_shared/Tooltip/Main'

export const DataInput: FC = () => {
  const dispatch = useTypedDispatch()
  const data = useTypedSelector(selectRegionsData)
  const [isProcessedTable, setIsProcessedTable] = useState(false)
  const [unProcessedText, setUnprocessedText] = useState('')
  const [formatError, setFormatError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<keyof T_RegionsState['byId'], string>>(
    REGIONS_IDS_LIST.reduce((acc, id) => {
      acc[id] = ''
      return acc
    }, {} as Record<keyof T_RegionsState['byId'], string>)
  )
  const translations = useTranslations()

  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const { name, value } = e.target
    const attrName = e.currentTarget.getAttribute('data-region-option-name') as keyof T_RegionOptions
    dispatch(
      setRegionOptions({
        id: name as T_RegionOptions['id'],
        [attrName]: value,
      })
    )
  }, [])

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    setUnprocessedText(e.target.value)
  }, [])

  const handleProcessTextData: React.MouseEventHandler<HTMLButtonElement> = () => {
    try {
      const rows = unProcessedText
        .trim()
        .split('\n')
        .filter((row) => !!row)

    const state: any = {
      byId: {},
      allIds: [],
    }
    
    const regionsState = rows.reduce((acc, row) => {
      const [text, value] = row.split('\t')
      const id = text.split(' ').join('').toLowerCase() as keyof T_RegionsState['byId']
      if(!REGIONS_IDS_LIST.includes(id)) return acc
      
      
      acc.byId[id] = {
        ...REGIONS_INITIAL_OPTIONS[id],
        id,
        text,
        value: +value,
      }
      console.log(111, acc.byId[id]);
      
      acc.allIds.push(id)
      console.log({acc});
      return acc
    }, state) as T_RegionsState
    if(!regionsState.allIds.length) {
      setFormatError('The data you entered cannot be formatted, please ensure it matches the expected pattern')
      setUnprocessedText('')
      return
    }
    const arr: T_RegionsState['allIds'] = [...REGIONS_IDS_LIST, ...regionsState.allIds]
      dispatch(setRegionsData({
        byId: {
          ...REGIONS_INITIAL_OPTIONS,
          ...regionsState.byId
        },
        allIds: new Set(arr)
      }))
      setIsProcessedTable(true)
    } catch (e) {
      setFormatError('The data you entered cannot be formatted, please ensure it matches the expected pattern')
    }
  }

  if (!isProcessedTable)
    return (
      <Flex vertical gap="small">
        <TextFormat formatError={formatError} value={unProcessedText} onChange={handleChange} />
        <Flex className={styles.inputProcessButtons} gap="small" style={{ fontSize: 'var(--size-sm)' }}>
          <Button type="primary" disabled={!unProcessedText} onClick={handleProcessTextData}>
            {translations.tabDelimitedTextProcessorButton}
          </Button>
          <Button type="primary" onClick={() => setIsProcessedTable(true)}>
            {translations.skipToDataInputTableButton}
          </Button>
        </Flex>
      </Flex>
    )

  const columns: ColumnsType<T_RegionOptions> = [
    {
      key: 'id',
      title: translations.regionID,
      dataIndex: 'id',
      render: (value) => {
        return (
          <Title style={{ margin: '0 0 0 8px', textAlign: 'left', textTransform: 'uppercase', fontSize: 14 }} level={5}>
            #{value}
          </Title>
        )
      },
    },
    {
      key: 'name',
      title: translations.regionName,
      dataIndex: 'text',
      render: (value, record) => {
        return (
          <Input 
            name={record.id} 
            value={value} 
            data-region-option-name="text" 
            onChange={handleTextChange} 
            status={fieldErrors[record.id] ? 'error' : undefined} 
            prefix={
              <Tooltip show={!!formatError} title='some error'>
                <ClockCircleOutlined />
              </Tooltip>
            }
          />
        )
      },
    },
    {
      key: 'value',
      title: translations.regionValue,
      dataIndex: 'value',
      render: (value, record) => {
        return (
          <Input
            type="number"
            name={record.id}
            value={value}
            data-region-option-name="value"
            onChange={handleTextChange}
          />
        )
      },
    },
  ]

  const dataSource: T_RegionOptions[] = data.allIds.map((regionId) => ({ key: regionId, ...data.byId[regionId] }))

  return (
    <div className="normalized-table-wrapper">
      <Table columns={columns} dataSource={dataSource} pagination={false} bordered />
    </div>
  )
}
