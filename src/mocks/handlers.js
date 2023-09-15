import { rest } from "msw";
import types from "./data/types.json";
import animals from "./data/animals.json";
import details from "./data/details.json";

export const handlers = [
  rest.get("/types", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(types));
  }),
  rest.get("/animals", (req, res, ctx) => {
    const type = req.url.searchParams.get("type");
    const query = req.url.searchParams.get("query");
    const gender = req.url.searchParams.get("gender");
    const coat = req.url.searchParams.get("coat");
    let response = animals.animals;

    if (type !== "") {
      response = response.filter((animal) => animal.type.toLowerCase() === type.toLowerCase());
    }
    if (query !== "") {
      response = response.filter(
        (animal) =>
          animal.contact.address.state.toLowerCase().includes(query.toLowerCase()) ||
          animal.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (gender !== "") {
      response = response.filter((animal) => animal.gender.toLowerCase() === gender.toLowerCase());
    }
    if (coat !== "") {
      response = response.filter((animal) => animal.coat?.toLowerCase() === coat.toLowerCase());
    }

    return res(ctx.status(200), ctx.json(response));
  }),
  rest.get("/animals/:id", (req, res, ctx) => {
    const { id } = req.params;
    let response = details[id];

    if (!response) {
      return res(ctx.status(404));
    }

    return res(ctx.status(200), ctx.json(response));
  }),
];
