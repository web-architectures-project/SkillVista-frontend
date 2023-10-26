import { SignupData, SigninData } from "@/interface/default";

export async function Signup(data: SignupData) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "users/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: data.username,
      email: data.email,
      password: data.password,
    }),
  });

  return res;

  // if (res.status === 201) {
  //   return res.json()
  // } else {
  //   return 'fail'
  // }
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
