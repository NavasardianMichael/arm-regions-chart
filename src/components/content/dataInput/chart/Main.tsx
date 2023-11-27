import { FC, FocusEventHandler, useCallback, useState } from 'react'
import { Button, Flex, Input, notification } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import { selectRegionsData } from 'store/regions/selectors'
import { setRegionOptions, setRegionsData, setTexts } from 'store/regions/slice'
import { T_RegionOptions, T_RegionsState } from 'store/regions/types'
import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { TextFormat } from './TextFormat'
import styles from './styles.module.css'
import Title from 'antd/es/typography/Title'
import { useTranslations } from 'hooks/useTranslations'

export const DataInput: FC = () => {
  const dispatch = useTypedDispatch()
  const data = useTypedSelector(selectRegionsData)
  const [isProcessedTable, setIsProcessedTable] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [unProcessedText, setUnprocessedText] = useState('')
  const translations = useTranslations()
  const [api, contextHolder] = notification.useNotification()

  const openNotification = () => {
    api.info({
      message: `Notification`,
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    })
  }

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
    if (hasError) setHasError(false)
    setUnprocessedText(e.target.value)
  }, [])

  const handleCloseError = useCallback(() => {
    setHasError(false)
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
        const id = text.split(' ').join('').toLowerCase()
        acc.byId[id] = {
          id,
          text,
          value: +value,
        }
        acc.allIds.push(id)
        return acc
      }, state) as T_RegionsState

      dispatch(setRegionsData(regionsState))
      setIsProcessedTable(true)
    } catch {
      setHasError(true)
    }
  }

  if (!isProcessedTable)
    return (
      <Flex vertical gap="small">
        <TextFormat value={unProcessedText} onChange={handleChange} />
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
        return  <Title style={{margin: '0 0 0 8px', textAlign: 'left', textTransform: 'uppercase', fontSize: 14 }} level={5}>#{value}</Title>
      },
    },
    {
      key: 'name',
      title: translations.regionName,
      dataIndex: 'text',
      render: (value, record) => {
        return <Input name={record.id} value={value} data-region-option-name="text" onChange={handleTextChange} />
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
