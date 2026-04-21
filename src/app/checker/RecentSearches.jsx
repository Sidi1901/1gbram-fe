"use client";

import { Tag, Flex, Skeleton } from "antd";
import { FireOutlined } from "@ant-design/icons";

export function RecentSearchesSkeleton() {
  return (
    <Flex wrap gap="small" style={{ marginTop: 16 }} className="sm:!px-[30px] justify-center">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton.Button key={i} active size="default" shape="round" style={{ width: 120 }} />
      ))}
    </Flex>
  );
}

export function RecentSearches({ recentSearches, onClick }) {
  return (
    <Flex
      wrap
      gap="small"
      style={{ marginTop: 16, marginBottom: 16 }}
      className="sm:!px-[30px] justify-center"
    >
      {recentSearches.map((term) => (
        <Tag
          key={term}
          onClick={() => onClick(term)}
          icon={<FireOutlined style={{ color: "#fb923c" }} />}
          className="transition-all duration-150 hover:!scale-105 hover:!shadow-md active:!scale-95"
          style={{
            cursor: "pointer",
            borderRadius: 999,
            padding: "10px 17px",
            fontSize: 13,
            userSelect: "none",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          {term}
        </Tag>
      ))}
    </Flex>
  );
}
