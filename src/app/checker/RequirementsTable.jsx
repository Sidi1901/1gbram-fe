"use client";

import { useState } from "react";
import { Segmented, Table, Tag, Typography, Descriptions, Divider } from "antd";
import { ArrowLeftOutlined, WindowsFilled, AppleFilled, CodeOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const OS_OPTIONS = [
  { label: "Windows", value: "windows", icon: <WindowsFilled /> },
  { label: "macOS",   value: "macos",   icon: <AppleFilled /> },
  { label: "Linux",   value: "linux",   icon: <CodeOutlined /> },
];

function detectUserOS() {
  if (typeof navigator === "undefined") return "windows";
  const ua = navigator.userAgent;
  if (/Win/.test(ua)) return "windows";
  if (/Mac/.test(ua)) return "macos";
  if (/Linux/.test(ua)) return "linux";
  return "windows";
}

const gb    = (v) => v != null ? `${v} GB`    : "—";
const cores = (v) => v != null ? `${v} cores` : "—";
const ghz   = (v) => v != null ? `${v} GHz`   : "—";

const SPEC_ROWS = [
  { key: "ram",       label: "RAM",             min: (s) => gb(s.min_ram_gb),            rec: (s) => gb(s.rec_ram_gb) },
  { key: "storage",   label: "Storage",         min: (s) => gb(s.min_storage_gb),         rec: (s) => gb(s.rec_storage_gb) },
  { key: "cpu_cores", label: "CPU Cores",       min: (s) => cores(s.min_cpu_cores),       rec: (s) => cores(s.rec_cpu_cores) },
  { key: "cpu_clock", label: "CPU Clock Speed", min: (s) => ghz(s.min_cpu_clock_speed),   rec: (s) => ghz(s.rec_cpu_clock_speed) },
  { key: "gpu_vram",  label: "GPU VRAM",        min: (s) => gb(s.min_gpu_vram_gb),        rec: (s) => gb(s.rec_gpu_vram_gb) },
];

const TABLE_COLUMNS = [
  { title: "Spec",        dataIndex: "label", key: "label", width: "34%", onCell: () => ({ style: { fontWeight: 600, color: "#374151" } }) },
  { title: "Minimum",     dataIndex: "min",   key: "min",   render: (v) => <Text style={{ color: "#6b7280" }}>{v}</Text> },
  { title: "Recommended", dataIndex: "rec",   key: "rec",   render: (v) => <Text style={{ color: "#6366f1", fontWeight: 600 }}>{v}</Text> },
];

export default function RequirementsTable({ data, softwareName, onBack }) {
  const userOS = detectUserOS();
  const available = Object.keys(data);
  const defaultOS = available.includes(userOS) ? userOS : available[0];
  const [os, setOs] = useState(defaultOS);

  const spec = data[os];
  if (!spec) return null;

  const tableData = SPEC_ROWS.map((row) => ({
    key:   row.key,
    label: row.label,
    min:   row.min(spec),
    rec:   row.rec(spec),
  }));

  const osOptions = OS_OPTIONS
    .filter((o) => available.includes(o.value))
    .map((o) => ({
      value: o.value,
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {o.icon} {o.label}
        </span>
      ),
    }));

  return (
    <div style={{ marginTop: 20 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <button
          onClick={onBack}
          className="hover:bg-indigo-50 transition-colors duration-150"
          style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 8px", borderRadius: 6, color: "#6366f1", display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 500 }}
        >
          <ArrowLeftOutlined style={{ fontSize: 12 }} />
          Back
        </button>
        <Title level={5} style={{ margin: 0, color: "#111827" }}>{softwareName}</Title>
        {spec.company && <Tag color="geekblue">{spec.company}</Tag>}
      </div>

      {/* OS Toggle */}
      <Segmented
        value={os}
        onChange={setOs}
        options={osOptions}
        style={{ marginBottom: 16 }}
      />

      {/* Specs table */}
      <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid #e5e7eb" }}>
        <Table
          dataSource={tableData}
          columns={TABLE_COLUMNS}
          pagination={false}
          size="small"
        />
      </div>

      {/* Extra info */}
      <Divider style={{ margin: "16px 0" }} />
      <Descriptions column={1} size="small" bordered>
        {spec.os_version && (
          <Descriptions.Item label="OS Version">{spec.os_version}</Descriptions.Item>
        )}
        {spec.dependencies && (
          <Descriptions.Item label="Dependencies">{spec.dependencies}</Descriptions.Item>
        )}
        <Descriptions.Item label="Account Required">
          <Tag color={spec.account_required === "true" ? "red" : "green"}>
            {spec.account_required === "true" ? "Yes" : "No"}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Internet Required">
          <Tag color={spec.internet_required === "true" ? "red" : "green"}>
            {spec.internet_required === "true" ? "Yes" : "No"}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Cost">
          <div style={{ display: "flex", gap: 24 }}>
            <span><Text type="secondary" style={{ fontSize: 12 }}>Desktop </Text>{spec.cost_desktop === "0" ? <Tag color="green">Free</Tag> : `$${spec.cost_desktop}`}</span>
            <span><Text type="secondary" style={{ fontSize: 12 }}>Laptop </Text>{spec.cost_laptop  === "0" ? <Tag color="green">Free</Tag> : `$${spec.cost_laptop}`}</span>
          </div>
        </Descriptions.Item>
        {spec.notes && (
          <Descriptions.Item label="Notes">
            <Text style={{ color: "#6b7280", fontSize: 12 }}>{spec.notes}</Text>
          </Descriptions.Item>
        )}
      </Descriptions>
    </div>
  );
}
