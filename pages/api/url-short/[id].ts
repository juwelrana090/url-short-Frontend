import { NextApiRequest, NextApiResponse } from "next";
import { baseUrl, API_URI } from "@/config/config";

export default async function getShorts(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {

            const { id } = req.query;

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");


            const user_ip = req.socket.remoteAddress;
            const referer = req.headers.referer;
            const userAgent = req.headers['user-agent'];

            var raw = JSON.stringify({
                uniqid: id,
                user_ip: user_ip,
                method: "GET",
                host: baseUrl,
                url: `${baseUrl}/${id}`,
                referer: referer,
                user_agent: userAgent,
                country: "",
                device: "",
                operating: "",
                browser: "",
                browser_version: "",
            });

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const getShort = await fetch(`${API_URI}/url-short`, requestOptions);
            const result = await getShort.json();

            if (getShort.status == 200) {
                return res.status(200).json({
                    status: true,
                    short: result.short,
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
