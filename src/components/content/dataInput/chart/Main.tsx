import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Flex, Input } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import Title from 'antd/es/typography/Title'
import { REGIONS_LOCALIZE_OPTIONS } from 'helpers/constants/localization'
import { REGIONS_IDS_LIST, REGIONS_INITIAL_OPTIONS } from 'helpers/constants/regions'
import { isNumber, isSimilar } from 'helpers/functions/commons'
import { selectSelectedLanguage } from 'store/chart/selectors'
import { selectRegionsData } from 'store/regions/selectors'
import { setRegionOptions, setRegionsData } from 'store/regions/slice'
import { T_RegionOptions, T_RegionsState } from 'store/regions/types'
import { useInitialTextDataInput } from 'hooks/useInitialTextDataInput'
import { useTranslations } from 'hooks/useTranslations'
import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { TextFormat } from './TextFormat'
import styles from './styles.module.css'

export const DataInput: FC = memo(() => {
  const dispatch = useTypedDispatch()
  const data = useTypedSelector(selectRegionsData)
  const selectedLanguage = useTypedSelector(selectSelectedLanguage)
  const [isProcessedTable, setIsProcessedTable] = useState(false)
  const initialUnprocessedText = useInitialTextDataInput()
  const [unProcessedText, setUnprocessedText] = useState(() => initialUnprocessedText)
  const translations = useTranslations()

  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { name, value } = e.target
      const attrName = e.currentTarget.getAttribute('data-region-option-name') as keyof T_RegionOptions
      dispatch(
        setRegionOptions({
          id: name as T_RegionOptions['id'],
          [attrName]: value,
        })
      )
    },
    [dispatch]
  )

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

    const tabSpaceRegExp = /[\t ]+/
    const insertedData = rows.reduce((acc, row) => {
      const extractedValuesFromRow = row.split(tabSpaceRegExp)
      const text =
        extractedValuesFromRow.length > 2
          ? extractedValuesFromRow.slice(0, extractedValuesFromRow.length - 1).join('')
          : extractedValuesFromRow[0]
      const value = extractedValuesFromRow[extractedValuesFromRow.length - 1]

      const almostId = text.split(' ').join('').toLowerCase() as keyof T_RegionsState['byId']
      let foundId = REGIONS_IDS_LIST.find((id) => almostId.includes(id) || isSimilar(almostId, id))

      if (!foundId)
        foundId = REGIONS_IDS_LIST.reduce(
          (res, id) => {
            const possibleMatcher = REGIONS_LOCALIZE_OPTIONS['am'][id].toLowerCase()

            if ((!res && almostId.includes(possibleMatcher)) || isSimilar(possibleMatcher, almostId)) res = id
            return res
          },
          '' as keyof T_RegionsState['byId']
        ) as keyof T_RegionsState['byId']

      if (!foundId) return acc

      acc[foundId] = {
        id: foundId,
        text,
        value: +value,
      }
      return acc
    }, {} as any)

    const regionsState = REGIONS_IDS_LIST.reduce((acc, id) => {
      const foundRegion = insertedData[id]
      const newRow: T_RegionOptions = {
        ...REGIONS_INITIAL_OPTIONS[id],
        text: foundRegion?.text ?? '',
        value: foundRegion?.value ?? '',
      }

      acc[id] = newRow
      return acc
    }, state)

    dispatch(
      setRegionsData({
        byId: regionsState,
        allIds: REGIONS_IDS_LIST,
      })
    )
    setIsProcessedTable(true)
  }

  useEffect(() => {
    setUnprocessedText(initialUnprocessedText)
  }, [selectedLanguage])

  const columns: ColumnsType<T_RegionOptions> = useMemo(
    () => [
      {
        key: 'id',
        title: translations.regionID,
        dataIndex: 'id',
        render: (value: keyof T_RegionsState['byId']) => {
          return (
            <Title
              style={{ margin: '0 0 0 8px', textAlign: 'left', textTransform: 'uppercase', fontSize: 14 }}
              level={5}
            >
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
              status={isNumber(+value) && value !== '' ? undefined : 'error'}
            />
          )
        },
      },
    ],
    [translations, handleTextChange]
  )

  const dataSource: T_RegionOptions[] = useMemo(() => {
    return REGIONS_IDS_LIST.map((regionId) => ({
      key: regionId,
      ...data.byId[regionId],
      id: regionId,
    }))
  }, [data.byId])

  if (!isProcessedTable) {
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
  }

  return (
    <div className="normalized-table-wrapper">
      <Table columns={columns} dataSource={dataSource} pagination={false} bordered />
    </div>
  )
})
