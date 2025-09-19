import ErrorLog  from "../models/errorLog.model.js";

const insertError = async (req, res) => {
  try {
    const { websiteKey } = req.params;
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ error: "'data' field is required" });
    }

    const saved = await ErrorLog.create({ websiteKey, data });
    res.status(201).json({ message: "Data inserted", id: saved._id });
  } catch (error) {
    console.error("Insertion error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { insertError };
