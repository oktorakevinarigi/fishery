import { SyntheticEvent } from 'react'
import { memo } from 'react'
import { Input } from 'antd';

interface PropsInput {
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: SyntheticEvent) => void;
  onClick?: () => void;
}

const CompInput = (props: PropsInput) => {
  return (
    <Input {...props} />
  )
}

export default memo(CompInput)
