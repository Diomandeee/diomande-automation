"use client";

import { useState, useMemo, useCallback, useEffect, useRef, lazy, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Filter, Search, X, LayoutGrid, GitBranch, Github, Globe, Unlock, ArrowUpDown } from "lucide-react";
import { projects, categories, type Maturity, type DeviceType } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { trackEvent } from "@/lib/analytics";

const InterconnectionMap = lazy(() =>
  import("@/components/projects/InterconnectionMap").then((m) => ({
    default: m.InterconnectionMap,
  }))
);

const allCategories = ["All" as const, ...categories];

const maturityOptions: { value: Maturity | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "production", label: "Production" },
  { value: "mvp", label: "MVP" },
  { value: "prototype", label: "Prototype" },
];

const deviceOptions: { value: DeviceType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "iphone", label: "iPhone" },
  { value: "mac", label: "Mac" },
  { value: "browser", label: "Browser" },
  { value: "terminal", label: "Terminal" },
  { value: "code-editor", label: "Code Editor" },
];

export function ProjectDirectory() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const viewParam = searchParams.get("view");
  const [view, setView] = useState<"grid" | "map">(viewParam === "map" ? "map" : "grid");
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "All");
  const [maturityFilter, setMaturityFilter] = useState<Maturity | "all">(
    (searchParams.get("maturity") as Maturity | "all") || "all"
  );
  const [deviceFilter, setDeviceFilter] = useState<DeviceType | "all">(
    (searchParams.get("device") as DeviceType | "all") || "all"
  );
  const [showHasDemo, setShowHasDemo] = useState(searchParams.get("demo") === "true");
  const [showHasSource, setShowHasSource] = useState(searchParams.get("source") === "true");
  const [showOpenSource, setShowOpenSource] = useState(searchParams.get("oss") === "true");
  const [sortBy, setSortBy] = useState<"featured" | "name" | "hours" | "maturity">(
    (searchParams.get("sort") as "featured" | "name" | "hours" | "maturity") || "featured"
  );

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Track searches
  const lastTrackedQuery = useRef("");
  useEffect(() => {
    if (debouncedQuery.trim() && debouncedQuery !== lastTrackedQuery.current) {
      lastTrackedQuery.current = debouncedQuery;
      trackEvent("search", { query: debouncedQuery });
    }
  }, [debouncedQuery]);

  // Sync filters to URL
  const syncURL = useCallback(
    (params: Record<string, string>) => {
      const sp = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v && v !== "All" && v !== "all" && v !== "") sp.set(k, v);
      });
      const qs = sp.toString();
      router.replace(qs ? `/projects?${qs}` : "/projects", { scroll: false });
    },
    [router]
  );

  useEffect(() => {
    syncURL({
      q: debouncedQuery,
      category: activeCategory,
      maturity: maturityFilter,
      device: deviceFilter,
      demo: showHasDemo ? "true" : "",
      source: showHasSource ? "true" : "",
      oss: showOpenSource ? "true" : "",
      sort: sortBy !== "featured" ? sortBy : "",
    });
  }, [debouncedQuery, activeCategory, maturityFilter, deviceFilter, showHasDemo, showHasSource, showOpenSource, sortBy, syncURL]);

  const filtered = useMemo(() => {
    let result = projects;

    // Category
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Maturity
    if (maturityFilter !== "all") {
      result = result.filter((p) => p.maturity === maturityFilter);
    }

    // Device
    if (deviceFilter !== "all") {
      result = result.filter((p) => p.deviceType === deviceFilter);
    }

    // Has Demo
    if (showHasDemo) {
      result = result.filter((p) => p.links?.some((l) => l.url) || p.testflight?.status === "active");
    }

    // Has Source Code
    if (showHasSource) {
      result = result.filter((p) => p.github);
    }

    // Open Source
    if (showOpenSource) {
      result = result.filter((p) => p.github?.visibility === "public");
    }

    // Search
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.tech.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    const maturityOrder: Record<string, number> = { production: 0, mvp: 1, prototype: 2 };
    switch (sortBy) {
      case "name":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "hours":
        result = [...result].sort((a, b) => (b.buildHours ?? 0) - (a.buildHours ?? 0));
        break;
      case "maturity":
        result = [...result].sort((a, b) => (maturityOrder[a.maturity] ?? 9) - (maturityOrder[b.maturity] ?? 9));
        break;
      default: // featured
        result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [activeCategory, maturityFilter, deviceFilter, showHasDemo, showHasSource, showOpenSource, debouncedQuery, sortBy]);

  const counts = allCategories.map((cat) => ({
    name: cat,
    count: cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length,
  }));

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Project Directory
        </h1>
        <p className="text-lg text-[#b0b0c8] max-w-2xl">
          {projects.length} projects built with the mesh. iOS apps, web
          platforms, AI infrastructure, creative tools, and more — all started
          from a message in Discord.
        </p>
      </motion.div>

      {/* View toggle */}
      <div className="flex items-center gap-2 mb-6">
        {(
          [
            { key: "grid" as const, icon: LayoutGrid, label: "Grid" },
            { key: "map" as const, icon: GitBranch, label: "Map" },
          ] as const
        ).map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            onClick={() => {
              setView(key);
              const sp = new URLSearchParams(searchParams.toString());
              if (key === "map") sp.set("view", "map");
              else sp.delete("view");
              const qs = sp.toString();
              router.replace(qs ? `/projects?${qs}` : "/projects", { scroll: false });
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              view === key
                ? "bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20"
                : "bg-white/5 text-[#7a7a95] border border-white/5 hover:text-white hover:border-white/10"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {view === "map" ? (
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-96 text-[#6b6b80]">
              Loading interconnection map...
            </div>
          }
        >
          <InterconnectionMap />
        </Suspense>
      ) : (
        <>
          {/* Search */}
          <div className="relative mb-6 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a7a95]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, tags, tech..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/[0.08] text-white text-sm placeholder:text-[#6b6b80] focus:outline-none focus:border-[#00d4ff]/30 focus:bg-white/[0.07] transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b80] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-[#7a7a95] shrink-0" />
            {counts.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === cat.name
                    ? "bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20"
                    : "bg-white/5 text-[#7a7a95] border border-white/5 hover:text-white hover:border-white/10"
                }`}
              >
                {cat.name}
                <span className="ml-1.5 opacity-60">{cat.count}</span>
              </button>
            ))}
          </div>

          {/* Maturity + Device filters */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-[#6b6b80] mr-1">Maturity:</span>
              {maturityOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setMaturityFilter(opt.value)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    maturityFilter === opt.value
                      ? "bg-[#8b5cf6]/10 text-[#8b5cf6] border border-[#8b5cf6]/20"
                      : "bg-white/5 text-[#6b6b80] border border-transparent hover:text-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-[#6b6b80] mr-1">Device:</span>
              {deviceOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setDeviceFilter(opt.value)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    deviceFilter === opt.value
                      ? "bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20"
                      : "bg-white/5 text-[#6b6b80] border border-transparent hover:text-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick filter toggles + sort */}
          <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
            <div className="flex items-center gap-2">
              {[
                { key: "demo", icon: Globe, label: "Has Demo", active: showHasDemo, toggle: () => setShowHasDemo(!showHasDemo) },
                { key: "source", icon: Github, label: "Has Source", active: showHasSource, toggle: () => setShowHasSource(!showHasSource) },
                { key: "oss", icon: Unlock, label: "Open Source", active: showOpenSource, toggle: () => setShowOpenSource(!showOpenSource) },
              ].map(({ key, icon: Icon, label, active, toggle }) => (
                <button
                  key={key}
                  onClick={toggle}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    active
                      ? "bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20"
                      : "bg-white/5 text-[#7a7a95] border border-white/5 hover:text-white hover:border-white/10"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#6b6b80]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-white/5 border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-[#b0b0c8] focus:outline-none focus:border-[#00d4ff]/30 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="name">Alphabetical</option>
                <option value="hours">Build Hours</option>
                <option value="maturity">Maturity</option>
              </select>
            </div>
          </div>

          {/* Result count */}
          {(debouncedQuery || maturityFilter !== "all" || deviceFilter !== "all" || showHasDemo || showHasSource || showOpenSource) && (
            <p className="text-sm text-[#7a7a95] mb-4">
              {filtered.length} project{filtered.length !== 1 ? "s" : ""} found
            </p>
          )}

          {/* Project grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                variant="directory"
                index={i}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#7a7a95] text-lg">No projects match your filters.</p>
              <button
                onClick={() => {
                  setQuery("");
                  setActiveCategory("All");
                  setMaturityFilter("all");
                  setDeviceFilter("all");
                  setShowHasDemo(false);
                  setShowHasSource(false);
                  setShowOpenSource(false);
                }}
                className="mt-3 text-sm text-[#00d4ff] hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </>
      )}

      {/* Stats footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center"
      >
        <div className="flex items-center justify-center gap-6 sm:gap-8 text-sm text-[#7a7a95] flex-wrap">
          <div>
            <span className="text-2xl font-bold text-white block">
              {projects.filter((p) => p.github).length}
            </span>
            GitHub Repos
          </div>
          <div className="w-px h-8 bg-white/10 hidden sm:block" />
          <div>
            <span className="text-2xl font-bold text-white block">
              {projects.filter((p) => p.github?.visibility === "public").length}
            </span>
            Open Source
          </div>
          <div className="w-px h-8 bg-white/10 hidden sm:block" />
          <div>
            <span className="text-2xl font-bold text-white block">
              {projects.filter((p) => p.links?.some((l) => l.url)).length}
            </span>
            Live Demos
          </div>
          <div className="w-px h-8 bg-white/10 hidden sm:block" />
          <div>
            <span className="text-2xl font-bold text-white block">
              {projects.filter((p) => p.testflight).length}
            </span>
            TestFlight Apps
          </div>
          <div className="w-px h-8 bg-white/10 hidden sm:block" />
          <div>
            <span className="text-2xl font-bold text-white block">
              {new Set(projects.flatMap((p) => p.tech)).size}+
            </span>
            Technologies
          </div>
        </div>
      </motion.div>
    </div>
  );
}
