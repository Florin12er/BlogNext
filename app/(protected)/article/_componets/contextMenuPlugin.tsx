import { Plugin, PluginKey } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

const contextMenuPluginKey = new PluginKey("contextMenuPlugin");

export const contextMenuPlugin = () => {
  return new Plugin({
    key: contextMenuPluginKey,
    view(editorView) {
      return new ContextMenuView(editorView);
    },
  });
};

class ContextMenuView {
  private editorView: EditorView;
  private menu: HTMLElement;

  constructor(editorView: EditorView) {
    this.editorView = editorView;
    this.menu = document.createElement("div");
    this.menu.className = "context-menu";
    this.menu.style.position = "absolute";
    this.menu.style.zIndex = "1000";
    this.menu.style.display = "none";
    document.body.appendChild(this.menu);

    this.editorView.dom.addEventListener("mouseup", this.handleMouseUp);
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  handleMouseUp = (event: MouseEvent) => {
    const selection = this.editorView.state.selection;
    if (!selection.empty) {
      const { from, to } = selection;
      const start = this.editorView.coordsAtPos(from);
      const end = this.editorView.coordsAtPos(to);
      this.showMenu(end.left, start.top);
    } else {
      this.hideMenu();
    }
  };

  handleClickOutside = (event: MouseEvent) => {
    if (!this.menu.contains(event.target as Node)) {
      this.hideMenu();
    }
  };

  showMenu(x: number, y: number) {
    this.menu.style.display = "block";
    this.menu.style.left = `${x}px`;
    this.menu.style.top = `${y}px`;
    this.menu.innerHTML = `
      <button class="context-menu-item" data-action="bold">Bold</button>
      <button class="context-menu-item" data-action="italic">Italic</button>
      <button class="context-menu-item" data-action="underline">Underline</button>
    `;
    this.menu.querySelectorAll(".context-menu-item").forEach((item) => {
      item.addEventListener("click", this.handleMenuItemClick);
    });
  }

  hideMenu() {
    this.menu.style.display = "none";
  }

  handleMenuItemClick = (event: Event) => {
    const action = (event.target as HTMLElement).getAttribute("data-action");
    if (action) {
      this.applyMarkToSelection(action);
    }
    this.hideMenu();
  };

  applyMarkToSelection(markName: string) {
    const { state, dispatch } = this.editorView;
    const markType = state.schema.marks[markName];
    if (markType) {
      const { from, to } = state.selection;
      dispatch(state.tr.addMark(from, to, markType.create()));
    }
  }

  destroy() {
    this.editorView.dom.removeEventListener("mouseup", this.handleMouseUp);
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.body.removeChild(this.menu);
  }
}
