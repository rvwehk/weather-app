// import type { NextApiRequest, NextApiResponse } from 'next'

// const API_ENDPOINT = `http://localhost:3001/weather`;

// export default async function handler(req: NextApiRequest,
//     res: NextApiResponse) {
//     const { query } = req;
//     const { city } = query;

//     try {
//         const response = await fetch(
//             `${API_ENDPOINT}/${city}`
//         );

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         res.status(200).json(data);
//     } catch (error: any) {
//         console.error(error);
//         res.status(500).json({ error: error.message });
//     }
// }

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(200).json({ name: 'John Doe' })
}
