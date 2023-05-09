export default function handler(req, res) {
  const data = JSON.parse(req.body);
  console.log(req.method);
  res.status(200).json(data);
}
