import { DollarCircleOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React from 'react'
import { Text } from '../text'
import { Area, AreaConfig } from '@ant-design/plots'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { DashboardDealsChartQuery } from '@/graphql/types'
import { DASHBOARD_DEALS_CHART_QUERY } from '@/graphql/queries'
import { useList } from '@refinedev/core'
import { mapDealsData } from '@/utilities/helpers'

const DealsChart = () => {

  const {data} = useList<GetFieldsFromList<DashboardDealsChartQuery>>({
    resource: 'dealStages',
    filters: [
      {
        field: 'title', operator: 'in', value: ['WON', 'LOST']
      }
    ],
    meta: {
      gqlQuery: DASHBOARD_DEALS_CHART_QUERY
    }
  });

  const dealData = React.useMemo(() => {
    return mapDealsData(data?.data);
  }, [data?.data])

  const config: AreaConfig = {
    data: dealData,
    xField: 'timeText',
    yField: 'value',
    isStack: false,
    seriesField: 'state',
    animation: true,
    startOnZero: false,
    smooth: true,
    legend: {
      offsetY: -6
    },
    yAxis: {
      tickCount: 4,
      label: {
        formatter: (v: string) =>{
          return `£${Number(v) /1000}K`
        }
      }
    },
    tooltip: {
      formatter: (data) => {
        return{
          name: data.state,
          value: `£${Number(data.value) / 1000}K`
        }
      }
    }
  }

  return (
    <Card
      style={ {height: '100%'}}
      headStyle={{ padding: '8px 16px' }}
      bodyStyle={{ padding: '24px 24px 0 24px' }}
      title={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <DollarCircleOutlined/>
          <Text size="sm" style={{ marginLeft:'0.5rem' }}>
            Deals
          </Text>
        </div>
      }
    >
      <Area {...config} height={325} />
    </Card>
  )
}

export default DealsChart