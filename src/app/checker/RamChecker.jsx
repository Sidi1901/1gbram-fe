'use client'

import { useState } from 'react'
import { Select, Card, Tag, Progress, Alert } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, WarningOutlined } from '@ant-design/icons'

const RAM_OPTIONS = [
  { label: '512 MB', value: 0.5 },
  { label: '1 GB', value: 1 },
  { label: '2 GB', value: 2 },
  { label: '4 GB', value: 4 },
  { label: '8 GB', value: 8 },
  { label: '16 GB', value: 16 },
]

const TOOLS = [
  { name: 'Vim / Neovim', min: 0.1, ok: 0.5, category: 'Editor' },
  { name: 'VS Code', min: 1, ok: 2, category: 'Editor' },
  { name: 'JetBrains IDEs', min: 4, ok: 8, category: 'Editor' },
  { name: 'Node.js (small project)', min: 0.5, ok: 1, category: 'Runtime' },
  { name: 'Node.js (large project)', min: 2, ok: 4, category: 'Runtime' },
  { name: 'Docker Desktop', min: 4, ok: 8, category: 'DevOps' },
  { name: 'Docker Engine (Linux)', min: 1, ok: 2, category: 'DevOps' },
  { name: 'Next.js dev server', min: 1, ok: 2, category: 'Framework' },
  { name: 'React (CRA)', min: 1, ok: 2, category: 'Framework' },
  { name: 'PostgreSQL', min: 0.5, ok: 1, category: 'Database' },
  { name: 'MySQL / MariaDB', min: 0.5, ok: 1, category: 'Database' },
  { name: 'MongoDB', min: 1, ok: 2, category: 'Database' },
  { name: 'Redis', min: 0.1, ok: 0.5, category: 'Database' },
  { name: 'Python (scripts)', min: 0.1, ok: 0.5, category: 'Runtime' },
  { name: 'Django / Flask', min: 0.5, ok: 1, category: 'Framework' },
  { name: 'Webpack build', min: 2, ok: 4, category: 'Build Tool' },
  { name: 'Vite build', min: 0.5, ok: 1, category: 'Build Tool' },
  { name: 'GitHub Actions runner', min: 2, ok: 4, category: 'DevOps' },
]

function getStatus(ram, tool) {
  if (ram >= tool.ok) return 'ok'
  if (ram >= tool.min) return 'warn'
  return 'fail'
}

const STATUS_META = {
  ok: { color: 'success', icon: <CheckCircleOutlined />, label: 'Runs well', tagColor: 'green' },
  warn: { color: 'warning', icon: <WarningOutlined />, label: 'May struggle', tagColor: 'orange' },
  fail: { color: 'error', icon: <CloseCircleOutlined />, label: 'Not recommended', tagColor: 'red' },
}

export default function RamChecker() {
  const [ram, setRam] = useState(null)

  const categories = [...new Set(TOOLS.map((t) => t.category))]

  const summary = ram
    ? {
        ok: TOOLS.filter((t) => getStatus(ram, t) === 'ok').length,
        warn: TOOLS.filter((t) => getStatus(ram, t) === 'warn').length,
        fail: TOOLS.filter((t) => getStatus(ram, t) === 'fail').length,
      }
    : null

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <label className="text-gray-700 font-medium text-base">Your RAM:</label>
        <Select
          options={RAM_OPTIONS}
          placeholder="Select RAM amount"
          onChange={setRam}
          size="large"
          className="w-48"
        />
      </div>

      {ram && summary && (
        <>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Compatible', count: summary.ok, color: '#52c41a' },
              { label: 'Marginal', count: summary.warn, color: '#faad14' },
              { label: 'Incompatible', count: summary.fail, color: '#ff4d4f' },
            ].map(({ label, count, color }) => (
              <Card key={label} className="text-center shadow-sm">
                <p className="text-3xl font-bold mb-1" style={{ color }}>{count}</p>
                <p className="text-gray-500 text-sm">{label}</p>
              </Card>
            ))}
          </div>

          <div className="space-y-8">
            {categories.map((cat) => {
              const tools = TOOLS.filter((t) => t.category === cat)
              return (
                <div key={cat}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{cat}</h3>
                  <div className="space-y-3">
                    {tools.map((tool) => {
                      const status = getStatus(ram, tool)
                      const meta = STATUS_META[status]
                      return (
                        <div
                          key={tool.name}
                          className="flex items-center justify-between bg-white border border-gray-100 rounded-lg px-4 py-3 shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            <span className={`text-lg text-${meta.color === 'success' ? 'green' : meta.color === 'warning' ? 'yellow' : 'red'}-500`}>
                              {meta.icon}
                            </span>
                            <span className="text-gray-800 font-medium text-sm">{tool.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-400">min {tool.min < 1 ? `${tool.min * 1024}MB` : `${tool.min}GB`}</span>
                            <Tag color={meta.tagColor} className="text-xs">{meta.label}</Tag>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {!ram && (
        <Alert
          type="info"
          message="Select your RAM amount above to see compatibility results."
          showIcon
        />
      )}
    </div>
  )
}
