import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { AuthorizationDecisionLab } from "./authorization-decision-lab";

afterEach(cleanup);

it("keeps simulated integration readiness separate from the authorization determination", () => {
  render(<AuthorizationDecisionLab />);
  const before = screen.getByText(/Clinical authorization review is removed, but/).textContent;
  fireEvent.change(screen.getByLabelText("Failure mode"), { target: { value: "core-platform-decoupling" } });
  expect(screen.getByRole("status")).toHaveTextContent("have not proven the claims handoff");
  expect(screen.getByText(/Clinical authorization review is removed, but/).textContent).toBe(before);
  const chain = screen.getByRole("group", { name: "Implementation chain" });
  expect(within(chain).getAllByRole("button")).toHaveLength(9);
  fireEvent.click(within(chain).getByRole("button", { name: /Evidence/ }));
  expect(screen.getByText(/adapter acknowledgement/)).toBeInTheDocument();
});
