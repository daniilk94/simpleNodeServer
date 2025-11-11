import app from "./api/mainapp.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}`);
});

export default app;
