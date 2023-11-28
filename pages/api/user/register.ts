import { NextApiRequest, NextApiResponse } from "next";
import { API_URI } from "@/config/config";

export default async function userRegister(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {

        try {
            const body = JSON.parse(req.body)

            const { full_name, email, password } = body;

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                full_name: full_name,
                email: email,
                password: password
            });

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const userRegister = await fetch(`${API_URI}/register`, requestOptions);
            const result = await userRegister.json();


            if (userRegister.status == 201) {
                return res.status(200).json({
                    status: true,
                    message: "Your account is registered successfully!",
                })
            } else {
                return res.status(400).json({
                    status: false,
                    message: result.email[0],
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
