import { memo } from 'react'
import { Select } from 'antd'

interface PropsCompSelect {
  name?: string;
  showSearch?: boolean;
  source: { id: number; label: string }[]
  placeholder?: string
  onChange?: (value: number) => void
  disabled?: boolean
  onClick?: () => void
}

const CompSelect = (props: PropsCompSelect) => {
  return (
    <Select
      style={{ width: '100%' }}
      optionFilterProp="children"
      {...props}
    >
      {props.source.map((x, i) => (<Select.Option key={i} value={x.id}>{x.label}</Select.Option>))}
    </Select>
  )
}

export default memo(CompSelect)
