import { Status } from "../domain/models/index.js";

class StatusController {
  static async addNewStatus(req, res) {
    const { user_id } = req.params;
    const { description, multimedia } = req.body;

    try {
      const result = await Status.create({
        user_id,
        description,
        multimedia,
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ name: error.name, message: error.message });
    }
  }
}

export default StatusController;
