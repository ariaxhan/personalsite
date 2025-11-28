# ●BLUEPRINT|project:ariaxhan_constellation_nav

```
●META
|version:2.0.0
|created:2024-11-28
|status:PENDING_APPROVAL
|scope:SIMPLIFIED
|build_time:4-6_hours
```

---

## ●OBJECTIVE

Add **one signature element**: a Constellation Navigation diagram that enhances the existing site without complexity.

```
┌─────────────────────────────────────────────────────────────┐
│                     EXISTING SITE                            │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │    Hero → Evidence → Systems → Writing → Timeline     │  │
│  │                                                        │  │
│  │    (unchanged - all existing components preserved)     │  │
│  │                                                        │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌─────────────┐                                            │
│  │ ★ HERO      │  ← NEW: Constellation Nav                  │
│  │  ·          │     Fixed position, bottom-right corner    │
│  │   · SYSTEMS │     SVG-based, ~200x200px                  │
│  │  ·    ·     │     Nodes = sections                       │
│  │ EVIDENCE    │     Lines connect related sections         │
│  │      ·      │     Active node glows on scroll            │
│  │   WRITING   │     Click/tap to jump                      │
│  └─────────────┘                                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## ●WHAT_WE_ARE_BUILDING

### →Constellation_Nav_Component

```
●FEATURES
  ⊕fixed_position:bottom-right_corner
  ⊕size:180x180px_desktop|140x140px_mobile
  ⊕nodes:6_(hero,evidence,systems,writing,timeline,contact)
  ⊕lines:connect_adjacent_sections
  ⊕active_state:current_section_highlighted
  ⊕interaction:click/tap_to_scroll_to_section
  ⊕animation:subtle_glow_transition_on_active
  ⊕accessibility:keyboard_nav,_aria_labels
  ⊕mobile:touch_targets_≥44px,_slightly_larger_nodes
```

### →Visual_Design

```
     ●─────● EVIDENCE
    /       \
HERO●        ●SYSTEMS
    \       /
     ●─────● WRITING
      \   /
       ● TIMELINE
       |
       ●CONTACT

●STYLING
  |nodes:small_circles_(8-12px)
  |lines:thin_connecting_lines_(1px,_subtle)
  |active_node:larger_(14px),_glow_effect,_accent_color
  |inactive_nodes:muted_gray
  |hover:slight_scale_up,_brighter
  |colors:match_existing_violet/gold_accent_palette
```

---

## ●TECHNICAL_APPROACH

### →Implementation

```
●TECHNOLOGY
  |rendering:SVG_(crisp,_accessible,_styleable)
  |scroll_detection:IntersectionObserver
  |animations:CSS_transitions_(no_JS_animation_loop)
  |state:React_useState_(no_external_library)

●NO_NEW_DEPENDENCIES
  |using:existing_framer_motion_for_mount_animation
  |using:existing_tailwind_for_styling
  |using:native_IntersectionObserver_API
```

### →File_Structure

```
app/
├── components/
│   └── ConstellationNav.tsx    ← NEW (single file, ~150-200 lines)
│
├── page.tsx                    ← MODIFY (add section IDs, import nav)
└── globals.css                 ← MODIFY (add nav styles if needed)
```

### →Component_Interface

```typescript
// ConstellationNav.tsx

interface NavNode {
  id: string;
  label: string;
  x: number;      // SVG coordinate
  y: number;      // SVG coordinate
}

interface ConstellationNavProps {
  className?: string;
}

// Usage in page.tsx:
<ConstellationNav />
```

---

## ●IMPLEMENTATION_PLAN

### →Step_1|Add_Section_IDs (30 min)
```
●CHANGES_TO:page.tsx
  →add_id="hero"_to_Hero_section
  →add_id="evidence"_to_EvidenceGrid_section
  →add_id="systems"_to_Systems_section
  →add_id="writing"_to_ThinkingSection
  →add_id="timeline"_to_Timeline_section
  →add_id="contact"_to_Contact_section
```

### →Step_2|Create_ConstellationNav (3-4 hours)
```
●BUILD:
  →SVG_container_with_viewBox
  →node_positions_(hand-tuned_constellation_shape)
  →connecting_lines_between_nodes
  →useIntersectionObserver_for_active_detection
  →click_handlers_with_smooth_scroll
  →hover_states_with_CSS
  →active_state_with_glow_animation
  →keyboard_navigation_(arrow_keys,_enter)
  →aria_labels_for_accessibility
```

### →Step_3|Styling_and_Polish (1-2 hours)
```
●REFINE:
  →tune_node_positions_for_visual_balance
  →adjust_colors_to_match_site_palette
  →test_mobile_touch_targets
  →add_reduced_motion_support
  →test_across_browsers
```

---

## ●COMPONENT_CODE_OUTLINE

```typescript
// app/components/ConstellationNav.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "hero", label: "Home", x: 30, y: 30 },
  { id: "evidence", label: "Wins", x: 70, y: 20 },
  { id: "systems", label: "Systems", x: 85, y: 50 },
  { id: "writing", label: "Writing", x: 60, y: 70 },
  { id: "timeline", label: "Timeline", x: 25, y: 65 },
  { id: "contact", label: "Contact", x: 50, y: 90 },
];

const CONNECTIONS = [
  ["hero", "evidence"],
  ["evidence", "systems"],
  ["systems", "writing"],
  ["writing", "timeline"],
  ["timeline", "hero"],
  ["writing", "contact"],
];

export default function ConstellationNav() {
  const [activeSection, setActiveSection] = useState("hero");

  // IntersectionObserver to detect active section
  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3, rootMargin: "-20% 0px -20% 0px" }
      );
      
      observer.observe(el);
      return observer;
    });

    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-50"
      aria-label="Page navigation"
    >
      <svg
        viewBox="0 0 100 100"
        className="w-40 h-40 md:w-44 md:h-44"
      >
        {/* Connection lines */}
        {CONNECTIONS.map(([from, to]) => {
          const fromNode = SECTIONS.find(s => s.id === from)!;
          const toNode = SECTIONS.find(s => s.id === to)!;
          return (
            <line
              key={`${from}-${to}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              className="stroke-neutral-700 stroke-[0.5]"
            />
          );
        })}

        {/* Nodes */}
        {SECTIONS.map((section) => (
          <g key={section.id}>
            <circle
              cx={section.x}
              cy={section.y}
              r={activeSection === section.id ? 5 : 3}
              className={`
                cursor-pointer transition-all duration-300
                ${activeSection === section.id 
                  ? "fill-violet-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]" 
                  : "fill-neutral-600 hover:fill-neutral-400"
                }
              `}
              onClick={() => scrollToSection(section.id)}
              role="button"
              tabIndex={0}
              aria-label={`Go to ${section.label}`}
              onKeyDown={(e) => {
                if (e.key === "Enter") scrollToSection(section.id);
              }}
            />
            {/* Label on hover/active - optional */}
          </g>
        ))}
      </svg>
    </motion.nav>
  );
}
```

---

## ●STYLING

```css
/* Additional styles in globals.css if needed */

/* Constellation nav glow effect */
.constellation-active {
  filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.8));
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .constellation-nav * {
    transition: none !important;
  }
}
```

---

## ●SUCCESS_CRITERIA

```
●FUNCTIONAL
  ⊕shows_current_section:correctly_highlights_on_scroll
  ⊕navigation_works:click_scrolls_to_section
  ⊕keyboard_accessible:can_navigate_with_tab/enter
  ⊕mobile_friendly:touch_targets_work

●VISUAL
  ⊕matches_site_aesthetic:violet/gold_accents
  ⊕not_distracting:subtle_presence
  ⊕professional:enhances_not_gimmicks

●PERFORMANCE
  ⊕no_jank:smooth_scroll_detection
  ⊕lightweight:no_bundle_increase
  ⊕fast:no_animation_loops
```

---

## ●WHAT_WE_ARE_SKIPPING

```
●REMOVED_FROM_SCOPE
  ⊗agent_canvas_simulation
  ⊗network_graph_physics
  ⊗complex_three_layer_system
  ⊗edge_particles
  ⊗task_counters
  ⊗zustand_state_management
  ⊗force_directed_layout
  ⊗drag_interactions

●RATIONALE
  →one_intentional_element_>_many_complex_elements
  →enhances_navigation_with_purpose
  →4-6_hours_instead_of_70-90_hours
  →zero_new_dependencies
  →maintains_site_performance
```

---

## ●ESTIMATE

```
●TOTAL:4-6_hours
  |step_1:0.5h|add_section_ids
  |step_2:3-4h|build_constellation_nav
  |step_3:1-2h|styling_and_polish
```

---

## ●NEXT_STEPS

```
●AWAITING_APPROVAL

Reply:
  →"approved"|to_begin_implementation
  →"feedback"|with_changes
  →"questions"|for_clarification
```

---

## ●END_BLUEPRINT
