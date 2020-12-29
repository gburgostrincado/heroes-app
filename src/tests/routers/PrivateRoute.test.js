import React from "react";
import { MemoryRouter } from "react-router-dom";
const { mount } = require("enzyme");
const { PrivateRoute } = require("../../routers/PrivateRoute");

describe("Pruebas en <PrivateRoute />", () => {
  const props = {
    location: {
      pathname: "/marvel",
    },
  };

  Storage.prototype.setItem = jest.fn();

  test("debe mostrar el componente si esta autenticado y guardar localStorage", () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={true}
          component={() => <span>Listo!</span>}
          {...props}
        />
      </MemoryRouter>
    );

    expect(wrapper.find("span").exists()).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/marvel");
  });

  test("debe bloquear el componente si no esta autenticado", () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={false}
          component={() => <span>Listo!</span>}
          {...props}
        />
      </MemoryRouter>
    );

    expect(wrapper.find("span").exists()).toBe(false);
    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/marvel");
  });
});
