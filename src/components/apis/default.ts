import axios from "axios";

interface apiRequesProps {
  method: string;
  path: string;
  body?: Object;
}

export async function apiRequest({ method, path, body }: apiRequesProps) {
  try {
    const res = await axios({
      method: method,
      url: process.env.NEXT_PUBLIC_API_URL + path,
      data: body,
    });

    return { status: 200, message: res.data };
  } catch (error) {
    return { status: error?.response.status, message: error?.message };
  }
}

export async function Signin(data: SigninData) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  if (res.status === 200) {
    return res.json();
  }
}

// const requestFunc = async (
//   method: string,
//   apiUrl: string,
//   data: object
// ): Promise<Response> => {
//   try {
//     const response = await fetch(process.env.NEXT_PUBLIC_API_URL + apiUrl, {
//       method: `'${method}'`, // HTTP method: e.g., 'GET', 'POST'
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data), // Include data as the request body
//     });

//     if (!response.ok) {
//       // Handle non-successful responses here, e.g., throw an error
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     return response;
//   } catch (error: any) {
//     // Handle fetch errors or JSON parsing errors here
//     throw new Error(`Fetch error: ${error.message}`);
//   }
// };

// export default requestFunc;
