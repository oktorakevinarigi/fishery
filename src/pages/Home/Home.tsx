import { useEffect, useCallback } from 'react'
import { Collapse, Row, Col, Button, Card, Form } from 'antd';
// import { PlusCircleOutlined } from '@ant-design/icons';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import BlockUi from "react-block-ui";

import { actHome } from '../../redux/actions'
import Header from '../../components/Header'
import CompInput from '../../components/Input'
import CompSelect from '../../components/Select'
import CompTable from './Table'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 10 }
  },
};

const RenderHome = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector((state: RootStateOrAny) => state.Home.isLoading)
  const sourceArea = useSelector((state: RootStateOrAny) => state.Home.sourceArea)
  const sourceSize = useSelector((state: RootStateOrAny) => state.Home.sourceSize)
  const komoditas = useSelector((state: RootStateOrAny) => state.Home.komoditas)
  const areaId = useSelector((state: RootStateOrAny) => state.Home.areaId)
  const sizeId = useSelector((state: RootStateOrAny) => state.Home.sizeId)
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(actHome.fetchData())
  }, [dispatch])

  useEffect(() => {
    form.setFieldsValue({
      komoditas: komoditas,
      area: areaId,
      size: sizeId,
    });
  }, [areaId, sizeId, komoditas, form])

  const handleState = useCallback((field: string, value: string | number) => {
    dispatch(actHome.handleState(field, value))
  }, [dispatch])

  // const onAdd = useCallback(() => {
  //   history.push("/form")
  // }, [history])

  const onFinish = useCallback(() => {
    dispatch(actHome.fetchSearch())
  }, [dispatch])

  const onClear = useCallback(() => {
    form.resetFields();
    dispatch(actHome.fetchClear())
  }, [dispatch, form])

  return (
    <BlockUi
      tag="div"
      blocking={isLoading}
      style={{ height: "100%" }}
      message={
        <span>
          <div id="preloader">
            <div id="loader"></div>
          </div>
        </span>
      }
    >
      <Header>
        <Card title="Home">
          <Collapse collapsible="header" defaultActiveKey={['1']}>
            <Collapse.Panel header="Search" key="1">
              <Form
                {...formItemLayout}
                form={form}
                layout={"horizontal"}
                labelAlign="left"
                name="form-input"
                onFinish={onFinish}
              >
                <Form.Item
                  name="komoditas"
                  label="Komoditas"
                  rules={[{ required: false }]}
                >
                  <CompInput placeholder="Komoditas" onChange={(e: any) => { handleState('komoditas', e.target.value) }} />
                </Form.Item>
                <Form.Item
                  name="area"
                  label="Area"
                >
                  <CompSelect
                    showSearch={true}
                    placeholder="Select a Area"
                    source={sourceArea}
                    onChange={(value) => { handleState('areaId', value) }}
                  />
                </Form.Item>
                <Form.Item
                  name="size"
                  label="Size"
                >
                  <CompSelect
                    showSearch={true}
                    placeholder="Select a Size"
                    source={sourceSize}
                    onChange={(value) => { handleState('sizeId', value) }}
                  />
                </Form.Item>
                <Form.Item>
                  <div className="space-button-search">
                    <Button type="primary" htmlType="submit">Search</Button>
                    <Button onClick={onClear}>Clear</Button>
                  </div>
                </Form.Item>
              </Form>
            </Collapse.Panel>
          </Collapse>

          <Collapse collapsible="header" defaultActiveKey={['1']} style={{ margin: '20px 0' }}>
            <Collapse.Panel header="List of Fishery" key="1">
              {/* <Row>
              <Col span={24} className="space-tb-10">
                <Button type="primary" onClick={onAdd}><PlusCircleOutlined />ADD</Button>
              </Col>
            </Row> */}
              <Row>
                <Col span={24}>
                  <CompTable />
                </Col>
              </Row>
            </Collapse.Panel>
          </Collapse>
        </Card>
      </Header>

    </BlockUi>
  )
}

export default RenderHome
