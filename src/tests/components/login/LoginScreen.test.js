import React from "react";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { AuthContext } from "../../../auth/AuthContext";
import { MemoryRouter } from "react-router-dom";
import { types } from "../../../types/types";
const { mount } = require("enzyme");

describe("Pruebas en <LoginScreen />", () => {
  const historyMock = {
    replace: jest.fn(),
  };
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false,
    },
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter>
        <LoginScreen history={historyMock} />
      </MemoryRouter>
    </AuthContext.Provider>
  );

  afterEach(() => {
    jest.clearAllMocks();
  });
  test("debe mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe hacer dispatch y navegacion", () => {
    const handleClick = wrapper.find("button").prop("onClick");
    handleClick();
    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: { name: "Gonzalo" },
    });

    expect(historyMock.replace).toHaveBeenCalledWith("/");

    localStorage.setItem("lastPath", "/dc");
    handleClick();
    expect(historyMock.replace).toHaveBeenCalledWith("/dc");
  });
});
