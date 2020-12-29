import React, { memo } from "react";
import { AppRouter } from "../../routers/AppRouter";
import { AuthContext } from "../../auth/AuthContext";
const { mount } = require("enzyme");

describe("Pruebas en <AppRouter/>", () => {
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false,
    },
  };
  test("debe mostrarel login si no esta autenticado", () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("debe mostrar el componente marvel si esta autenticado", () => {
    const contextValue = {
      dispatch: jest.fn(),
      user: {
        logged: true,
        name: "Valentina",
      },
    };
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );

    // console.log(wrapper.html());

    expect(wrapper.find(".navbar").exists()).toBe(true);
  });
});
