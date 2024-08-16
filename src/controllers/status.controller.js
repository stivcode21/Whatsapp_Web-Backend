import { Status } from "../domain/models/index.js";

class newStatus {
  constructor(id) {
    this.id = id;
    /*PARA PROBAR, COLOQUE 10000MS PARA QUE SE ELIMINE EN 10 SEGUNDOS
    PARA QUE SEAN 24 HORAS, USAR 86400000 MS
    */

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

  static async showAllStatus(req, res) {
    const { user_id } = req.params;
    try {
      const result = await Status.findAll({
        attributes: ["description", "multimedia"],
        where: {
          user_id,
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ name: error.name, message: error.message });
    }
  }

  static async showOneStatus(req, res) {
    const { user_id, status_id } = req.params;
    try {
      const result = await Status.findOne({
        attributes: ["description", "multimedia"],
        where: {
          user_id,
          status_id,
        },
      });
      res.status(200).json(result);
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
