import { Status } from "../domain/models/index.js";

class newStatus {
  constructor(id) {
    this.id = id;
    /*PARA PROBAR  */
    setTimeout(() => this.deleteStatus24H(), 10000);
  }
  async deleteStatus24H() {
    await Status.destroy({
      where: {
        status_id: this.id,
      },
    });
  }
}

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
      const idToDelete = result.toJSON();
      const status = new newStatus(idToDelete.status_id);
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
