export const getPets = async (type = "", query = "", gender = "", coat = "") => {
  const searchParams = new URLSearchParams({ type, query, gender, coat });
  const requestUrl = `/animals?${searchParams.toString()}`;

  const response = await fetch(requestUrl, {
    method: "GET",
  });

  const json = await response.json();

  return json;
};

export const getPetDetails = async (id) => {
  const requestUrl = `/animals/${id}`;
  const response = await fetch(requestUrl, {
    method: "GET",
  });

  const json = await response.json();

  return json;
};

export const getPetTypes = async () => {
  const requestUrl = `/types`;
  const response = await fetch(requestUrl, {
    method: "GET",
  });

  const json = await response.json();

  return json;
};
