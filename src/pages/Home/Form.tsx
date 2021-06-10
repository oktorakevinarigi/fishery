
import { useCallback, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { Form, Button, Card } from 'antd';
import BlockUi from "react-block-ui";

import Header from '../../components/Header'
import CompSelect from '../../components/Select'
import CompInput from '../../components/Input'
import { actHome } from '../../redux/actions';
import { SwalConfirm } from '../../utils/Sweetalert'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
    md: { span: 4 }
  },
};

const RenderForm = () => {
  const history: any = useHistory()
  const { id }: { id: string } = useParams();
  const dispatch = useDispatch()
  const isLoading = useSelector((state: RootStateOrAny) => state.Home.isLoading)
  const sourceArea = useSelector((state: RootStateOrAny) => state.Home.sourceArea)
  const sourceSize = useSelector((state: RootStateOrAny) => state.Home.sourceSize)
  const formInput = useSelector((state: RootStateOrAny) => state.Home.form)
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      komoditas: formInput.komoditas,
      area: formInput.areaId,
      size: formInput.sizeId,
      price: formInput.price
    });
  }, [formInput, form])

  useEffect(() => {
    dispatch(actHome.fetchGetEdit(id))
  }, [id, dispatch])

  const handleState = useCallback((field: string, value: string | number) => {
    dispatch(actHome.handleStateForm(field, value))
  }, [dispatch])

  const onSave = useCallback(() => {
    dispatch(actHome.fetchSubmitForm(history, id))
  }, [dispatch, id, history])

  const onClear = useCallback(() => {
    form.resetFields();
    dispatch(actHome.clearStateForm())
  }, [form, dispatch])

  const onCancel = useCallback(async () => {
    const result = await SwalConfirm({})
    result && history.goBack()
  }, [history])

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
        <Card title={`${id ? 'Edit' : 'Add'} Fishery`}>
          <Form {...formItemLayout} form={form} name="form-input" labelAlign="left" onFinish={onSave}>
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
              rules={[{ required: true, message: 'Please select a Area!' }]}
            >
              <CompSelect
                showSearch={true}
                placeholder="Select a Area"
                source={sourceArea}
                onChange={(value: number) => { handleState('areaId', value) }}
              />
            </Form.Item>
            <Form.Item
              name="size"
              label="Size"
              rules={[{ required: false }]}
            >
              <CompSelect
                showSearch={true}
                placeholder="Select a Size"
                source={sourceSize}
                onChange={(value: number) => { handleState('sizeId', value) }}
              />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: false }]}
            >
              <CompInput placeholder="Price" onChange={(e: any) => { handleState('price', e.target.value) }} />
            </Form.Item>
            <Form.Item>
              <div className="space-button-form">
                <Button type="primary" htmlType="submit">
                  Save
            </Button>
                <Button htmlType="button" onClick={onClear}>
                  Clear
            </Button>
                <Button htmlType="button" onClick={onCancel}>
                  Cancel
            </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </Header>
    </BlockUi>
  )
}

export default RenderForm
