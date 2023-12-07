const { Router } = require("express");
const { walkTypeHandlerGetAll } = require("./Handlers");

const walkTypeRouter = Router();
const { WalkType } = require("../Database/db");
//walk types routes

walkTypeRouter.get("/", async (req, res) => {
  try {
    const walkTypeData = await WalkType.findAll();
    res.status(201).json({walkTypeData});
  } catch (error) {
    res.status(500).json({ error: "Failed to get walkTypes" });
  }
});

walkTypeRouter.get("/:id", async (req, res) => {
  try {
    const walkTypeData = await WalkType.findByPk(req.params.id);
    if (!walkTypeData) {
      res.status(404).json({ error: "Walk type not found" });
    } else {
      res.status(200).json({ walkTypeData });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get walk type" });
  }
});

// Create a new walkType
walkTypeRouter.post('/', async (req, res) => {
  try {
    const newWalkType = await WalkType.create(req.body);
    res.status(201).json({newWalkType});
  } catch (error) {
    res.status(500).json({ error: 'Failed to create walkType' });
  }
});

// Update an existing walkType
walkTypeRouter.put('/:id', async (req, res) => {
  try {
    const updatedWalkType = await WalkType.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json({updatedWalkType});
  } catch (error) {
    res.status(500).json({ error: 'Failed to update walkType' });
  }
});

// Delete a walkType
walkTypeRouter.delete('/:id', async (req, res) => {
  try {
    await WalkType.destroy({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete walkType' });
  }
});

module.exports = walkTypeRouter;
