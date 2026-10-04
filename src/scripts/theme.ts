type Theme = "light" | "dark" | "mono";

function isTheme(value: string | undefined): value is Theme {
  return value === "light" || value === "dark" || value === "mono";
}

export function mountTheme(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>("[data-theme-set]");

  const sync = (): void => {
    const theme = document.documentElement.dataset.theme;
    for (const button of buttons) {
      button.setAttribute("aria-pressed", button.dataset.themeSet === theme ? "true" : "false");
    }
  };

  for (const button of buttons) {
    button.addEventListener("click", () => {
      const theme = button.dataset.themeSet;
      if (!isTheme(theme)) return;
      document.documentElement.dataset.theme = theme;
      try {
        localStorage.setItem("theme", theme);
      } catch {
        /* Storage can be blocked. The choice still applies for this view. */
      }
      sync();
    });
  }

  sync();
}
