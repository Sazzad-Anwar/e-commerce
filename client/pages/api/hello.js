// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async (req, res) => {
  if (req.method === 'POST') {
    let { email, password } = req.body;
    try {
      let { data } = await axios.post('http://localhost:8080/api/v1/user/login', {
        "email": email,
        "password": password
      })
      res.json(data)
    } catch (error) {
      res.json(error)
    }
  } else {
    res.json({
      message: 'Method not allowed'
    })
  }
}
