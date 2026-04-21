"use client";

import { Typography, List, Spin } from "antd";
import { ArrowLeftOutlined, AppstoreOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function SoftwareResults({ results, keyword, loading, onBack, onSelect }) {
  return (
    <div style={{ marginTop: 20 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <button
          onClick={onBack}
          className="hover:bg-indigo-50 transition-colors duration-150"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 8px",
            borderRadius: 6,
            color: "#6366f1",
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: 12 }} />
          Back
        </button>
        <Text style={{ fontSize: 13, color: "#9ca3af" }}>
          Results for <strong style={{ color: "#374151" }}>&quot;{keyword}&quot;</strong>
        </Text>
      </div>

      {/* List with overlay */}
      <div style={{ position: "relative" }}>
        {loading && (
          <div style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(2px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            borderRadius: 10,
            zIndex: 10,
          }}>
            <Spin size="default" />
            <span style={{ fontSize: 13, color: "#6366f1", fontWeight: 500 }}>Fetching requirements…</span>
          </div>
        )}
      <List
        dataSource={results}
        locale={{ emptyText: "No results found." }}
        style={{ maxHeight: 320, overflowY: "auto", paddingRight: 4 }}
        renderItem={(name) => {
          const clean = name.replace(/^"+/, "").trim();
          return (
            <List.Item style={{ padding: "4px 0", border: "none" }}>
              <button
                onClick={() => onSelect(clean)}
                className="hover:!bg-indigo-50 hover:!border-indigo-300 hover:!text-indigo-700 active:scale-[0.98] transition-all duration-150"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "10px 14px",
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: 10,
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: 14,
                  color: "#111827",
                  fontWeight: 500,
                }}
              >
                <AppstoreOutlined style={{ color: "#a5b4fc", flexShrink: 0 }} />
                {clean}
              </button>
            </List.Item>
          );
        }}
      />
      </div>
    </div>
  );
}
