import { memo, SyntheticEvent } from 'react'
import { Input } from 'antd';

interface PropsTextArea {
  rows: number
  onChange?: (e: SyntheticEvent) => void;
}

const TextArea = (props: PropsTextArea) => {
  return (
    <Input.TextArea {...props} />
  )
}

export default memo(TextArea)
