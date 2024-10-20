export const localURL = `http://localhost:3005`;

export const authRequest = async (endPoint, body) => {
  const res = await fetch(`${localURL}/${endPoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
};
