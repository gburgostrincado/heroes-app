import React from "react";
import { types } from "../../../types/types";
const { mount } = require("enzyme");
const { AuthContext } = require("../../../auth/AuthContext");
const { Navbar } = require("../../../components/ui/Navbar");
const { MemoryRouter, Router } = require("react-router-dom");

describe("Pruebas en <Navbar />", () => {
  const historyMock = {
    push: jest.fn(),
    replace: jest.fn(),
    location: {},
    listen: jest.fn(),
    createHref: jest.fn(),
  };

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: true,
      name: "Valentina",
    },
  };
  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter>
        <Router history={historyMock}>
          <Navbar />
        </Router>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("debe mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".text-info").text().trim()).toBe("Valentina");
  });

  test("debe llamar el logout y usar history", () => {
    wrapper.find("button").prop("onClick")();
    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.logout,
    });

    expect(historyMock.replace).toHaveBeenCalledWith("/login");
  });
});
