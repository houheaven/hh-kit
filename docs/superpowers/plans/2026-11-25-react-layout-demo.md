# React Layout Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a responsive `Layout` app-shell component and a `/layout` showcase page to `demo-react`.

**Architecture:** Complete the existing `kit-react` Layout placeholder with required `header`, `sidebar`, and `children` React-node slots. Add a lazy React demo route that composes those slots, and add its entry to the home navigation. Keep demo-specific visual styling in the demo app and shell structure/responsiveness in the shared component.

**Tech Stack:** React 18, TypeScript, Vite, CSS, React Router 6, PNPM workspace.

---

### Task 1: Complete the shared Layout shell

**Files:**
- Modify: `packages/kit-react/src/layout/layout.tsx`
- Create: `packages/kit-react/src/layout/layout.css`
- Preserve: `packages/kit-react/src/layout/index.ts` and the existing `Layout` root export in `packages/kit-react/src/index.ts`

- [ ] **Step 1: Replace the placeholder component**

Replace `packages/kit-react/src/layout/layout.tsx` with:

```tsx
import React from "react";
import "./layout.css";

interface LayoutProps {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const Layout = (props: LayoutProps): React.JSX.Element => {
  const { header, sidebar, children } = props;
  return (
    <div className="hh-layout">
      <header className="hh-layout-header">{header}</header>
      <div className="hh-layout-body">
        <aside className="hh-layout-sidebar">{sidebar}</aside>
        <main className="hh-layout-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
```

- [ ] **Step 2: Add the shell structure and responsive CSS**

Create `packages/kit-react/src/layout/layout.css`:

```css
.hh-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.hh-layout-header {
  flex: 0 0 auto;
}

.hh-layout-body {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
}

.hh-layout-sidebar,
.hh-layout-content {
  min-width: 0;
}

@media (max-width: 719px) {
  .hh-layout-body {
    grid-template-columns: minmax(0, 1fr);
  }
}
```

- [ ] **Step 3: Build the component package**

Run: `pnpm --filter @houheaven/kit-react build`

Expected: Vite completes and emits the root bundle, type declarations, and CSS without TypeScript or CSS errors. The package has no unit-test runner configured, so the build is the targeted compile check for this component.

### Task 2: Add the Layout showcase page and navigation

**Files:**
- Create: `apps/demo-react/src/views/layout-view.tsx`
- Create: `apps/demo-react/src/views/layout-view.css`
- Modify: `apps/demo-react/src/router.tsx`
- Modify: `apps/demo-react/src/views/home-view.tsx`

- [ ] **Step 1: Create the Layout showcase**

Create `apps/demo-react/src/views/layout-view.tsx`:

```tsx
/* eslint-disable @typescript-eslint/naming-convention, react/forbid-component-props */

import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "@houheaven/kit-react";
import "./layout-view.css";

const navEntries = [
  { path: "/", label: "首页" },
  { path: "/hh-footer", label: "hhFooter" },
  { path: "/hh-image-dialog", label: "hhImageDialog" },
  { path: "/layout", label: "Layout" },
];

const LayoutView = (): React.JSX.Element => (
  <div className="layout-view">
    <Layout
      header={(
        <div className="layout-demo-header">
          <Link className="layout-demo-brand" to="/">hh-kit</Link>
          <span>React 组件演示</span>
        </div>
      )}
      sidebar={(
        <nav className="layout-demo-nav" aria-label="组件导航">
          {navEntries.map(entry => (
            <Link
              key={entry.path}
              className={entry.path === "/layout" ? "is-active" : ""}
              to={entry.path}
            >
              {entry.label}
            </Link>
          ))}
        </nav>
      )}
    >
      <section className="layout-demo-content">
        <p className="layout-demo-eyebrow">组件示例</p>
        <h1>Layout</h1>
        <p className="layout-demo-description">
          使用顶栏、侧边导航与主内容区组合成响应式应用框架。
        </p>
        <div className="layout-demo-cards">
          <article>
            <h2>顶栏</h2>
            <p>放置品牌标识和全局操作。</p>
          </article>
          <article>
            <h2>侧边导航</h2>
            <p>集中展示站点或应用的主要页面入口。</p>
          </article>
          <article>
            <h2>主内容区</h2>
            <p>承载当前页面内容，并在窄屏下自然排到导航之后。</p>
          </article>
        </div>
      </section>
    </Layout>
  </div>
);

export default LayoutView;
```

- [ ] **Step 2: Add demo-specific visual styles**

Create `apps/demo-react/src/views/layout-view.css`:

```css
.layout-view {
  min-height: 100vh;
  color: #2a2d33;
  background: #f5f7fb;
}

.layout-demo-header {
  min-height: 64px;
  padding: 0 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  background: #252b3b;
}

.layout-demo-brand {
  color: inherit;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
}

.layout-demo-nav {
  height: 100%;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #fff;
  border-right: 1px solid #e8ebf1;
}

.layout-demo-nav a {
  padding: 10px 12px;
  color: #5b6270;
  border-radius: 6px;
  text-decoration: none;
}

.layout-demo-nav a:hover,
.layout-demo-nav a.is-active {
  color: #4f62d8;
  background: #eef0ff;
}

.layout-demo-content {
  padding: 48px;
}

.layout-demo-eyebrow {
  margin: 0 0 8px;
  color: #6674d9;
  font-size: 13px;
  font-weight: 600;
}

.layout-demo-content h1 {
  margin: 0;
  font-size: 32px;
}

.layout-demo-description {
  margin: 12px 0 32px;
  color: #687080;
}

.layout-demo-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.layout-demo-cards article {
  padding: 20px;
  background: #fff;
  border: 1px solid #e8ebf1;
  border-radius: 10px;
}

.layout-demo-cards h2 {
  margin: 0 0 10px;
  font-size: 16px;
}

.layout-demo-cards p {
  margin: 0;
  color: #687080;
  line-height: 1.6;
}

@media (max-width: 719px) {
  .layout-demo-header {
    padding: 0 20px;
  }

  .layout-demo-nav {
    padding: 12px;
    flex-direction: row;
    flex-wrap: wrap;
    border-right: 0;
    border-bottom: 1px solid #e8ebf1;
  }

  .layout-demo-content {
    padding: 28px 20px;
  }
}
```

- [ ] **Step 3: Register the lazy route**

In `apps/demo-react/src/router.tsx`, add the lazy import beside the other view imports:

```tsx
const LayoutView = lazy(async () => import("./views/layout-view.tsx"));
```

Add a route using the existing `Suspense` pattern:

```tsx
{
  path: "/layout",
  element: (
    <Suspense fallback={routerFallback}>
      <LayoutView />
    </Suspense>
  ),
},
```

- [ ] **Step 4: Add the homepage navigation entry**

In `apps/demo-react/src/views/home-view.tsx`, append this item to the existing `entries` array:

```tsx
{ path: "/layout", label: "Layout" },
```

- [ ] **Step 5: Build the React demo**

Run: `pnpm --filter @houheaven/demo-react build`

Expected: Vite completes with no unresolved package export, route, JSX, or CSS errors.

### Task 3: Verify the final diff

**Files:**
- Verify: `packages/kit-react/src/layout/layout.tsx`
- Verify: `packages/kit-react/src/layout/layout.css`
- Verify: `apps/demo-react/src/views/layout-view.tsx`
- Verify: `apps/demo-react/src/views/layout-view.css`
- Verify: `apps/demo-react/src/router.tsx`
- Verify: `apps/demo-react/src/views/home-view.tsx`

- [ ] **Step 1: Check whitespace and scope**

Run: `git diff --check`

Expected: no output and exit code 0. Review `git status --short` and confirm unrelated pre-existing changes remain untouched.

- [ ] **Step 2: Confirm routing and navigation**

Check `apps/demo-react/src/router.tsx` contains `/layout` and `apps/demo-react/src/views/home-view.tsx` contains the matching `/layout` entry. Confirm the existing routes and entries remain present.
