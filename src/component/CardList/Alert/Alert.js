import { Alert, Space } from 'antd';


const Alerts = (props) => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >    
    <Alert message={props.errorText} type="error" />
  </Space>
);
export default Alerts;