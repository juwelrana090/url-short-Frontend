import { NextApiRequest, NextApiResponse } from "next";
import { API_URI } from "@/config/config";

export default async function userLogin(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        try {
            const body = JSON.parse(req.body)

            const {  email, password } = body;

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                email: email,
                password: password
            });

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const userLogin = await fetch(`${API_URI}/login`, requestOptions);
            const result = await userLogin.json();

            if (result.success) {
                return res.status(200).json({
                    status: true,
                    message: result.message,
                    user: result.user,
                    token: result.access_token,
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
