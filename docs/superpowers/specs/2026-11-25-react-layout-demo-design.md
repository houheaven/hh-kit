# React Layout Demo Design

## Goal

Add a Layout showcase page to `demo-react` that demonstrates the existing `kit-react` Layout export as a reusable application shell.

## Approach

Complete the existing `packages/kit-react/src/layout` placeholder as a small app-shell component, then add a lazily loaded `/layout` route and a matching home-page navigation entry in `apps/demo-react`. This uses the in-progress Layout export already present in the worktree. The demo page will provide the header, sidebar navigation, and main content as component slots; the shared component owns the shell structure and responsive styling.

The shell will accept `header`, `sidebar`, and `children` as required React nodes. On narrow screens, the sidebar will flow above the main content rather than remain a fixed-width column. The showcase will include links back to the demo home and existing component pages, plus a small example content area.

## Scope and compatibility

- Keep the change focused on the React package and React demo.
- Preserve the current homepage and existing routes.
- Keep the existing root `Layout` export; do not add a package subpath or new configuration options.
- Do not change unrelated uncommitted work.

## Validation

- Build `kit-react` to verify the Layout source, root export, declarations, and CSS bundle.
- Build `demo-react` to verify the new import, route, and page compile against the package output.
- Confirm the new route and home entry are present without changing existing navigation.
