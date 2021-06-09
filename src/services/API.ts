export const Header = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const HeaderAuth = (token: string) => ({
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`
});

export const POST = async (url: string, body: object, header = Header): Promise<any> => {
  const parseBody = JSON.stringify(body);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: header,
      body: parseBody,
    });
    return {
      status: res.status,
      res: await res.json()
    }
  } catch (err) {
    throw err;
  }
};
export const PUT = async (url: string, body: object, header = Header): Promise<any> => {
  const parseBody = JSON.stringify(body);
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: header,
      body: parseBody,
    });
    return {
      status: res.status,
      res: await res.json()
    }
  } catch (err) {
    throw err;
  }
};

export const GET = async (url: string, header = Header): Promise<any> => {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: header,
    });
    return {
      status: res.status,
      res: await res.json()
    }
  } catch (err) {
    throw err;
  }
};

export const DELETE = async (url: string, body: object, header = Header): Promise<any> => {
  try {
    const parseBody = JSON.stringify(body);
    const res = await fetch(url, {
      method: "DELETE",
      headers: header,
      body: parseBody,
    });
    return {
      status: res.status,
      res: await res.json()
    }
  } catch (err) {
    throw err;
  }
};
