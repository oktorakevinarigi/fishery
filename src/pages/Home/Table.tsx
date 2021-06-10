import { useCallback, memo } from 'react'
import { useHistory } from "react-router-dom";
import { Button, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'

import { actHome } from '../../redux/actions'
import { SwallInfo, SwalConfirm } from '../../utils/Sweetalert'

const CompTable = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const list = useSelector((state: RootStateOrAny) => state.Home.list)

  const onDelete = useCallback(async (uuid: string) => {
    if (uuid) {
      const result = await SwalConfirm({ title: 'Are you sure want to delete?', text: '' })
      result && dispatch(actHome.fetchDelete(uuid))
    } else {
      SwallInfo("UUID not found")
    }
  }, [dispatch])

  const onEdit = useCallback((uuid: string) => {
    if (uuid) {
      history.push(`/form/${uuid}`)
    } else {
      SwallInfo("UUID not found")
    }
  }, [history])

  const columns = [
    {
      title: 'Action',
      dataIndex: 'select',
      width: 70,
      render: (value: string, { uuid }: { uuid: string }) => (
        <div style={{ display: 'flex', width: 100, justifyContent: 'space-between' }}>
          <Button onClick={() => { onEdit(uuid) }}><EditOutlined /></Button>
          <Button danger onClick={() => { onDelete(uuid) }}><DeleteOutlined /></Button>
        </div>
      ),
    },
    {
      title: 'Komoditas',
      dataIndex: 'komoditas',
      sorter: (a: any, b: any) => a.komoditas.localeCompare(b.komoditas),
    },
    {
      title: 'Provinsi',
      dataIndex: 'area_provinsi',
      sorter: (a: any, b: any) => a.area_provinsi.localeCompare(b.area_provinsi),
    },
    {
      title: 'Kota',
      dataIndex: 'area_kota',
      sorter: (a: any, b: any) => a.area_kota.localeCompare(b.area_kota),
    },
    {
      title: 'Size',
      dataIndex: 'size',
      sorter: (a: any, b: any) => a.size.localeCompare(b.size),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a: any, b: any) => a.price.localeCompare(b.price),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={list}
      scroll={{ x: 1200 }}
      pagination={{ pageSize: 50 }}
    />
  )
}

export default memo(CompTable)
