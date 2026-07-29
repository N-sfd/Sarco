"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { MegaMenu } from "@/components/layout/mega-menu";
import { PageContainer } from "@/components/layout/page-container";
import { mainNavigation, type MegaMenuItem, type NavKey } from "@/config/navigation";

const CLOSE_DELAY_MS = 150;

const panelMotion = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const },
};

export function MainNav() {
  const [openMenu, setOpenMenu] = useState<NavKey | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRefs = useRef<Map<NavKey, HTMLButtonElement>>(new Map());
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState(pathname);
  const listId = useId();

  // Close submenu when the route changes (adjust state during render).
  if (pathname !== menuPath) {
    setMenuPath(pathname);
    if (openMenu !== null) setOpenMenu(null);
  }

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setOpenMenu(null);
      closeTimerRef.current = null;
    }, CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  const open = useCallback(
    (key: NavKey) => {
      clearCloseTimer();
      setOpenMenu(key);
    },
    [clearCloseTimer],
  );

  const close = useCallback(() => {
    clearCloseTimer();
    setOpenMenu(null);
  }, [clearCloseTimer]);

  const toggle = useCallback(
    (key: NavKey) => {
      clearCloseTimer();
      setOpenMenu((current) => (current === key ? null : key));
    },
    [clearCloseTimer],
  );

  // Escape + single click-outside listener
  useEffect(() => {
    if (!openMenu) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        const key = openMenu;
        setOpenMenu(null);
        if (key) triggerRefs.current.get(key)?.focus();
      }
    }

    function onPointerDown(event: MouseEvent | PointerEvent) {
      const target = event.target as Node | null;
      if (target && navRef.current && !navRef.current.contains(target)) {
        setOpenMenu(null);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openMenu]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  const activeMenu: MegaMenuItem | undefined = openMenu
    ? mainNavigation.find((item) => item.key === openMenu)
    : undefined;

  function focusTrigger(index: number) {
    const item = mainNavigation[index];
    if (!item) return;
    triggerRefs.current.get(item.key)?.focus();
  }

  function onTriggerKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>, index: number) {
    const item = mainNavigation[index];
    if (!item) return;

    switch (event.key) {
      case "ArrowRight": {
        event.preventDefault();
        const next = (index + 1) % mainNavigation.length;
        focusTrigger(next);
        open(mainNavigation[next].key);
        break;
      }
      case "ArrowLeft": {
        event.preventDefault();
        const prev = (index - 1 + mainNavigation.length) % mainNavigation.length;
        focusTrigger(prev);
        open(mainNavigation[prev].key);
        break;
      }
      case "ArrowDown": {
        event.preventDefault();
        open(item.key);
        // Move focus into the first link of the open submenu on next paint
        requestAnimationFrame(() => {
          const panel = document.getElementById(`submenu-${item.key}`);
          const firstLink = panel?.querySelector<HTMLAnchorElement>("a.mega-menu-link, a.shop-all-link");
          firstLink?.focus();
        });
        break;
      }
      case "Escape": {
        event.preventDefault();
        close();
        break;
      }
      default:
        break;
    }
  }

  return (
    <nav
      ref={navRef}
      className="main-nav hidden nav:block"
      aria-label="Primary"
      onMouseLeave={scheduleClose}
      onFocusCapture={clearCloseTimer}
      onBlurCapture={(event) => {
        const next = event.relatedTarget as Node | null;
        if (!next || !navRef.current?.contains(next)) {
          scheduleClose();
        }
      }}
    >
      <PageContainer className="main-nav-container">
        <ul className="main-nav-list" id={listId}>
          {mainNavigation.map((item, index) => {
            const isOpen = openMenu === item.key;
            return (
              <li key={item.key} className="main-nav-item">
                <button
                  type="button"
                  ref={(node) => {
                    if (node) triggerRefs.current.set(item.key, node);
                    else triggerRefs.current.delete(item.key);
                  }}
                  className="nav-trigger"
                  data-open={isOpen ? "true" : "false"}
                  aria-expanded={isOpen}
                  aria-controls={`submenu-${item.key}`}
                  aria-haspopup="true"
                  onMouseEnter={() => open(item.key)}
                  onFocus={() => open(item.key)}
                  onClick={() => toggle(item.key)}
                  onKeyDown={(event) => onTriggerKeyDown(event, index)}
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    className={`nav-trigger-chevron ${isOpen ? "nav-trigger-chevron--open" : ""}`}
                    size={13}
                    strokeWidth={2.5}
                    aria-hidden
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </PageContainer>

      <AnimatePresence mode="wait">
        {openMenu && activeMenu ? (
          <motion.div
            key={activeMenu.key}
            className="mega-menu"
            {...panelMotion}
            onMouseEnter={clearCloseTimer}
            onMouseLeave={scheduleClose}
          >
            <MegaMenu menu={activeMenu} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}
