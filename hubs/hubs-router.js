const express = require("express");

const Hubs = require("./hubs-model");

const router = express.Router();

router.get("/", (req, res) => {
  Hubs.find(req.query)
    .then((hubs) => {
      res.status(200).json({ query: req.query, data: hubs });
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the hubs",
      });
    });
});

router.get("/:id", (req, res) => {
  Hubs.findById(req.params.id)
    .then((hub) => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: "Hub not found" });
      }
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the hub",
      });
    });
});

router.post("/", (req, res) => {
  Hubs.add(req.body)
    .then((hub) => {
      res.status(201).json(hub);
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error adding the hub",
      });
    });
});

router.delete("/:id", (req, res) => {
  Hubs.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "The hub has been nuked" });
      } else {
        res.status(404).json({ message: "The hub could not be found" });
      }
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error removing the hub",
      });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  Hubs.update(req.params.id, changes)
    .then((hub) => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: "The hub could not be found" });
      }
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error updating the hub",
      });
    });
});

//add an endpoint that returns all the messages for a hub
// /messages?hubid=1
// /hubs/1/messages
router.get("/:id/messages", (req, res) => {
  const { id } = req.params;

  Hubs.findHubMessages(id)
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ errorMessage: "we could not get the hubs data" });
    });
});

//add an endpoint for adding new message to a hub

router.post("/:id/messages", (req, res) => {
  const { id } = req.params;
  const newMessage = { ...req.body, hub_id: id };
  Hubs.addMessage(newMessage)
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ errorMessage: "we could not add the message" });
    });
});

//export default router;
module.exports = router;
