import { useEffect, useCallback } from 'react'
import { Collapse, Row, Col, Button, Card, Form } from 'antd';
// import { PlusCircleOutlined } from '@ant-design/icons';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import BlockUi from "react-block-ui";

import { actHome } from '../../redux/actions'
import CompSelect from '../../components/Select'
import CompTable from './Table'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
    md: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
    md: { span: 8 }
  },
};

const RenderHome = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector((state: RootStateOrAny) => state.Home.isLoading)
  const sourceArea = useSelector((state: RootStateOrAny) => state.Home.sourceArea)
  const sourceSize = useSelector((state: RootStateOrAny) => state.Home.sourceSize)
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(actHome.fetchData())
  }, [dispatch])

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
      <Card title="Fishery">
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
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
                <Button onClick={onClear}>Clear</Button>
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
    </BlockUi>
  )
}

export default RenderHome
