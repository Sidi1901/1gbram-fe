"use client";

import { useState, useEffect } from "react";
import { Input, Typography, Alert } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { fetchGoBe } from "@/lib/strapi";
import { RecentSearches, RecentSearchesSkeleton } from "./RecentSearches";
import SearchButton from "./SearchButton";
import SoftwareResults from "./SoftwareResults";
import RequirementsTable from "./RequirementsTable";

const { Text } = Typography;

export default function SearchMain() {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState(null);
  const [searchedKeyword, setSearchedKeyword] = useState("");
  const [searchError, setSearchError] = useState(null);
  const [loadingRequirements, setLoadingRequirements] = useState(false);
  const [requirements, setRequirements] = useState(null);
  const [selectedSoftware, setSelectedSoftware] = useState("");

  useEffect(() => {
    fetchGoBe("/api/v1/searches/popular")
      .then(setRecentSearches)
      .catch(() => {})
      .finally(() => setLoadingRecent(false));
  }, []);

  async function handleSearch(searchQuery) {
    const term = (searchQuery ?? query).trim();
    if (!term) return;
    setSearching(true);
    setResults(null);
    setSearchError(null);
    try {
      const data = await fetchGoBe(
        `/api/v1/softwares?software=${encodeURIComponent(term)}`,
      );
      setSearchedKeyword(data.keyword ?? term);
      setResults(data.result ?? []);
    } catch (err) {
      setSearchError(err.message);
    } finally {
      setSearching(false);
    }
  }

  function handleQueryChange(e) {
    setQuery(e.target.value);
    setResults(null);
    setSearchError(null);
  }

  function handleBack() {
    setResults(null);
    setSearchedKeyword("");
  }

  async function handleSelect(softwareName) {
    setSearchError(null);
    setLoadingRequirements(true);
    try {
      const data = await fetchGoBe(
        `/api/v1/software/requirements?software=${encodeURIComponent(softwareName)}`,
      );
      setSelectedSoftware(softwareName);
      setRequirements(data.result);
    } catch (err) {
      setSearchError(err.message);
    } finally {
      setLoadingRequirements(false);
    }
  }

  function handleBackFromRequirements() {
    setRequirements(null);
    setSelectedSoftware("");
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        border: "1px solid #f0f0f0",
        padding: "28px 32px",
      }}
    >
      <Text strong style={{ fontSize: 14, display: "block", marginBottom: 8 }}>
        Search software keyword
      </Text>

      <Input
        size="large"
        value={query}
        onChange={handleQueryChange}
        onPressEnter={() => handleSearch()}
        placeholder="e.g. Blender, GTA V, Photoshop"
        style={{ borderRadius: 10, borderColor: "#a5b4fc", borderWidth: 2 }}
      />

      <Text
        style={{
          fontSize: 12,
          color: "#9ca3af",
          display: "block",
          marginTop: 6,
        }}
      >
        Start typing — select a suggestion or press Search.
      </Text>

      {searchError && (
        <Alert
          type="error"
          title={searchError}
          // showIcon
          style={{ marginTop: 10, borderRadius: 10 }}
        />
      )}

      {!results &&
        (loadingRecent ? (
          <RecentSearchesSkeleton />
        ) : (
          recentSearches.length > 0 && (
            <RecentSearches
              recentSearches={recentSearches}
              onClick={(term) => {
                setQuery(term);
                handleSearch(term);
              }}
            />
          )
        ))}

      {!results && (
        <SearchButton
          query={query}
          searching={searching}
          onSearch={() => handleSearch()}
        />
      )}

      {results && !requirements && (
        <SoftwareResults
          results={results}
          keyword={searchedKeyword}
          loading={loadingRequirements}
          onBack={handleBack}
          onSelect={handleSelect}
        />
      )}

      {requirements && (
        <RequirementsTable
          data={requirements}
          softwareName={selectedSoftware}
          onBack={handleBackFromRequirements}
        />
      )}

      <Text
        style={{
          fontSize: 12,
          color: "#9ca3af",
          display: "flex",
          alignItems: "flex-start",
          gap: 6,
          marginTop: 14,
        }}
      >
        <InfoCircleOutlined style={{ marginTop: 2, flexShrink: 0 }} />
        AI-generated estimates — results may not always be fully accurate.
        Verify with official sources.
      </Text>
    </div>
  );
}
