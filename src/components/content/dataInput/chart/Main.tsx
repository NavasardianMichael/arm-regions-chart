import { FC, useCallback, useState } from 'react'
import { WarningFilled } from '@ant-design/icons'
import { Button, Flex, Input, Tooltip } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import Title from 'antd/es/typography/Title'
import { REGIONS_IDS_LIST, REGIONS_INITIAL_OPTIONS } from 'helpers/constants/regions'
import { isNumber } from 'helpers/functions/commons'
import { selectRegionsData } from 'store/regions/selectors'
import { setRegionOptions, setRegionsData } from 'store/regions/slice'
import { T_RegionOptions, T_RegionsState } from 'store/regions/types'
import { useTranslations } from 'hooks/useTranslations'
import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { TextFormat } from './TextFormat'
import styles from './styles.module.css'

export const DataInput: FC = () => {
  const dispatch = useTypedDispatch()
  const data = useTypedSelector(selectRegionsData)
  const [isProcessedTable, setIsProcessedTable] = useState(false)
  const [unProcessedText, setUnprocessedText] = useState('')
  const [formatError, setFormatError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<keyof T_RegionsState['byId'], string>>(
    REGIONS_IDS_LIST.reduce(
      (acc, id) => {
        acc[id] = ''
        return acc
      },
      {} as Record<keyof T_RegionsState['byId'], string>
    )
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
    // try {
      const rows = unProcessedText
        .trim()
        .split('\n')
        .filter((row) => !!row)

      let state = {} as T_RegionsState['byId']
      

      const insertedData =  rows.reduce((acc, row) => {
        const [text, value] = row.split('\t')
        const id = text.split(' ').join('').toLowerCase() as keyof T_RegionsState['byId']
        if(!id) return acc
        acc[id] = {
          id,
          text,
          value: +value
        }
        return acc
      }, {} as Record<keyof T_RegionsState['byId'], Pick<T_RegionOptions, 'id' | 'text' | 'value'>>)

      console.log({insertedData});
      const regionsState = REGIONS_IDS_LIST.reduce((acc, id) => {


        const newRow: T_RegionOptions = 
          {
            ...REGIONS_INITIAL_OPTIONS[id],
            ...insertedData[id],
            text: insertedData[id]?.text ?? '',
            value: insertedData[id]?.value ?? ''
          }
        

        console.log({id, newRow});
        acc[id] = newRow
        return acc

      }, state) 

      // if(!regionsState.allIds.length) {
      //   setFormatError('The data you entered cannot be formatted, please ensure it matches the expected pattern')
      //   setUnprocessedText('')
      //   return
      // }

      setFieldErrors((prev) => {
        const newErrorFields = REGIONS_IDS_LIST.reduce(
          (errorFieldIds, id) => {
            if (!isNumber(regionsState[id].value)) errorFieldIds[id] = `The row with identificator "${id}" suffers a problem`
            return errorFieldIds
          },
          prev as typeof fieldErrors
        )

        return newErrorFields
      })

      dispatch(setRegionsData({
        byId: regionsState,
        allIds: REGIONS_IDS_LIST
      }))
      setIsProcessedTable(true)
    // } catch (e) {
    //   setFormatError('The data you entered cannot be formatted, please ensure it matches the expected pattern')
    // }
  }

  if (!isProcessedTable) {
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
  }

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
            status={!value ? 'error' : undefined}
            prefix={
              value ? 
                null :
                (
                  <Tooltip placement="top" title={fieldErrors[record.id]}>
                    <WarningFilled />
                  </Tooltip>
                )
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
        console.log({ value, id: record.id}, isNumber(value))

        return (
          <Input
            type="number"
            name={record.id}
            value={value}
            data-region-option-name="value"
            onChange={handleTextChange}
            status={isNumber(value) ? undefined : 'error'}
          />
        )
      },
    },
  ]

  const dataSource: T_RegionOptions[] = REGIONS_IDS_LIST.map((regionId) => ({ key: regionId, ...data.byId[regionId], id: regionId }))

  return (
    <div className="normalized-table-wrapper">
      <Table columns={columns} dataSource={dataSource} pagination={false} bordered />
    </div>
  )
}
