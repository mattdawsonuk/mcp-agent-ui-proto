# Testing Notes - MCP Agent UI

## UI Traversal Pattern for Overlap Detection

### Overview
This document outlines the systematic approach for testing UI element overlaps across different pages, tabs, sections, and interactions in the MCP Agent UI.

### Test Environment
- **URL**: `http://localhost:3000/mcp`
- **Framework**: Next.js
- **Testing Tool**: Playwright
- **Test File**: `tests/overlap-detection.spec.ts`

### UI Traversal Steps

1. **Load the page**
   - Navigate to `http://localhost:3000/mcp`
   - Wait for page to fully load

2. **Click tabs in order**:
   - "Read Operations" tab
   - "Create Operations" tab  
   - "Modify/Delete Operations" tab
   - "Chained Workflows" tab
   - "Audit Logs" tab

3. **For each tab, expand sections**:
   - Expand the first section
   - Expand the second section
   - Continue for all sections in the tab

4. **For each expanded section, interact with workflow execution buttons**:
   - Click workflow execution buttons
   - **Button identification criteria**:
     - `aria-label` containing "Execute" OR
     - `data-slot="button"`
   - **Exclude Next.js buttons**: Skip buttons with "Next.js" in their label or text

5. **Submit messages in chat interfaces**:
   - After clicking workflow execution buttons, submit messages in any chat interfaces that appear

6. **Return to workflows**:
   - Navigate back to the workflows after chat interactions

7. **Check for overlaps** after each interaction step

### Debugging Optimizations

#### Current Test Focus (for faster debugging)
- **Tab**: Only "Read Operations" tab
- **Sections**: Only the first two sections within that tab
- **Viewport**: Desktop Standard (1366x768)

#### Full Test Coverage (when ready)
- All tabs
- All sections within each tab
- Multiple viewports (Mobile, Tablet, Desktop)

### Technical Implementation Details

#### Safe Navigation Functions
- `safeNavigate()` - Handles page navigation with error recovery
- `safeClick()` - Handles button clicks with visibility checks
- `waitForPageLoad()` - Ensures page is fully loaded before proceeding

#### Error Handling
- Robust error handling to prevent browser crashes
- Detailed logging for debugging UI element detection
- Timeout handling for slow-loading elements

#### Element Detection
- Workflow execution buttons identified by specific attributes
- Exclusion of Next.js framework buttons
- Visibility checks before interactions

### Development Server Requirements
- Ensure Next.js development server is running on port 3000
- Start server with: `npm run dev` or `yarn dev`
- Server must be accessible before running tests

### Test Execution
```bash
# Run the overlap detection test
npx playwright test tests/overlap-detection.spec.ts

# Run with UI mode for debugging
npx playwright test tests/overlap-detection.spec.ts --ui

# Run with headed mode to see browser
npx playwright test tests/overlap-detection.spec.ts --headed
```

### Notes
- Test includes extensive logging to help debug UI element detection issues
- Focus on "Read Operations" tab and first two sections for faster debugging
- Exclude Next.js buttons from interactions to avoid framework conflicts
- Ensure development server is running before test execution 