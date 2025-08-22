import Error from "../models/error.model.js";

const insertError = async (req, res) => {
  try {
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ error: "'data' field is required" });
    }

    const saved = await Error.create({ data });
    res.status(201).json({ message: "✅ Data inserted", id: saved._id });
  } catch (error) {
    console.error("❌ Insertion error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { insertError };
