import { Button, Card, Typography } from 'antd'
import './index.css'

const { Title, Text } = Typography

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center space-y-4">
          <Title level={2} className="!mb-0">
            React + Ant Design + Tailwind
          </Title>
          <Text type="secondary">Connected to Strapi backend</Text>
          <div className="flex gap-3 justify-center pt-2">
            <Button type="primary">Primary Action</Button>
            <Button>Secondary</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default App
