import { NextApiRequest, NextApiResponse } from "next";
import { API_URI } from "@/config/config";


export default async function getShortsList(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {

            const authorization = req.headers.authorization;

            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${authorization}`);

            var requestOptions: any = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            const getShorts = await fetch(`${API_URI}/shorts`, requestOptions);
            const result = await getShorts.json();

            return res.status(200).json({
                status: true,
                shortsList: result.shorts,
            })

        } catch (err) {
            console.log(err)
            res.status(500).send("error")
        }
    } else {
        res.status(405).json({ message: "Method not allowed" })
    }
}
