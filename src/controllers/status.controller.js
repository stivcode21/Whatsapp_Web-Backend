import { Status } from "../domain/models/index.js";

class StatusController {
  static async addNewStatus(req, res) {
    const { user_id } = req.params;
    const { description, multimedia } = req.body;

    try {
      await Status.create({
        user_id,
        description,
        multimedia,
      });
      res
        .status(201)
        .json({ status: "success", message: "A new status created!" });
    } catch (error) {
      res.status(500).json({ name: error.name, message: error.message });
    }
  }

  static async deleteStatusManually(req, res) {
    const { user_id, status_id } = req.params;
    try {
      await Status.destroy({
        where: {
          user_id,
          status_id,
        },
      });
      res
        .status(204)
        .json({ status: "success", message: "Status deleted succesfully" });
    } catch (error) {
      res.status(500).json({ name: error.name, message: error.message });
    }
  }
}

export default StatusController;
