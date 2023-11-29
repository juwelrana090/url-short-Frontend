import { NextApiRequest, NextApiResponse } from "next";
import { API_URI } from "@/config/config";

export default async function shortsCreate(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        try {

            const authorization = req.headers.authorization;
            const body = JSON.parse(req.body);

            const { url } = body;

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${authorization}`);

            var raw = JSON.stringify({
                url: url,
            });

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const shortsCreate = await fetch(`${API_URI}/shorts/create`, requestOptions);
            const result = await shortsCreate.json();

            if (shortsCreate.status == 201) {
                return res.status(200).json({
                    status: true,
                    message: result.message,
                })
            } else {
                return res.status(400).json({
                    status: false,
                    message: result.message,
                })
            }

        } catch (err) {
            console.log(err)
            res.status(500).send("error")
        }

    } else {
        res.status(405).json({ message: "Method not allowed" })
    }
}
