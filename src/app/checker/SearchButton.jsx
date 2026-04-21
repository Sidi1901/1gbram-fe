"use client";

import { Spin } from "antd";

export default function SearchButton({ query, searching, onSearch }) {
  const disabled = !query.trim() || searching;

  return (
    <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
      <button
        type="submit"
        aria-label="Search system requirements"
        disabled={disabled}
        onClick={onSearch}
        className="hover:scale-[1.04] hover:!shadow-[0_8px_24px_rgba(99,102,241,0.45)] active:scale-[0.96] transition-all duration-150 disabled:pointer-events-none"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          padding: "12px 20px",
          background: "linear-gradient(135deg, #6366f1, #3b82f6)",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: 600,
          fontSize: 15,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          width: "40%",
          minWidth: 160,
          minHeight: 44,
          opacity: disabled ? 0.45 : 1,
        }}
      >
        {searching ? (
          <Spin size="small" style={{ filter: "brightness(10)" }} />
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M10 2a8 8 0 105.3 14l4.4 4.4 1.4-1.4-4.4-4.4A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
            </svg>
          </>
        )}
        <span>{searching ? "Searching…" : "Search"}</span>
      </button>
    </div>
  );
}
