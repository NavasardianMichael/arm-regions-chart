import { FC, useState } from 'react'
import { renderToString } from 'react-dom/server'
import { useDispatch } from 'react-redux'
import { DownloadOutlined, FormatPainterOutlined } from '@ant-design/icons'
import { Button, Col, Flex, Form, InputNumber, Select, Slider } from 'antd'
import { ASSET_TYPES, HANDLERS_BY_ASSET_TYPE } from 'helpers/constants/chart'
import { applyRandomStyles } from 'store/chart/slice'
import { T_ChartState } from 'store/chart/types'
import { T_RegionsState } from 'store/regions/types'
import { useTranslations } from 'hooks/useTranslations'
import { Chart } from 'components/content/ui/chart/Main'

type T_Props = {
  data: T_RegionsState
  chart: T_ChartState
}

export const ChartDownloadPanel: FC<T_Props> = ({ data, chart }) => {
  const dispatch = useDispatch()
  const [assetType, setAssetType] = useState<(typeof ASSET_TYPES)[keyof typeof ASSET_TYPES]>(ASSET_TYPES.png)
  const [quality, setQuality] = useState(60)
  const translations = useTranslations()

  const handleChangeAssetType = (v: typeof assetType) => {
    setAssetType(v)
  }

  const handleClick = () => {
    const svgMarkup = <Chart data={data} chart={chart} />
    const svgStr = renderToString(svgMarkup)

    HANDLERS_BY_ASSET_TYPE[assetType](svgStr, quality)
  }

  const generateRandomStyles = () => {
    dispatch(applyRandomStyles())
  }

  return (
    <Flex justify="space-between" align="start" gap="middle">
      <Flex vertical gap='middle'>
        <Form.Item label={translations.exportType} style={{ margin: 0 }}>
          <Flex gap="small">
            <Select onChange={handleChangeAssetType} value={assetType} style={{ width: 100 }}>
              <Select.Option value={ASSET_TYPES.pdf}>{ASSET_TYPES.pdf}</Select.Option>
              <Select.Option value={ASSET_TYPES.png}>{ASSET_TYPES.png}</Select.Option>
              <Select.Option value={ASSET_TYPES.svg}>{ASSET_TYPES.svg}</Select.Option>
            </Select>
            <Button type="primary" icon={<DownloadOutlined />} onClick={handleClick}>
              {translations.download} {assetType}
            </Button>
          </Flex>
        </Form.Item>
        {
          assetType !== ASSET_TYPES.svg &&
          <Form.Item label={translations.downloadQuality}>
            <Flex gap="middle" style={{ width: 420 }}>
              <Col span={12}>
                <Slider
                  min={1}
                  max={100}
                  onChange={(value) => setQuality(+value)}
                  value={typeof quality === 'number' ? quality : 0}
                />
              </Col>
              <Col span={3}>
                <InputNumber
                  min={1}
                  max={100}
                  value={quality}
                  onChange={(value) => setQuality(value ?? 0)}
                />
              </Col>
            </Flex>
          </Form.Item>
        }
      </Flex>
      <Button
        type="dashed"
        style={{ width: 'max-content' }}
        icon={<FormatPainterOutlined />}
        onClick={generateRandomStyles}
      >
        {translations.generateRandomStyles}
      </Button>
    </Flex>
  )
}
