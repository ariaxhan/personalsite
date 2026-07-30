import { describe, expect, it } from "vitest";
import { isDraftSaveDisabled } from "../app/edit/editorControls";

describe("inline editor controls", () => {
  it("allows Save draft while a text field is actively being edited", () => {
    expect(
      isDraftSaveDisabled({
        busy: false,
        dirty: false,
        editing: true,
      }),
    ).toBe(false);
  });

  it("allows committed local changes and blocks idle or busy saves", () => {
    expect(
      isDraftSaveDisabled({
        busy: false,
        dirty: true,
        editing: false,
      }),
    ).toBe(false);
    expect(
      isDraftSaveDisabled({
        busy: false,
        dirty: false,
        editing: false,
      }),
    ).toBe(true);
    expect(
      isDraftSaveDisabled({
        busy: true,
        dirty: true,
        editing: true,
      }),
    ).toBe(true);
  });
});
