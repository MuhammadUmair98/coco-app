const Equipments = require("../models/equipments.model");
const equipmentServices = require("../services/equipment.service");

async function getAll(req, res, next) {
  try {
    const equipments = await equipmentServices.getAll();
    res.status(200).json({ message: "success", data: equipments });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: error,
    });
  }
}

async function getOne(req, res, next) {
  try {
    const { id } = req.params;
    const equipment = await equipmentServices.getOne(id);
    res.status(200).json({ message: "success", data: equipment });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: error,
    });
  }
}

async function add(req, res, next) {
  try {
    const data = req.body;
    const equipment = await equipmentServices.add(data);
    res.status(200).json({ message: "success", data: equipment });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: error,
    });
  }
}

async function update(req, res, next) {
  try {
    const data = req.body;
    const { id , ...rest } = data;
    const equipment = await equipmentServices.updateEquipment(id,rest);
    res.status(200).json({ message: "success", data: equipment });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: error,
    });
  }
}

async function destroy(req, res, next) {
  try {
    const id = req.params.id;
    await Equipments.destroy({
      where: { equip_id: id },
    });
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: error,
    });
  }
}

module.exports = {
  getAll,
  add,
  destroy,
  update,
  getOne
};
