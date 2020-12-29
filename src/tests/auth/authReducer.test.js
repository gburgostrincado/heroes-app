const { authReducer } = require("../../auth/authReducer");
const { types } = require("../../types/types");

describe("Pruebas en authReducer", () => {
  test("Debe retornar el estado por defecto", () => {
    const state2 = authReducer({ logged: false }, {});
    expect(state2).toEqual({ logged: false });
  });

  test("debe autenticar y colocar el name del usuario", () => {
    const action = {
      type: types.login,
      payload: {
        name: "Gonzalo",
      },
    };
    const state = authReducer({}, action);
    expect(state).toEqual({ logged: true, name: "Gonzalo" });
  });

  test("Debe borrar el name de usuario y logged en false", () => {
    const action = {
      type: types.logout,
    };

    const state = authReducer({ logged: true, name: "Gonzalo" }, action);
    expect(state).toEqual({ logged: false });
  });
});
