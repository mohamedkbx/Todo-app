import { appElement } from "./elements";

export default function toggleTheme() {
  appElement.classList.toggle("App--isDark");
}
